<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}


  public function dadosRespondentesPesquisa($id){
    try {
      $ps = $this->pdo->prepare('');
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
        $ps = $this->pdo->prepare('SELECT p.titulo,o.opcao FROM pergunta p JOIN opcao o ON o.pergunta = p.id ORDER BY p.id');
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

  public function contabilizarRespondenteSurvey($respondente): bool{
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

  public function contabilizarVotosSurvey($survey): bool{
    try {
      $sqlContabilizarVotos = 
      '
        UPDATE opcao SET votos = votos + :voto WHERE opcao = :opcao AND pergunta = :id;
      ';
      $psContabilizarVotos = $this->pdo->prepare( $sqlContabilizarVotos );

      foreach($survey as $resposta){

        $sqlIdPergunta = 
        '
          SELECT id from pergunta WHERE titulo = :titulo
        ';
        $psIdPergunta = $this->pdo->prepare($sqlIdPergunta);
        $psIdPergunta->execute(
          [
            'titulo' => $resposta->titulo
          ]
        );
        $id = $psIdPergunta->fetch();
        $idPergunta = $id['id'];

        foreach($resposta->opcoes as $opcao){
          $psContabilizarVotos->execute( 
            [ 
              'id' => $idPergunta,
              'opcao' => $opcao->opcao,
              'voto' => $opcao->voto
            ] 
          );
        }

      }

      
      return true;

    } catch ( Exception $ex ) {
      throw new Exception( $ex->getMessage(), (int) $ex->getCode(), $ex );
    }

  }
}