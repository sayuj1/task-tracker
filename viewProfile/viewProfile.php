<?php

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

$username = $_SESSION['username'];
$query = "SELECT * FROM `user` WHERE username = '".$username."'";
$result = mysqli_query( $conn, $query );

if ( mysqli_num_rows( $result )>0 ) {
    $userInfo = array();
    while( $row = mysqli_fetch_assoc( $result ) ) {
        $userInfo[] = $row;
    }
    echo json_encode( $userInfo );
} else {
    echo 'no user found';
}

closeConn( $conn );

?>