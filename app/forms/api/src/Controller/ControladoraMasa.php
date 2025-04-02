<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repo, private CalculadorNota $calculadorNota){}

    public function getAA(): array{
        return $this->repo->buscarPerguntasPesquisaAcessibilidadeAtitudinal();
    }

    public function postAA($dados = []): bool{

        if(count($dados) != 3){
            return false;
        }


        $survey = $dados[0];
        $respondente = $dados[1];
        $token = $dados[2];

        $this->calculadorNota->calcularNotaRespondente($respondente,$survey);
        $id = $this->repo->salvarRespondenteSurvey($respondente);
        return $this->repo->contabilizarVotosSurveyAA($survey,$id,$token);
    }

    public function getTotaisGenericosPesquisa($token){
        return $this->repo->totalRespostas($token);
    }
    
}