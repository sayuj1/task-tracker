<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$cardTitle = mysqli_real_escape_string( $conn, $_POST['title'] );
$cardTask = mysqli_real_escape_string( $conn, $_POST['tasks'] );

date_default_timezone_set( 'Asia/Kolkata' );
$dateStarted = date( 'Y-m-d H:i:s' );
$dateObj = date_create( $dateStarted );
$dateFinal = date_format( $dateObj, 'j F Y :: H:i:s' );

$taskStatus = mysqli_real_escape_string( $conn, $_POST['status'] );
$assignedBy = mysqli_real_escape_string( $conn, $_POST['assignedby'] );

$query = "INSERT INTO `cardtask` (`id`,`username`,`title`,`task`,`datestarted`,`datecompleted`,`status`,`assignedby`) VALUES('','".$username."','".$cardTitle."','".$cardTask."','".$dateFinal."','','".$taskStatus."','".$assignedBy."')";

if ( mysqli_query( $conn, $query ) ) {
    echo 'insertionSuccessful';
} else {
    // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
    echo 'failed'+ $_POST['data'];
}

closeConn( $conn );

?>