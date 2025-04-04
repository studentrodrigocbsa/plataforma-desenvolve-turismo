<?php

use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Request;

$middlewareIsLogado = function (Request $request, RequestHandlerInterface $handler) use ($app) {
    session_name( 'sid' );
    session_start();
    file_put_contents('php://stderr', print_r($_SESSION, TRUE)); // debug
    $isLogged = isset( $_SESSION[ 'logado' ] ) && $_SESSION[ 'logado' ];
    if ( $isLogged ) {
        return;
    }
    // Short-circuit and return a response immediately
    $response = $app->getResponseFactory()->createResponse();
    $response = $response->withHeader('Access-Control-Allow-Origin', $request->getHeaderLine('Origin'));
    $response->getBody()->write('Unauthorized');
    
    return $response->withStatus(401);
};