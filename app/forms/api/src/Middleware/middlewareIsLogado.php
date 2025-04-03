<?php

use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Request;

$middlewareIsLogado = function (Request $request, RequestHandlerInterface $handler) use ($app) {
    session_name( 'sid' );
    session_start();
    file_put_contents('php://stderr', print_r($_SESSION, TRUE)); // debug
    $isLogged = isset( $_SESSION[ 'logado' ] ) && $_SESSION[ 'logado' ];
    if ( $isLogged ) {
        return $handler->handle($request);
    }
    // Short-circuit and return a response immediately
    $response = $app->getResponseFactory()->createResponse();
    $response->getBody()->write('Unauthorized');

    /*
    $response
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Origin', 'https://69db-2804-56c-d5ef-6700-5f95-d802-53a7-c2d0.ngrok-free.app')
        ->withHeader('Access-Control-Allow-Headers', '*')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->withHeader('Pragma', 'no-cache');
        */
    
    return $response->withStatus(401);
};