<?php

use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Request;

$middlewareIsLogado = function (Request $request, RequestHandlerInterface $handler) use ($app) {
    file_put_contents('php://stderr', print_r($_SESSION, TRUE)); // debug
    file_put_contents('php://stderr', print_r($_COOKIE, TRUE)); // debug
    $isLogged = isset( $_SESSION[ 'logado' ] ) && $_SESSION[ 'logado' ];
    if ( $isLogged ) {
        return $handler->handle($request);
    }
    // Short-circuit and return a response immediately
    $response = $app->getResponseFactory()->createResponse();
    $response->getBody()->write('Acesso não autorizado.');
    
    return $response->withStatus(401);
};