<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repoMasa, private GestorDados $gestorDados){}

    public function getAA(): array{
        return $this->repoMasa->buscarPesquisaAA();
    }

    public function postAA($survey): bool{

        $nota = $this->gestorDados->calcularNotaRespondente($survey);
        $this->repoMasa->salvarNotaRespondenteSurvey($nota);
        return $this->repoMasa->contabilizarVotosSurveyAA($survey);
    }

    public function getTotaisGenericosPesquisa(){
        return $this->repoMasa->totalRespostas();
    }
}