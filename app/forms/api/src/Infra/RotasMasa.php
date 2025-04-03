<?php

use Slim\Psr7\Request;
use Slim\Psr7\Response;

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraMasa(PDO $pdo): ControladoraMasa {
    return new ControladoraMasa(
        new RepositorioMasa( $pdo ),
        new CalculadorNota()
    );
}


$app->get( '/masa/generic/resultados', function( Request $req, Response $res ) use ( $pdo ) 
{
    $token = isset($_GET['token']) ? htmlspecialchars($_GET['token'], ENT_QUOTES, 'UTF-8') : ''; 
    $controller = criarControladoraMasa($pdo);
    $content = $controller->getTotaisGenericosPesquisa($token);
    $payload = json_encode($content);
    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});


$app->get( '/masa/aa', function( Request $req, Response $res ) use ( $pdo ) 
{
    $controller = criarControladoraMasa($pdo);
    $content = $controller->getAA();
    $payload = json_encode($content);
    $res->getBody()->write($payload);
    return $res->withHeader('Content-Type', 'application/json');
});

$app->post( '/masa/aa', function( Request $req, Response $res ) use ( $pdo ) 
{
    $dados = (array) $req->getParsedBody();
    $controladora = criarControladoraMasa($pdo);
    $success = $controladora->postAA($dados);
    if ( $success ) {
        $data = ['success' => true, 'message' => 'Survey concluído com sucesso!'];
        $payload = json_encode($data);
        $res->getBody()->write($payload);
        return $res->withHeader('Content-Type', 'application/json');
    } else {
        $data = ['success' => true, 'message' => 'Ocorreu um erro.'];
        $payload = json_encode($data);
        $res->getBody()->write($payload);
        return $res->withHeader('Content-Type', 'application/json');
    }
});
