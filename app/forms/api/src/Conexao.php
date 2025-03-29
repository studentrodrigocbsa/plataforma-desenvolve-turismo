<?php

class Conexao{
    private static $pdo = NULL;

    public static function pdo() {
        try{
            if(self::$pdo === NULL){
                self::$pdo = new PDO( 'mysql:dbname=tcc_base_dados_respondente_token;host=localhost:3307;charset=utf8', 'admin', 'admin', [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ] );
            }
            return self::$pdo;
        }catch(Exception $e){
            throw new Exception($e->getMessage());
        }
    }
}