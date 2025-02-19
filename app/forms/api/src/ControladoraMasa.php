<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repoMasa, private GestorDados $gestorDados){}

    public function getAA(): array{
        return $this->repoMasa->buscarPesquisaAA();
    }

    public function postAA($dados = []): bool{

        if(count($dados) == 0){
            return false;
        }

        $survey = $dados[0];
        $respondente = $dados[1];

        $this->gestorDados->calcularNotaAA($respondente,$survey);
        $this->repoMasa->contabilizarRespondenteSurvey($respondente);
        return $this->repoMasa->contabilizarVotosSurvey($survey);
    }

    public function getResultadosPesquisa($id){
        return $this->repoMasa->dadosRespondentesPesquisa($id);
    }
}