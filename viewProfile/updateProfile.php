<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$firstname = mysqli_escape_string( $conn, $_POST['firstname'] );
$lastname = mysqli_escape_string( $conn, $_POST['lastname'] );

$errors['status'] = 'notSuccessful';
$errors['status1'] = '';
$errors['status2'] = '';

if ( empty( $firstname ) || empty( $lastname ) || empty( $username ) || empty( $password ) ) {

    $errors['status1'] = 'emptyFields';
}

if ( !preg_match( "/^[a-zA-Z ]*$/", $firstname ) || !preg_match( "/^[a-zA-Z ]*$/", $lastname ) ) {
    $errors['status2'] = 'nameIncorrect';

} else {
    $query = "UPDATE `user` SET firstname = '".$firstname."', lastname='".$lastname."' WHERE username='".$username."'";

    if ( mysqli_query( $conn, $query ) ) {

        $_SESSION['firstname'] = $firstname;

        $userStatus = array( 'status'=>'updationSuccessful', 'firstname'=>$_SESSION['firstname'] );

        $myJSON = json_encode( $userStatus );
        echo $myJSON;
        exit();

    } else {
        // echo $cardTitle.' '.$cardTask.' '.$dateStarted.' '.$taskStatus.' '.$assignedBy;
        $userStatus = array( 'status'=>'failed' );
        echo json_encode( $userStatus );
        exit();
    }
}
echo json_encode( $errors );
closeConn( $conn );

?>