<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraToken(PDO $pdo): ControladoraToken {
    return new ControladoraToken(
        new RepositorioToken( $pdo ),
        new GeradorToken()
    );
}


$app->get( '/dashboard/novo/token', function( $req, $res ) use ( $pdo ) 
{
    session_name('sid');
    session_start();
    $usuario = $_SESSION['usuario'];

    $controller = criarControladoraToken($pdo);
    $content = $controller->novoToken($usuario);
    $res->json( [ 'token' => $content] );
});


$app->get( '/dashboard/tokens', function( $req, $res ) use ( $pdo ) 
{
    session_name('sid');
    session_start();
    $usuario = $_SESSION['usuario'];

    $controller = criarControladoraToken($pdo);
    $content = $controller->getTokensLinksUsuario($usuario);
    $res->json( $content );
});