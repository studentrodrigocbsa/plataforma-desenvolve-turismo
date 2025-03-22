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
    $id = isset($_GET['id']) ? $_GET['id'] : ''; // não faço nada... (ler controladora-relatorio.ts)
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTotaisGenericosPesquisa();
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
    $survey = $dados[0];
    $success = $controladora->postAA($survey);
    if ( $success ) {
        $res->json(['success' => true, 'message' => 'Survey concluído com sucesso!']);
    } else {
        $res->json(['success' => false, 'message' => 'Ocorreu um erro.']);
    }
});