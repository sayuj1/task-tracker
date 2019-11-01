<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

//database work goes here
$firstname = mysqli_real_escape_string( $conn, $_POST['firstname'] );
$lastname = mysqli_real_escape_string( $conn, $_POST['lastname'] );
$username = mysqli_real_escape_string( $conn, $_POST['username'] );
$password = mysqli_real_escape_string( $conn, $_POST['password'] );

if ( empty( $firstname ) || empty( $lastname ) || empty( $username ) || empty( $password ) ) {
    echo 'emptyFields';
    // echo '<script>window.location.href="register.php"</script>';
    exit();
} else {
    if ( !preg_match( "/^[a-zA-Z ]*$/", $firstname ) || !preg_match( "/^[a-zA-Z ]*$/", $lastname ) ) {
        echo 'nameIncorrect';
        exit();
    } else {
        if ( strlen( $password )<8 ) {
            echo 'passwordLessThan8';
            exit();
        } else {
            $q1 = "SELECT username FROM `user` WHERE username = '".$username."'";
            $r1 = mysqli_query( $conn, $q1 );
            if ( mysqli_num_rows( $r1 )>0 ) {
                echo 'userExists';
                exit();
            } else {
                $date1 = date( 'Y-m-d H:i:s' );
                $hash_pswd = password_hash( $password, PASSWORD_DEFAULT );
                $q2 = "INSERT INTO `user` (`id`,`username`,`password`,`firstname`,`lastname`,`date`) VALUES('','".$username."','".$hash_pswd."','".$firstname."','".$lastname."', '".$date1."')";
                if ( mysqli_query( $conn, $q2 ) ) {
                    echo 'successful';
                } else {
                    // user does not get registered
                    echo 'tryAgain';
                }
            }
        }
    }

    // return all the details, errors found
}
closeConn( $conn );
?>