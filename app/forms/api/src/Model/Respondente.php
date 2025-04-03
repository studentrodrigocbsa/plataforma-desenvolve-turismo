<?php
class Respondente{
    public function __construct(
        public string $perfil,
        public string $faixa_etaria,
        public string $escolaridade,
        public string $cargo,
        public string $nota
    ) {}
}