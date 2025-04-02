<?php

class ControladoraToken{
    public function __construct(private RepositorioToken $repo, private GeradorToken $geradorToken){}


    public function novoToken($usuario): string{
        // Verificar se link existe antes de salvar
        $linksExistentes = $this->repo->todosTokens();
        do{
            $token = $this->geradorToken->gerarToken();
            // TODO: previnir loop
        }while(in_array($token, array_column($linksExistentes, 'token')));
        $this->repo->salvarToken($token,$usuario);
        return $token;
    }

    public function getTokensLinksUsuario($usuario): array{
        return $this->repo->todosTokensUsuario($usuario);
    }

}