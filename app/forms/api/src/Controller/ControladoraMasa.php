<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repo, private CalculadorNota $calculadorNota){}

    public function getAA(): array{
        return $this->repo->buscarPerguntasPesquisaAcessibilidadeAtitudinal();
    }

    public function postAA($dados = []): bool{

        Sanitizador::sanitize_recursive($dados);


        $dadosSurvey = $dados[0];
        $arraySurvey = [];
        $opcaoArray = [];
        foreach($dadosSurvey as $pergunta){
            $titulo = $pergunta['titulo'];
            $respondida = $pergunta['respondida'];
            foreach($pergunta['opcoes'] as $opcao){
                $obj = new Opcao($opcao['opcao'],$opcao['voto']);
                $opcaoArray []= $obj;
            }
            $survey = new Survey($titulo,$respondida,$opcaoArray);
            $arraySurvey []= $survey;
            $opcaoArray = [];
        }

        $dadosRespondente = $dados[1];
        $respondente = new Respondente($dadosRespondente['perfil'],$dadosRespondente['faixa_etaria'],$dadosRespondente['escolaridade'],$dadosRespondente['cargo'],$dadosRespondente['nota']);
        
        $token = $dados[2];

        //file_put_contents('php://stderr', print_r($dados, TRUE)); // debug

        $this->calculadorNota->calcularNotaRespondente($respondente,$arraySurvey);
        $id = $this->repo->salvarRespondenteSurvey($respondente);
        return $this->repo->contabilizarVotosSurveyAA($arraySurvey,$id,$token);
    }

    public function getTotaisGenericosPesquisa($token){
        return $this->repo->totalRespostas($token);
    }
    
}