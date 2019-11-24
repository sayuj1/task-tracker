<?php

function openConn() {
    //* For localhost
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'tasktracker';

    //* For hosting
    // $dbhost = 'sql304.epizy.com';
    // $dbuser = 'epiz_23463074';
    // $dbpass = 'haVaswApc';
    // $dbname = 'epiz_23463074_tasktracker';

    $con = mysqli_connect( $dbhost, $dbuser, $dbpass, $dbname ) or die( 'Unable to Connect'.mysqli_error() );

    return $con;
}

function closeConn( $current_connection ) {
    mysqli_close( $current_connection );
    // echo 'connection closed';
}

?>