<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}


  public function salvarToken($token,$usuario): array{
    try {
      $ps = $this->pdo->prepare('INSERT INTO link(token,usuario) VALUES (:token, (SELECT id FROM login WHERE usuario = :usuario))');
      $ps->execute(['token' => $token, 'usuario' => $usuario]);
      return ['success' => true, 'token' => $token];
    } catch (Exception $ex) {
      throw new Exception('Erro ao salvar o token no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function todosTokensUsuario($usuario): array{
    try {
      $ps = $this->pdo->prepare('SELECT * FROM link WHERE usuario = (SELECT id FROM login WHERE usuario = :usuario)');
      $ps->execute(['usuario' => $usuario]);
      $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
      $links = [];
      foreach ($dados as $linha){
        $link = new Link($linha['id'], $linha['token']);
        $links []= $link;
      }
      return $links;
    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar tokens dos links no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function todosTokens(): array{
    try {
      $ps = $this->pdo->prepare('SELECT * FROM link');
      $ps->execute();
      $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
      $links = [];
      foreach ($dados as $linha){
        $link = new Link($linha['id'], $linha['token']);
        $links []= $link;
      }
      return $links;
    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar tokens dos links no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }


  public function totalRespostas($token){
    try {
      $ps = $this->pdo->prepare(
        '
        SELECT p.titulo,e.opcao,COUNT(e.opcao) AS votos, (SELECT AVG(nota) FROM respondente) AS desempenho_geral FROM escolha e  
            JOIN pergunta p ON e.pergunta = p.id 
          WHERE p.survey = 1 AND e.link = (SELECT id FROM link WHERE token = :token)
            GROUP BY p.titulo,e.opcao;
      ');
      $ps->execute(['token' => $token]);
      return $ps->fetchAll(PDO::FETCH_ASSOC);

    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar total geral no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function totalRespostasPorFiltro($campo_respondente_bd){
    try {
      $ps = $this->pdo->prepare(
        '
        SELECT r.'.$campo_respondente_bd.' as filtro,p.titulo,e.opcao,COUNT(e.opcao) AS votos FROM escolha e  
          JOIN pergunta p ON e.pergunta = p.id 
          JOIN respondente r ON e.respondente = r.id 
        WHERE p.survey = 1 
          GROUP BY p.titulo,e.opcao,r.faixa_etaria;
      ');
      $ps->execute();
      return $ps->fetchAll(PDO::FETCH_ASSOC);

    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar resultado por filtro no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function buscarPerguntasPesquisaAcessibilidadeAtitudinal(): array{
    try {
        $ps = $this->pdo->prepare('SELECT p.titulo,o.opcao FROM pergunta p JOIN opcao o ON o.pergunta = p.id WHERE p.survey = 1 ORDER BY p.ordem');
        $ps->execute();
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
  
        $survey = [];

        for($i = 0; $i < count($dados); $i++){
            $pergunta = new stdClass();
            $pergunta->titulo = $dados[$i]['titulo'];
            $pergunta->respondida = false;
            $pergunta->opcoes = [];
            for($j = $i; $j < $i + 5; $j++){
                $pergunta->opcoes []= [ 'opcao' => $dados[$j]['opcao'], 'voto' => 0];
            }
            $survey []= $pergunta;
            $i += 4;
        }
  
        return $survey;
    } catch (Exception $ex) {
        throw new Exception('Erro ao buscar pesquisa no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function salvarRespondenteSurvey($respondente): bool{
    try{

      $this->pdo->beginTransaction();

      $sql = 'INSERT INTO respondente(perfil,faixa_etaria,escolaridade,cargo,nota) VALUES (:perfil,:faixa_etaria,:escolaridade,:cargo,:nota)';
      $ps = $this->pdo->prepare($sql);
      $ps->execute([
        'perfil' => $respondente->perfil,
        'faixa_etaria' => $respondente->faixa_etaria,
        'escolaridade' => $respondente->escolaridade,
        'cargo' => $respondente->cargo,
        'nota' => $respondente->nota
      ]);

      return $this->pdo->lastInsertId();
    } catch (Exception $ex) {
      throw new Exception('Erro ao salvar respondente no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function contabilizarVotosSurveyAA($survey,$idRespondente,$token): bool{
    try {
      $sqlContabilizarVotos = 
      '
        INSERT INTO escolha (respondente,pergunta,opcao,link) VALUES (:id,(SELECT id FROM pergunta WHERE titulo = :titulo),:opcao,(SELECT id FROM link WHERE token = :token)) 
      ';
      $psContabilizarVotos = $this->pdo->prepare( $sqlContabilizarVotos );
    

      foreach($survey as $resposta){

        foreach($resposta->opcoes as $opcao){
          if($opcao->voto == 1){
            $sucesso = $psContabilizarVotos->execute( 
              [ 
                'id' => $idRespondente,
                'opcao' => $opcao->opcao,
                'titulo' => $resposta->titulo,
                'token' => $token
              ] 
            );
            if($sucesso === false){
              throw new Exception('Ocorreu um erro interno na contabilização de votos e por isso sua pesquisa não foi considerada. :(');
            }
          }
        }

      }

      $this->pdo->commit();
      
      return true;

    } catch ( Exception $ex ) {
      $this->pdo->rollBack();
      throw $ex;
    }

  }
}