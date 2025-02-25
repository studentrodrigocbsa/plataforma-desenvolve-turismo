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

        $this->gestorDados->calcularNotaRespondente($respondente,$survey);
        $id = $this->repoMasa->salvarRespondenteSurvey($respondente);
        return $this->repoMasa->contabilizarVotosSurveyAA($survey, $id);
    }

    public function getTotaisGenericosPesquisa(){
        return $this->repoMasa->totalRespostas();
    }

    public function getTotaisPorFiltro($filtro): array{
        $campo_respondente_bd = $this->gestorDados->tradutorDeFiltro($filtro);
        return $this->repoMasa->totalRespostasPorFiltro($campo_respondente_bd);
    }
}