<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

//database work goes here
$firstname = mysqli_real_escape_string( $conn, $_POST['firstname'] );
$lastname = mysqli_real_escape_string( $conn, $_POST['lastname'] );
$username = mysqli_real_escape_string( $conn, $_POST['username'] );
$password = mysqli_real_escape_string( $conn, $_POST['password'] );

// print_r($_FILES);

// for uploading images
$img_name = $_FILES['imglink']['name'];
$img_size = $_FILES['imglink']['size'];
$img_tmp = $_FILES['imglink']['tmp_name'];
                
$errors = array();

$path = '';

if ( $img_size>5097152 )  //this size in bytes which is equivalent to 2MB
 {
    // echo '<script type="text/javascript"> alert("Image file size larger than 2 MB.. Try another image") </script>';
    array_push( $errors, "ImgSize" ); //Image Size can't be greater than 5MB
} else if ( $_FILES['imglink']['name'] != '' ) {
    $fileName = $_FILES['imglink']['name'];
    $tmp = explode( '.', $fileName );
    $extension = end( $tmp );
    $allowed_type = array( 'jpg', 'jpeg', 'png' );
    if ( in_array( $extension, $allowed_type ) ) {
        $new_name = rand().'.'.$extension;
        $path = $_SERVER['DOCUMENT_ROOT']."/tasktracker/uploads/".$new_name;
    } else {
        array_push( $errors, 'InvalidImg' );
    }
} else {
    $path = $_SERVER['DOCUMENT_ROOT'].'/tasktracker/uploads/male1.png';
}

if ( empty( $firstname ) || empty( $lastname ) || empty( $username ) || empty( $password ) ) {
    // echo 'emptyFields';
    array_push( $errors, 'emptyFields' );
    // echo '<script>window.location.href="register.php"</script>';
    // exit();
}

// else {
if ( !preg_match( "/^[a-zA-Z ]*$/", $firstname ) || !preg_match( "/^[a-zA-Z ]*$/", $lastname ) ) {
    // echo 'nameIncorrect';
    array_push( $errors, 'nameIncorrect' );
    // exit();
}

$q1 = "SELECT username FROM `user` WHERE username = '".$username."'";
$r1 = mysqli_query( $conn, $q1 );
if ( mysqli_num_rows( $r1 )>0 ) {
    // echo 'userExists';
    array_push( $errors, 'userExists' );
    // exit();
}

// else {
if ( strlen( $password )<8 ) {
    // echo 'passwordLessThan8';
    array_push( $errors, 'passwordLessThan8' );
    // exit();
}

// else {
$error_size = sizeof( $errors );
if ( $error_size == 0 ) {

    move_uploaded_file( $_FILES["imglink"]["tmp_name"], $path );

    $final_status = array();
    $date1 = date( 'Y-m-d H:i:s' );
    $hash_pswd = password_hash( $password, PASSWORD_DEFAULT );

    $q2 = "INSERT INTO `user` (`id`,`username`,`password`,`firstname`,`lastname`,`date`,`profileImg`) VALUES('','".$username."','".$hash_pswd."','".$firstname."','".$lastname."', '".$date1."', '".$path."')";
    if ( mysqli_query( $conn, $q2 ) ) {
        array_push( $final_status, 'successful' );
        echo json_encode( $final_status );
    } else {
        // user does not get registered
        array_push( $final_status, 'tryAgain' );
        echo json_encode( $final_status );
    }
} else {
    echo json_encode( $errors );
}
// }
// }

// return all the details, errors found
// }
closeConn( $conn );
?>