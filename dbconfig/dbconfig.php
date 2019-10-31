<?php

function openConn() {
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'todo';

    $con = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname ) or die( 'Unable to Connect'.mysqli_error() );

    return $con;
}

function closeConn( $current_connection ) {
    mysqli_close( $current_connection );
    echo 'connection closed';
}

?>