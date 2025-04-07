<?php

class Login {
    public function __construct(
        public string $usuario,
        public string $senha,
        public string $sal = '',
        public string $pimenta = ''
    ) {}

    ////////////////////////////////////////
    /* MÉTODOS AUXILIARES DE HASHING */
    /* não mudar */
    function criptografarSenha(): string{
        return hash( 'sha512',
    '402398mrn dohdioçs7493e5ptrq ewçtw' . $this->sal . $this->senha . '4932oewrifdjsép9723o erfyewdnf079 o4' . $this->pimenta );
    }
    function gerarHash40Caracteres(): string {
        return bin2hex( random_bytes( 20 ) );
    }
    ////////////////////////////////////////
}