<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraMasa(PDO $pdo): ControladoraMasa {
    return new ControladoraMasa(
        new RepositorioMasa( $pdo ),
        new CalculadorNota()
    );
}


$app->get( '/masa/generic/resultados', function( $req, $res ) use ( $pdo ) 
{
    $token = isset($_GET['token']) ? htmlspecialchars($_GET['token'], ENT_QUOTES, 'UTF-8') : ''; 
    $controller = criarControladoraMasa($pdo);
    $content = $controller->getTotaisGenericosPesquisa($token);
    $res->json( $content );
});


$app->get( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $controller = criarControladoraMasa($pdo);
    $content = $controller->getAA();
    $res->json( $content );
});

$app->post( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $dados = (array) $req->body();
    $controladora = criarControladoraMasa($pdo);
    $success = $controladora->postAA($dados);
    if ( $success ) {
        $res->json(['success' => true, 'message' => 'Survey concluído com sucesso!']);
    } else {
        $res->json(['success' => false, 'message' => 'Ocorreu um erro.']);
    }
});
