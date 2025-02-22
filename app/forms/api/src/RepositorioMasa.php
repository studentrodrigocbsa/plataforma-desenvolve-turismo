<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}


  public function totalRespostas(){
    try {
      $ps = $this->pdo->prepare(
        '
        SELECT p.titulo,o.opcao,SUM(o.votos) AS total_votos 
          FROM pergunta p 
            JOIN opcao o ON p.id = o.pergunta 
            WHERE p.survey = 1
            GROUP BY p.titulo,o.opcao;
      ');
      $ps->execute();
      return $ps->fetchAll(PDO::FETCH_ASSOC);

    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar total geral no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function totalRespostasPorFiltro($campo_respondente_bd){
    try {
      $ps = $this->pdo->prepare(
        '
        SELECT r.'.$campo_respondente_bd.',i.titulo,i.opcao,i.total_votos 
            FROM respondente r 
          JOIN (SELECT p.survey,p.titulo,o.opcao,SUM(o.votos) AS total_votos 
            FROM pergunta p 
              JOIN opcao o ON p.id = o.pergunta 
              WHERE p.survey = 1
              GROUP BY p.titulo,o.opcao) as i 
          ON i.survey = r.survey
          WHERE i.survey = 1;
      ');
      $ps->execute();
      return $ps->fetchAll(PDO::FETCH_ASSOC);

    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar resultado por filtro no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function buscarPesquisaAA(): array{
    try {
        $ps = $this->pdo->prepare('SELECT p.titulo,o.opcao FROM pergunta p JOIN opcao o ON o.pergunta = p.id ORDER BY p.ordem');
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
      $sql = 'INSERT INTO respondente(perfil,faixa_etaria,escolaridade,cargo,nota,survey) VALUES (:perfil,:faixa_etaria,:escolaridade,:cargo,:nota,:survey)';
      $ps = $this->pdo->prepare($sql);
      $ps->execute([
        'perfil' => $respondente->perfil,
        'faixa_etaria' => $respondente->faixa_etaria,
        'escolaridade' => $respondente->escolaridade,
        'cargo' => $respondente->cargo,
        'nota' => $respondente->nota,
        'survey' => $respondente->survey
      ]);

      return $ps->rowCount() > 0;
    } catch (Exception $ex) {
      throw new Exception('Erro ao buscar pesquisa no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function contabilizarVotosSurveyAA($survey): bool{
    try {

      $this->pdo->beginTransaction();

      $sqlContabilizarVotos = 
      '
        UPDATE opcao SET votos = votos + :voto WHERE opcao = :opcao AND pergunta = (SELECT p.id from pergunta p JOIN survey s ON p.survey = s.id WHERE s.categoria = "Acessibilidade Atitudinal - Escala de Capacitismo" AND p.titulo = :titulo);
      ';
      $psContabilizarVotos = $this->pdo->prepare( $sqlContabilizarVotos );
    

      foreach($survey as $resposta){

        foreach($resposta->opcoes as $opcao){
          $sucesso = $psContabilizarVotos->execute( 
            [ 
              'opcao' => $opcao->opcao,
              'voto' => $opcao->voto,
              'titulo' => $resposta->titulo
            ] 
          );
          if($sucesso === false){
            throw new Exception('Ocorreu um erro interno na contabilização de votos e por isso sua pesquisa não foi considerada. :(');
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