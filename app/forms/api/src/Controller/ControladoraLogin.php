<?php

class ControladoraLogin {

    public function __construct(private RepositorioLogin $repoLogin) {}


    public function postLogin($usuario,$senha): array|bool{
        try{

            $login = new Login($usuario,$senha);


            $dados = $this->repoLogin->login($login);


            if($dados === false){
                return $dados;
            }
            

            file_put_contents('php://stderr', print_r(session_get_cookie_params(), TRUE)); // debug

            $_SESSION[ 'logado' ] = true;
            $_SESSION[ 'usuario' ] = $usuario;
            return ['success' => $_SESSION[ 'logado' ], 'usuario' => $_SESSION[ 'usuario' ] ]; // envia dados para o front. No futuro pode incluir dados do destino turístico ...

        } catch(Exception $ex){
            throw $ex;
        }
        
    }
}