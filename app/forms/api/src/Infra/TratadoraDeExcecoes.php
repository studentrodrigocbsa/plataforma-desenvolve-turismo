<?php

class TratadoraDeExcecoes{

    public static function handler(Throwable $e): void {

        file_put_contents('php://stderr', print_r($e, TRUE)); // debug

        if(is_a($e,'Exception',true)){
            TratadoraDeExcecoes::erro( 500, $e->getMessage() );
        }
        
    }

    private static function erro($status, $dados) {
        file_put_contents('php://stderr', print_r($dados, TRUE)); // debug
        http_response_code($status);
        header('Content-Type: application/json');
        die( json_encode( ['message' => $dados] ) );
    }
    
}

