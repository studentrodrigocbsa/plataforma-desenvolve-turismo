<?php

use Slim\Psr7\Request;
use Slim\Psr7\Response;

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraLogin( PDO $pdo ): ControladoraLogin {
    return new ControladoraLogin(
        new RepositorioLogin( $pdo )
    );
}


$app->get('/logado',function (Request $req, Response $res) {
    return $res->withStatus( 200 );
})->add($middlewareIsLogado);


$app->post('/logout', function( Request $req, Response $res ) {
    session_unset();
    setcookie("sid", "", time() - 86400); // deletando o cookie
    session_destroy();
    return $res->withHeader('Location', DOMINIO)->withStatus(302);
});


$app->post('/login', function( Request $req, Response $res ) use ($pdo) {
    
    $dados = (array) $req->getParsedBody();

    $usuario = htmlspecialchars( $dados[ 'usuario' ] ?? '' );
    $senha = htmlspecialchars( $dados[ 'senha' ] ?? '' );


    $controladora = criarControladoraLogin($pdo);
    

    $content = $controladora->postLogin($usuario,$senha);

    if($content === false){
        $data = ['success' => false, 'message' => 'Login inexistente.'];
        $payload = json_encode($data);
        $res->getBody()->write($payload);
        return $res->withHeader('Content-Type', 'application/json');
    }
    $data = ['success' => true, 'message' => 'Sucesso.'];
    $payload = json_encode(value: $data);
    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});

$app->post('/cadastro/usuario', function( Request $req, Response $res ) use ($pdo) {
    
    $dados = (array) $req->getParsedBody();

    $usuario = htmlspecialchars( $dados[ 'usuario' ] ?? '' );
    $senha = htmlspecialchars( $dados[ 'senha' ] ?? '' );


    $controladora = criarControladoraLogin($pdo);
    

    $success = $controladora->postCadastro($usuario,$senha);

    if($success){
        $data = ['success' => true, 'message' => 'Cadastro realizado com sucesso! Você já pode logar.'];
        $payload = json_encode($data);
        $res->getBody()->write($payload);
        return $res->withHeader('Content-Type', 'application/json');
    } else{
        $data = ['success' => false, 'message' => 'Ocorreu um erro ao cadastrar.'];
        $payload = json_encode($data);
        $res->getBody()->write($payload);
        return $res->withHeader('Content-Type', 'application/json');
    }

});