<?php

// Retrieve the last card added by the user

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

$username = $_SESSION['username'];
$q = "SELECT * FROM `cardtask` WHERE username = '".$username."' ORDER BY datestarted DESC LIMIT 1";
$r = mysqli_query( $conn, $q );
if ( mysqli_num_rows( $r )>0 ) {
    $userInfo = array();
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    echo json_encode( $userInfo );

} else {
    echo 'Something Wrong';
}

closeConn( $conn );

?>