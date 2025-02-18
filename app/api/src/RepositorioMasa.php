<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}

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

  public function contabilizarVotosRespondente($dados = []): bool{
    try {
      $sql = 
      '
        UPDATE opcao SET votos = votos + :voto WHERE opcao = :opcao AND pergunta = :id
      ';
      $ps1 = $this->pdo->prepare( $sql );

      foreach($dados as $resposta){

        $sql1 = 
        '
          SELECT id from pergunta WHERE titulo = :titulo
        ';
        $ps2 = $this->pdo->prepare($sql1);
        $ps2->execute(
          [
            'titulo' => $resposta->titulo
          ]
        );
        $id = $ps2->fetch();

        foreach($resposta->opcoes as $opcao){
          $ps1->execute( 
            [ 
              'id' => $id['id'],
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