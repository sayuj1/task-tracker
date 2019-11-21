<?php

function todoOpenConn() {
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'todoapp';

    $con = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname ) or die( 'Unable to Connect'.mysqli_error() );

    return $con;
}

function todoCloseConn( $current_connection ) {
    mysqli_close( $current_connection );
    // echo 'connection closed';
}

?>