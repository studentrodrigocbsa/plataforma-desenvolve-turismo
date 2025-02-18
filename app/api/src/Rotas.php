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