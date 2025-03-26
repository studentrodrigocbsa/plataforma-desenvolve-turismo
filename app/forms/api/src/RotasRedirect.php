<?php

set_exception_handler('TratadoraDeExcecoes::handler');



$app->get( '/redirect/to/relatorio', function( $req, $res ) use ( $pdo ) 
{
    header("ngrok-skip-browser-warning: 'skip it'");
    header("Location: ".DOMINIO."/front/pages/relatorio.html");
});

$app->get( '/redirect/to/survey', function( $req, $res ) use ( $pdo ) 
{
    header("ngrok-skip-browser-warning: 'skip it'");
    header("Location: ".DOMINIO."/front/pages/survey.html");
});