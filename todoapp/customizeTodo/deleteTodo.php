<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';
include_once '../loginCheck.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$todoID = $_GET['todoID'];

$q = "DELETE FROM `todotask` WHERE username='".$username."' AND todoid='".$todoID."'";
$r = mysqli_query( $conn, $q );
if ( $r ) {
    $q1 = "SELECT * FROM `todotask` WHERE username = '".$username."'";
    $r1 = mysqli_query( $conn, $q1 );
    $count = mysqli_num_rows( $r1 );
    echo 'successful::'.$count;

} else {
    echo 'failed';
}
todoCloseConn( $conn );

// Note --> Don't know why for zero rows the result gets into error option in AJAX
?>