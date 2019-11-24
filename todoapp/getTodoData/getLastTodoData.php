<?php

// Retrieve the last todo added by the user

session_start();
include_once '../dbconfig/todoDBconfig.php';
include_once '../loginCheck.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$q = "SELECT * FROM `todotask` WHERE username = '".$username."' ORDER BY datecreated DESC LIMIT 1";
$r = mysqli_query( $conn, $q );
if ( mysqli_num_rows( $r )>0 ) {
    // $userInfo = array();
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    echo json_encode( $userInfo );

} else {
    echo 'Something Wrong';
}

todoCloseConn( $conn );

?>