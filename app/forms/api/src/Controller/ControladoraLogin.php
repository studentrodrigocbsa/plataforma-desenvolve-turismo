<?php

class ControladoraLogin {

    public function __construct(private RepositorioLogin $repoLogin) {}

    public function postCadastro($usuario,$senha): bool {
        $login = new Login($usuario,$senha);
        // Gerar o sal e a pimenta, que serão fixos
        $sal = $login->gerarHash40Caracteres();
        $pimenta = $login->gerarHash40Caracteres();
        $login->sal = $sal;
        $login->pimenta = $pimenta;
        // Gerar uma senha criptografada
        $hash = $login->criptografarSenha();
        // Atualizar a senha e cadastrar o login
        $login->senha = $hash;
        return $this->repoLogin->cadastrar($login);
    }

    public function postLogin($usuario,$senha): array|bool{
        try{

            if($usuario == '' || $senha == ''){
                throw new Exception('Usuário ou senha inválidos.');
            }
            // pegar sal e pimenta do usuário caso ele exista
            $dados = $this->pegarSalePimentaDoUsuario($usuario);

            if(!count($dados)){
                return false;
            }

            $login = new Login($usuario,$senha,$dados['sal'],$dados['pimenta']);
            // transferir o sal e a pimenta do usuário existente para o hash com a senha utilizada no login
            $hash = $login->criptografarSenha();
            $login->senha = $hash;


            // pegar dados a partir do hash gerado com a senha de login, caso exista
            $dadosUser = $this->login($login);


            if(count($dadosUser)){ 
                $_SESSION[ 'logado' ] = true;
                $_SESSION[ 'usuario' ] = $usuario;
                return true;
            } else { // login inexistente
                return false;
            }

        } catch(Exception $ex){
            throw $ex;
        }
        
    }


    private function pegarSalePimentaDoUsuario($usuario): array{
        $resposta = $this->repoLogin->sal($usuario);
        return $resposta == false ? [] : $resposta;
    }

    private function login($login): array{
        $resposta = $this->repoLogin->login($login);
        return $resposta == false ? [] : $resposta;
    }
}