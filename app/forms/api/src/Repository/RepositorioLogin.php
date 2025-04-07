<?php

class RepositorioLogin
{

    public function __construct(
        private PDO $pdo
    ) {
    }

    public function cadastrar($login): array|bool
    {
        try {

            $ps = $this->pdo->prepare('
            
            INSERT login(usuario,senha,sal,pimenta) VALUES (:usuario, :senha, :sal, :pimenta)
            
            ');
            $ps->execute([
                'usuario' => $login->usuario,
                'senha' => $login->senha,
                'sal' => $login->sal,
                'pimenta' => $login->pimenta
            ]);
            return $ps->rowCount() > 0;

        } catch (PDOException $ex) {

            throw new Exception('Erro ao cadastrar o login no banco de dados.', (int) $ex->getCode(), $ex);

        }
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

    public function sal(string $usuario): array|bool
    {
        try {

            $ps = $this->pdo->prepare('SELECT sal,pimenta FROM login WHERE usuario = :usuario');
            $ps->execute(['usuario' => $usuario]);
            return $ps->fetch( PDO::FETCH_ASSOC );

        } catch (PDOException $ex) {

            throw new Exception('Erro ao consultar dados do sal no banco de dados.', (int) $ex->getCode(), $ex);

        }
    }
}