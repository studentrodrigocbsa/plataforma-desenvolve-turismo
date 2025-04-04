<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Factory\AppFactory;

require_once 'vendor/autoload.php';


session_set_cookie_params([
    'lifetime' => 86400,  // 1 dia
    'path' => '/',
    'domain' => 'https://11ce-2804-56c-d5ef-6700-a5f1-25b2-748b-58f8.ngrok-free.app',
    'secure' => true,  // IMPORTANTE: precisa ser `true` se estiver rodando em HTTPS
    'httponly' => true,
    'samesite' => 'None', // Permite cookies em requests cross-origin
]);


$app = AppFactory::create();

$app->addBodyParsingMiddleware();


// Add the ErrorMiddleware before the CORS middleware
// to ensure error responses contain all CORS headers.
$app->addErrorMiddleware(true, true, true);

require_once 'src/Middleware/middlewareIsLogado.php';

// This CORS middleware will append the response header
// Access-Control-Allow-Methods with all allowed methods
$app->add(function (ServerRequestInterface $request, RequestHandlerInterface $handler) use ($app): ResponseInterface {
    $allowedOrigins = [
        'https://11ce-2804-56c-d5ef-6700-a5f1-25b2-748b-58f8.ngrok-free.app',
        'http://localhost:5173',
        'http://localhost:8080',
        'https://be2c-2804-56c-d5ef-6700-a5f1-25b2-748b-58f8.ngrok-free.app'
    ];

    $origin = $request->getHeaderLine('Origin'); // Obtém o Origin da requisição

    file_put_contents('php://stderr', "Origin recebido: " . $origin . PHP_EOL, FILE_APPEND); // Debug

    if ($request->getMethod() === 'OPTIONS') {
        $response = $app->getResponseFactory()->createResponse();
    } else {
        $response = $handler->handle($request);
    }

    // 🛠️ Se a origem da requisição for válida, permitir o CORS
    if (in_array($origin, $allowedOrigins)) {
        $response = $response->withHeader('Access-Control-Allow-Origin', $origin);
    } else {
        file_put_contents('php://stderr', "⚠️ Origem NÃO permitida: " . $origin . PHP_EOL, FILE_APPEND);
    }

    return $response
        ->withHeader('Access-Control-Allow-Credentials', 'true')
        ->withHeader('Access-Control-Allow-Headers', 'Host, Origin, Accept, Content-Type, Cookie, Authorization, ngrok-skip-browser-warning')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->withHeader('Pragma', 'no-cache');
});


$pdo = Conexao::pdo();

// Define app routes


require_once 'src/Infra/RotasLogin.php';
require_once 'src/Infra/RotasMasa.php';
require_once 'src/Infra/RotasToken.php';
// ...

$app->run();