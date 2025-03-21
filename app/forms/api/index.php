<?php
require_once 'vendor/autoload.php';
use phputil\router\Router;
use function phputil\cors\cors;

set_exception_handler('TratadoraDeExcecoes::handler');

$app = new Router();
$app->use(cors([ 'origin' => [ 'http://localhost:5173', 'http://localhost:8080', 'https://e786-179-191-193-57.ngrok-free.app', 'https://b877-179-191-193-57.ngrok-free.app' ] ] ));


header("Access-Control-Allow-Origin: '*");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Host, Origin, Accept, Content-Type, Cookie, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Expose-Headers: Content-Type, Content-Length, Set-Cookie");


$pdo = Conexao::pdo();


require_once 'src/Rotas.php';


$app->listen();