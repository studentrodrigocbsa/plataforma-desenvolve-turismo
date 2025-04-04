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
    //$usuario = $_SESSION['usuario'];
    $usuario = 'demonstracao';

    $controller = criarControladoraToken($pdo);
    $content = $controller->novoToken($usuario);
    $payload = json_encode([ 'token' => $content]);
    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});


$app->get( '/dashboard/tokens', function( $req, $res ) use ( $pdo ) 
{
    session_name('sid');
    session_start();
    //$usuario = $_SESSION['usuario'];
    $usuario = 'demonstracao';

    $controller = criarControladoraToken($pdo);
    $content = $controller->getTokensLinksUsuario($usuario);
    $payload = json_encode($content);
    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});