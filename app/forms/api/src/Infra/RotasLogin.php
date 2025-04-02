<?php

set_exception_handler('TratadoraDeExcecoes::handler');

function criarControladoraLogin( PDO $pdo ): ControladoraLogin {
    return new ControladoraLogin(
        new RepositorioLogin( $pdo )
    );
}


$app->get('/logado', $middlewareIsLogado, function($req,$res) use ($pdo) {
    $res->status( 200 )->send( 'Acesso autenticado.' );
});


$app->post('/logout', function( $req, $res ) use ($pdo) {
    
    session_name('sid');
    session_start();

    $cookie = $req->cookie( 'sid' );

    if (isset($_SESSION['logado']) && $_SESSION['logado'] === TRUE && $cookie) {
        session_unset();
        setcookie("sid", "", time() - 3600); // deletando o cookie
        session_destroy();
        header('Location: '.DOMINIO);
        exit;
    }

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