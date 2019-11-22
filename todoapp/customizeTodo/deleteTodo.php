<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$todoID = $_GET['todoID'];

$q = "DELETE FROM `todoTask` WHERE username='".$username."' AND todoid='".$todoID."'";
$r = mysqli_query( $conn, $q );
if ( $r ) {
    echo 'successful';
} else {
    echo 'failed';
}
todoCloseConn( $conn );

// Note --> Don't know why for zero rows the result gets into error option in AJAX
?>