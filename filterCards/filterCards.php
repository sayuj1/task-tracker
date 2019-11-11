<?php

// retrieving all tasks with status

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$tasksType = $_GET['tasks'];

if ( $tasksType == 'latestTasks' ) {
    $q = "SELECT * FROM `cardtask` WHERE username = '".$username."' ORDER BY datestarted DESC";
    $r = mysqli_query( $conn, $q );
    if ( mysqli_num_rows( $r )>0 ) {
        $taskInfo = array();
        while( $row = mysqli_fetch_assoc( $r ) ) {
            $taskInfo[] = $row;
        }

        echo json_encode( $taskInfo );
    } else {
        echo 'no task';
    }
} else if ( $tasksType == 'oldestTasks' ) {
    $q = "SELECT * FROM `cardtask` WHERE username = '".$username."' ORDER BY datestarted";
    $r = mysqli_query( $conn, $q );
    if ( mysqli_num_rows( $r )>0 ) {
        $taskInfo = array();
        while( $row = mysqli_fetch_assoc( $r ) ) {
            $taskInfo[] = $row;
        }

        echo json_encode( $taskInfo );
    } else {
        echo 'no task';
    }
}

closeConn( $conn );

?>