<?php

class RepositorioLogin
{

    public function __construct(
        private PDO $pdo
    ) {
    }

    public function login($login): array|bool
    {
        try {

            $ps = $this->pdo->prepare('
            
            SELECT usuario FROM login WHERE usuario = :usuario AND senha = :senha
            
            ');
            $ps->execute([
                'usuario' => $login->usuario,
                'senha' => $login->senha
            ]);
            return $ps->fetch(PDO::FETCH_ASSOC);

        } catch (PDOException $ex) {

            throw new Exception('Erro de login banco de dados.', (int) $ex->getCode(), $ex);

        }
    }
}