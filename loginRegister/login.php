<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = mysqli_real_escape_string( $conn, $_POST['username'] );
$password = mysqli_real_escape_string( $conn, $_POST['password'] );

$query = "SELECT * FROM `user` WHERE username = '".$username."'";
$result = mysqli_query( $conn, $query );
if ( mysqli_num_rows( $result )>0 ) {
    while( $row = mysqli_fetch_assoc( $result ) )
 {
        $verifypass = password_verify( $password, $row['password'] );
        echo $verifypass;
    }

    if ( $verifypass )
 {
        // echo 'reached';
        echo 'ValidCredentials';
        $_SESSION['username'] = $row['username'];
        $_SESSION['firstnam'] = $row['firstname'];
        $_SESSION['lastname'] = $row['lastname'];
        // $q1 = "SELECT * FROM `user` WHERE username = '".$username."'";
        // $r1 = mysqli_query( $conn, $q1 );
        // while( $row1 = mysqli_fetch_assoc( $r1 ) ) {
        // $_SESSION['username'] = $row1['username'];
        //     header( 'Location: homepage.php' );

        // }
    } else {
        echo 'InvalidPassword';
        // echo '<script>alert("Invalid Password")</script>';

    }

} else {
    // echo '<script>alert("Invalid Username")</script>';
    echo 'InvalidUsername';

    //header( 'Location: index.php' );
}

// echo $username.$password;

closeConn( $conn );

?>