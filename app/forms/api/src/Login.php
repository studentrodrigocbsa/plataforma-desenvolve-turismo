<?php

class Login {
    public function __construct(
        public string $usuario,
        public string $senha
    ) {}
}