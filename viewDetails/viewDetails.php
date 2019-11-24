<?php

session_start();
include_once '../dbconfig/dbconfig.php';
include_once '../loginRegister/loginCheck.php';

$conn = openConn();

$username = $_SESSION['username'];

$query1 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Ongoing'";
$query2 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Delayed'";
$query3 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Pause'";
$query5 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Stopped'";
$query6 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Completed'";
$query7 = "SELECT * FROM `cardtask` WHERE username = '".$username."' AND status = 'Not Started Yet'";

$result1 = mysqli_query( $conn, $query1 );
$result2 = mysqli_query( $conn, $query2 );
$result3 = mysqli_query( $conn, $query3 );
$result5 = mysqli_query( $conn, $query5 );
$result6 = mysqli_query( $conn, $query6 );
$result7 = mysqli_query( $conn, $query7 );

if ( mysqli_num_rows( $result1 )>0 || mysqli_num_rows( $result2 )>0 || mysqli_num_rows( $result3 )>0 || mysqli_num_rows( $result5 )>0 || mysqli_num_rows( $result6 )>0 || mysqli_num_rows( $result7 )>0 ) {

    $countOngoing = mysqli_num_rows( $result1 );
    $countDelayed = mysqli_num_rows( $result2 );
    $countPause = mysqli_num_rows( $result3 );
    $countStopped = mysqli_num_rows( $result5 );
    $countCompleted = mysqli_num_rows( $result6 );
    $countNotStartedYet = mysqli_num_rows( $result7 );

    $arr = array( 'Ongoing'=>$countOngoing, 'Delayed'=>$countDelayed, 'Pause'=>$countPause, 'Stopped'=>$countStopped, 'Completed'=>$countCompleted, 'NotStartedYet'=>$countNotStartedYet );
    $myJSON = json_encode( $arr );

    echo $myJSON;

} else {
    $arr = array( 'Ongoing'=>0, 'Delayed'=>0, 'Pause'=>0, 'Stopped'=>0, 'Completed'=>0, 'NotStartedYet'=>0 );
    $myJSON = json_encode( $arr );

    echo $myJSON;
    // echo 'No task yet';
}

closeConn( $conn );

?>