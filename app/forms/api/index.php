<?php
require_once 'vendor/autoload.php';
use phputil\router\Router;
use function phputil\cors\cors;

set_exception_handler('TratadoraDeExcecoes::handler');

$app = new Router();
$app->use(cors([ 'origin' => [ 'http://localhost:5173', 'http://localhost:8080', 'https://5c3d-2804-56c-d5ef-6700-562-fec3-d018-3300.ngrok-free.app', 'https://2d38-2804-56c-d5ef-6700-562-fec3-d018-3300.ngrok-free.app' ] ] ));


header("Access-Control-Allow-Origin: '*");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Host, Origin, Accept, Content-Type, Cookie, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Expose-Headers: Content-Type, Content-Length, Set-Cookie");


$pdo = Conexao::pdo();


require_once 'src/Rotas.php';
//require_once 'src/RotasRedirect.php';


$app->listen();