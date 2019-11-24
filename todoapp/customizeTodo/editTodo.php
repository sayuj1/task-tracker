<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';
include_once '../loginCheck.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$todoID = $_POST['todoID'];
$todoContent = mysqli_escape_string( $conn, $_POST['todoContent'] );

$query = "UPDATE `todotask` SET todo='".$todoContent."' WHERE username='".$username."' AND todoid='".$todoID."'";

if ( mysqli_query( $conn, $query ) ) {
    echo 'updationSuccessful';

} else {
    // echo $todoContent;
    echo 'failed';
}

todoCloseConn( $conn );

?>