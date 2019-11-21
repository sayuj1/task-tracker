<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$todo = mysqli_real_escape_string( $conn, $_POST['todo'] );

date_default_timezone_set( 'Asia/Kolkata' );
$dateStarted = date( 'Y-m-d H:i:s' );
$dateObj = date_create( $dateStarted );
$dateFinal = date_format( $dateObj, 'j F Y :: H:i:s' );

$status = 'Pending';

$query = "INSERT INTO `todotask` (`todoid`,`username`,`todo`,`datecreated`,`status`) VALUES('','".$username."','".$todo."','".$dateFinal."','".$status."')";

if ( mysqli_query( $conn, $query ) ) {
    echo 'insertionSuccessful';
} else {
    // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
    echo 'failed';
}

todoCloseConn( $conn );

?>