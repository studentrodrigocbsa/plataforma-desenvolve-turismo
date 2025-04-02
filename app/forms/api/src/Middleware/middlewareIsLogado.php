<?php
$middlewareIsLogado = function ( $req, $res, &$stop ) {
    session_name( 'sid' );
    session_start();
    file_put_contents('php://stderr', print_r($_SESSION, TRUE)); // debug
    $isLogged = isset( $_SESSION[ 'logado' ] ) && $_SESSION[ 'logado' ];
    if ( $isLogged ) {
        return; // Access allowed
    }
    $stop = true;
    $res->status( 401 )->send( 'Acesso sem autenticação.' ); // Unauthorized
};