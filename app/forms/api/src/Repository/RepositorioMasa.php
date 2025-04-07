<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}


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

  public function salvarRespondenteSurvey($respondente): int{
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
      /*
      $ps = $this->pdo->prepare('SELECT id FROM respondente ORDER BY id DESC LIMIT 1');
      $ps->execute();
      $result = $ps->fetch(PDO::FETCH_ASSOC);
      $idRespondente = $result['id'];

      return $idRespondente;
      */

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