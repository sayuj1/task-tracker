<?php

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

$username = $_SESSION['username'];
$cardID = $_POST['card-id'];
$cardTitle = $_POST['title'];
$cardTask = $_POST['tasks'];
$taskStatus = $_POST['status'];
$assignedBy = $_POST['assignedby'];

$query = "UPDATE `cardtask` SET title='".$cardTitle."', task='".$cardTask."', status='".$taskStatus."', assignedBy='".$assignedBy."' WHERE username='".$username."' AND id='".$cardID."'";

if ( mysqli_query( $conn, $query ) ) {
    echo 'updationSuccessful';
} else {
    // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
    echo 'failed';
}

closeConn( $conn );

?>