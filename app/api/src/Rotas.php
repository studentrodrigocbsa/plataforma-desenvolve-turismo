<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraMASA(PDO $pdo): ControladoraMasa {
    return new ControladoraMasa(
        new RepositorioMasa( $pdo )
    );
}


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
        $res->json(['success' => true, 'message' => 'Escolhas contabilizadas!']);
    } else {
        $res->json(['success' => false, 'message' => 'Ocorreu um erro.']);
    }
});