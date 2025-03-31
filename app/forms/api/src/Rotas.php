<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraMASA(PDO $pdo): ControladoraMasa {
    return new ControladoraMasa(
        new RepositorioMasa( $pdo ),
        new GestorDados()
    );
}

function criarControladoraLogin( PDO $pdo ) {
    return new ControladoraLogin(
        new RepositorioLogin( $pdo )
    );
}


$app->get('/logado', $middlewareIsLogado, function($req,$res) use ($pdo) {
    $res->status( 200 )->send( 'Acesso autenticado.' );
});

$app->get( '/masa/generic/resultados', function( $req, $res ) use ( $pdo ) 
{
    $token = isset($_GET['token']) ? htmlspecialchars($_GET['token'], ENT_QUOTES, 'UTF-8') : ''; 
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTotaisGenericosPesquisa($token);
    $res->json( $content );
});

$app->get( '/masa/aa/filtro', function( $req, $res ) use ( $pdo ) 
{
    $filtro = isset($_GET['filtro']) ? $_GET['filtro'] : '';
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTotaisPorFiltro($filtro);
    $res->json( $content );
});

$app->get( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $controller = criarControladoraMASA($pdo);
    $content = $controller->getAA();
    $res->json( $content );
});

$app->post( '/masa/aa', function( $req, $res ) use ( $pdo ) 
{
    $dados = (array) $req->body();
    $controladora = criarControladoraMASA($pdo);
    $success = $controladora->postAA($dados);
    if ( $success ) {
        $res->json(['success' => true, 'message' => 'Survey concluído com sucesso!']);
    } else {
        $res->json(['success' => false, 'message' => 'Ocorreu um erro.']);
    }
});


$app->get( '/dashboard/novo/token', function( $req, $res ) use ( $pdo ) 
{
    session_name('sid');
    session_start();
    $usuario = $_SESSION['usuario'];

    $controller = criarControladoraMASA($pdo);
    $content = $controller->novoToken($usuario);
    $res->json( [ 'token' => $content] );
});
$app->get( '/dashboard/tokens', function( $req, $res ) use ( $pdo ) 
{
    session_name('sid');
    session_start();
    $usuario = $_SESSION['usuario'];

    $controller = criarControladoraMASA($pdo);
    $content = $controller->getTokensLinksUsuario($usuario);
    $res->json( $content );
});


$app->post('/login', function( $req, $res ) use ($pdo) {
    
    $dados = (array) $req->body();

    $usuario = htmlspecialchars( $dados[ 'usuario' ] ?? '' );
    $senha = htmlspecialchars( $dados[ 'senha' ] ?? '' );


    $controladora = criarControladoraLogin($pdo);
    

    $resposta = $controladora->postLogin($usuario,$senha);

    if($resposta === false){
        $res->json(['success' => false, 'message' => 'Login inexistente.']);
    } else{
        $res->json($resposta);
    }

});