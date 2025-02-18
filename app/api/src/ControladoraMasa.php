<?php

class ControladoraMasa{
    public function __construct(private RepositorioMasa $repoMasa){}

    public function getAA(): array{
        return $this->repoMasa->buscarPesquisaAA();
    }
}