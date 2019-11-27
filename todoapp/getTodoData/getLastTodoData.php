<?php

// Retrieve the last todo added by the user

session_start();
include_once '../dbconfig/todoDBconfig.php';
include_once '../loginCheck.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$q = "SELECT * FROM `todotask` WHERE username = '".$username."' ORDER BY datecreated DESC LIMIT 1";
$r = mysqli_query( $conn, $q );

$q1 = "SELECT profileImg FROM tasktracker.user WHERE username = '".$username."'";
$r1 = mysqli_query( $conn, $q1 );

if ( mysqli_num_rows( $r )>0 ) {
    // $userInfo = array();
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    while( $row1 = mysqli_fetch_assoc( $r1 ) ) {
        $userInfo [] = $row1;
    }

    echo json_encode( $userInfo );

} else {
    echo 'Something Wrong';
}

todoCloseConn( $conn );

?>