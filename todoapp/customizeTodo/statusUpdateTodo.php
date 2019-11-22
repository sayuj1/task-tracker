<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];
$todoID = $_POST['todoID'];
$todoStatus = $_POST['todoStatus'];

if ( $todoStatus == 'Complete' ) {
    statusUpdate( 'Complete', $username, $todoID );
} else if ( $todoStatus == 'Pending' ) {
    statusUpdate( 'Pending', $username, $todoID );
}

function statusUpdate( $todoStatus, $username, $todoID ) {
    $query = "UPDATE `todotask` SET status='".$todoStatus."' WHERE username='".$username."' AND todoid='".$todoID."'";

    if ( mysqli_query( $GLOBALS['conn'], $query ) ) {
        echo 'updationSuccessful';
    } else {
        // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
        echo 'failed';
    }

}

todoCloseConn( $conn );

?>