<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$firstname = mysqli_escape_string( $conn, $_POST['firstname'] );
$lastname = mysqli_escape_string( $conn, $_POST['lastname'] );

$query = "UPDATE `user` SET firstname = '".$firstname."', lastname='".$lastname."' WHERE username='".$username."'";

if ( mysqli_query( $conn, $query ) ) {
    echo 'updationSuccessful';
    $_SESSION['firstname'] = $firstname;
} else {
    // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
    echo 'failed';
}

closeConn( $conn );

?>