<?php

class RepositorioMasa
{

  public function __construct(
    private PDO $pdo
  ){}

  public function buscarPesquisaAA(): array{
    try {
        $ps = $this->pdo->prepare('SELECT p.titulo,o.opcao FROM pergunta p JOIN opcao o ON o.pergunta = p.id');
        $ps->execute();
        $dados = $ps->fetchAll(PDO::FETCH_ASSOC);
  
        $array = [];

        for($i = 0; $i < count($dados); $i++){
            $pergunta = new stdClass();
            $pergunta->titulo = $dados[$i]['titulo'];
            $pergunta->opcoes = [];
            for($j = $i; $j < $i + 5; $j++){
                $pergunta->opcoes []= [ 'opcao' => $dados[$j]['opcao'], 'votos' => 0];
            }
            $array []= $pergunta;
        }
  
        return $array;
    } catch (Exception $ex) {
        throw new Exception('Erro ao buscar pesquisa no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function contabilizarVotosVisitante(){

  }
}