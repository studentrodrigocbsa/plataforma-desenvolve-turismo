<?php
require_once 'vendor/autoload.php';
use phputil\router\Router;
use function phputil\cors\cors;

set_exception_handler('TratadoraDeExcecoes::handler');

$origins = [ 'http://localhost:5173', 'http://localhost:8080', 'https://5c3d-2804-56c-d5ef-6700-562-fec3-d018-3300.ngrok-free.app', 'https://2d38-2804-56c-d5ef-6700-562-fec3-d018-3300.ngrok-free.app' ];

$app = new Router();
$app->use(cors([ 'origin' =>  $origins] ));


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Host, Origin, Accept, Content-Type, Cookie, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Expose-Headers: Content-Type, Content-Length, Set-Cookie");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


$pdo = Conexao::pdo();


require_once 'src/Middleware/middlewareIsLogado.php';

require_once 'src/Infra/RotasLogin.php';
require_once 'src/Infra/RotasMasa.php';
require_once 'src/Infra/RotasToken.php';


$app->listen();