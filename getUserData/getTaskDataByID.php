<?php

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

// for editing the card data

$username = $_SESSION['username'];
$cardID = $_GET['cardID'];
$q = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND id = '".$cardID."'";
$r = mysqli_query( $conn, $q );
if ( mysqli_num_rows( $r ) === 0 ) {
    echo 'zeroRow';
} else if ( mysqli_num_rows( $r ) > 0 ) {
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    echo json_encode( $userInfo );
} else {
    echo 'something wrong';
}

closeConn( $conn );

// Note --> Don't know why for zero rows the result gets into error option in AJAX
?>