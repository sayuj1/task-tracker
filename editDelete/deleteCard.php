<?php

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

$username = $_SESSION['username'];
$cardID = $_POST['cardID'];
$q = "DELETE FROM `cardtask` WHERE username='".$username."' AND id='".$cardID."'";
$r = mysqli_query( $conn, $q );
if ( $r ) {
    echo 'successful';
} else {
    echo 'failed';
}

closeConn( $conn );

?>