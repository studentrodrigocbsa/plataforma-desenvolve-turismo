<?php
require_once 'vendor/autoload.php';
use phputil\router\Router;
use function phputil\cors\cors;

set_exception_handler('TratadoraDeExcecoes::handler');

$app = new Router();
$app->use(cors([ 'origin' => [ 'http://localhost:5173', 'http://localhost:8080' ] ] ));

$pdo = Conexao::pdo();


require_once 'src/Rotas.php';


$app->listen();