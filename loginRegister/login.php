<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = mysqli_real_escape_string( $conn, $_POST['username'] );
$password = mysqli_real_escape_string( $conn, $_POST['password'] );
$psswd = '';
$query = "SELECT * FROM `user` WHERE username = '".$username."'";
$result = mysqli_query( $conn, $query );
if ( mysqli_num_rows( $result )>0 ) {
    while( $row = mysqli_fetch_assoc( $result ) ) {
        $verifypass = password_verify( $password, $row['password'] );
        // echo $verifypass;

        if ( $verifypass ) {
            // echo 'reached';

            $_SESSION['username'] = $row['username'];
            $_SESSION['firstname'] = $row['firstname'];
            $_SESSION['lastname'] = $row['lastname'];
            echo 'ValidCredentials';
            closeConn( $conn );
            exit();
        } else {

            echo 'InvalidPassword';
            closeConn( $conn );
            exit();
            // echo '<script>alert("Invalid Password")</script>';

        }
    }
} else {
    // echo '<script>alert("Invalid Username")</script>';
    echo 'InvalidUsername';
    closeConn( $conn );
    exit();

    //header( 'Location: index.php' );
}

?>