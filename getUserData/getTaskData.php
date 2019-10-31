<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$q = "SELECT * FROM `tasks` WHERE username = '".$username."'";
$r = mysqli_query( $conn, $q );
while( $row = mysqli_fetch_assoc( $r ) ) {
    $userInfo[] = $row;
}

echo json_encode( $userInfo );

closeConn( $conn );

?>