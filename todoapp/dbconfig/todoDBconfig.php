<?php

function todoOpenConn() {
    //* For localhost
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'todoapp';

    // //* For hosting
    // $dbhost = 'sql304.epizy.com';
    // $dbuser = 'epiz_23463074';
    // $dbpass = 'haVaswApc';
    // $dbname = 'epiz_23463074_todoapp';

    $con = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname ) or die( 'Unable to Connect'.mysqli_error() );

    return $con;
}

function todoCloseConn( $current_connection ) {
    mysqli_close( $current_connection );
    // echo 'connection closed';
}

?>