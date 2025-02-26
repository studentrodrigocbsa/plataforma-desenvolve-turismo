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
        SELECT p.titulo,e.opcao,COUNT(e.opcao) AS votos, (SELECT AVG(nota) FROM respondente) AS desempenho_geral FROM escolha e  
            JOIN pergunta p ON e.pergunta = p.id 
          WHERE p.survey = 1 
            GROUP BY p.titulo,e.opcao;
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

  public function buscarPesquisaAA(): array{
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

      return $ps->rowCount();
    } catch (Exception $ex) {
      throw new Exception('Erro ao salvar respondente no banco de dados.', (int) $ex->getCode(), $ex);
    }
  }

  public function contabilizarVotosSurveyAA($survey): bool{
    try {
      $sqlContabilizarVotos = 
      '
        INSERT INTO escolha (respondente,pergunta,opcao) VALUES ((SELECT id FROM respondente ORDER BY id DESC LIMIT 1),(SELECT id FROM pergunta WHERE titulo = :titulo),:opcao) 
      ';
      $psContabilizarVotos = $this->pdo->prepare( $sqlContabilizarVotos );
    

      foreach($survey as $resposta){

        foreach($resposta->opcoes as $opcao){
          if($opcao->voto == 1){
            $sucesso = $psContabilizarVotos->execute( 
              [ 
                'opcao' => $opcao->opcao,
                'titulo' => $resposta->titulo
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