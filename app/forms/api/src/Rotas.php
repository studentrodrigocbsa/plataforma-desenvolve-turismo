<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraMASA(PDO $pdo): ControladoraMasa {
    return new ControladoraMasa(
        new RepositorioMasa( $pdo ),
        new GestorDados()
    );
}




$app->get( '/masa/generic/resultados', function( $req, $res ) use ( $pdo ) 
{
    $token = isset($_GET['token']) ? $_GET['token'] : ''; 
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTotaisGenericosPesquisa($token);
    $res->json( $content );
});

$app->get( '/masa/aa/filtro', function( $req, $res ) use ( $pdo ) 
{
    $filtro = isset($_GET['filtro']) ? $_GET['filtro'] : '';
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTotaisPorFiltro($filtro);
    $res->json( $content );
});

$app->get( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getAA();
    $res->json( $content );
});

$app->post( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $dados = (array) $req->body();
    $controladora = criarControladoraMASA($pdo);
    $success = $controladora->postAA($dados);
    if ( $success ) {
        $res->json(['success' => true, 'message' => 'Survey concluído com sucesso!']);
    } else {
        $res->json(['success' => false, 'message' => 'Ocorreu um erro.']);
    }
});


$app->get( '/dashboard/novo/token', function( $req, $res ) use ( $pdo ) 
{
    $controller = criarControladoraMASA($pdo);
    $content = $controller->novoToken();
    $res->json( [ 'token' => $content] );
});
$app->get( '/dashboard/tokens', function( $req, $res ) use ( $pdo ) 
{
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTokensLinks();
    $res->json( $content );
});