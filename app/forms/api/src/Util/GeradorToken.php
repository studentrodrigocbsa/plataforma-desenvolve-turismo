<?php
class GeradorToken{

    public function gerarToken(){
        $token = bin2hex(random_bytes(30));
        return $token;
    }
    
}