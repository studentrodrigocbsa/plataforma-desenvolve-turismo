<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}


  public function dadosRespondentesPesquisa($id){
    try {
      $ps = $this->pdo->prepare('SELECT r.tipo,r.faixa_etaria,r.escolaridade,r.cargo,r.nota,s.categoria,p.titulo,o.opcao,o.votos FROM respondente r JOIN survey s ON r.survey=s.id JOIN pergunta p ON s.id = p.survey JOIN opcao o ON p.id = o.pergunta');
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
      $sql = 'INSERT INTO respondente(tipo,faixa_etaria,escolaridade,cargo,nota,survey) VALUES (:tipo,:faixa_etaria,:escolaridade,:cargo,:nota,:survey)';
      $ps = $this->pdo->prepare($sql);
      $ps->execute([
        'tipo' => $respondente->tipo,
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