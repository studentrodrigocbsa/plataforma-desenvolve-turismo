<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Factory\AppFactory;

require_once 'vendor/autoload.php';

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

// Add the RoutingMiddleware before the CORS middleware
// to ensure routing is performed later
$app->addRoutingMiddleware();

// Add the ErrorMiddleware before the CORS middleware
// to ensure error responses contain all CORS headers.
$app->addErrorMiddleware(true, true, true);

// This CORS middleware will append the response header
// Access-Control-Allow-Methods with all allowed methods
$app->add(function (ServerRequestInterface $request, RequestHandlerInterface $handler) use ($app): ResponseInterface {
    if ($request->getMethod() === 'OPTIONS') {
        $response = $app->getResponseFactory()->createResponse();
    } else {
        $response = $handler->handle($request);
    }

    $response = $response
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        ->withHeader('Access-Control-Allow-Headers', ['Host', 'Origin', 'Accept', 'Content-Type', 'Cookie', 'Authorization', 'ngrok-skip-browser-warning'])
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->withHeader('Pragma', 'no-cache');

    if (ob_get_contents()) {
        ob_clean();
    }

    return $response;
});

$pdo = Conexao::pdo();

// Define app routes
require_once 'src/Middleware/middlewareIsLogado.php';

require_once 'src/Infra/RotasLogin.php';
require_once 'src/Infra/RotasMasa.php';
require_once 'src/Infra/RotasToken.php';
// ...

$app->run();