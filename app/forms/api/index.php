<?php
use Slim\Factory\AppFactory;

require_once 'vendor/autoload.php';

session_name( 'sid' );
session_start();


$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$pdo = Conexao::pdo();

require_once 'src/Infra/domain.php'; // const DOMINIO

// Define app routes
require_once 'src/Middleware/middlewareIsLogado.php';

require_once 'src/Infra/RotasLogin.php';
require_once 'src/Infra/RotasMasa.php';
require_once 'src/Infra/RotasToken.php';
// ...

$app->run();