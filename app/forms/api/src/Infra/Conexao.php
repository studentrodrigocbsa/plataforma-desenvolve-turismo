<?php

class Conexao{
    private static $pdo = NULL;

    public static function pdo() {
        try{
            if(self::$pdo === NULL){
                self::$pdo = new PDO( 'mysql:dbname=tcc_base;host=localhost:3307;charset=utf8', 'tcc', 'tcc', [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ] );
            }
            return self::$pdo;
        }catch(Exception $e){
            throw new Exception($e->getMessage());
        }
    }
}
