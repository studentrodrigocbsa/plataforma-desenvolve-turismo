<?php
class Survey{
    public function __construct(
        public string $titulo,
        public bool $respondida,
        public array $opcoes
    ){}
}