<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repoMasa){}

    public function getAA(): array{
        return $this->repoMasa->buscarPesquisaAA();
    }

    public function postAA($dados = []): bool{

        if(count($dados) == 0){
            return false;
        }

        return $this->repoMasa->contabilizarVotosRespondente($dados);
    }
}