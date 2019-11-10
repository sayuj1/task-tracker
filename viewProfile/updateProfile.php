<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$firstname = mysqli_escape_string( $conn, $_POST['firstname'] );
$lastname = mysqli_escape_string( $conn, $_POST['lastname'] );

$query = "UPDATE `user` SET firstname = '".$firstname."', lastname='".$lastname."' WHERE username='".$username."'";

if ( mysqli_query( $conn, $query ) ) {
    $_SESSION['firstname'] = $firstname;

    $userStatus = array( 'status'=>'updationSuccessful', 'firstname'=>$_SESSION['firstname'] );

    $myJSON = json_encode( $userStatus );
    echo $myJSON;

} else {
    // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
    echo 'failed';
}

closeConn( $conn );

?>