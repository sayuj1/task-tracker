<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

$username = $_SESSION['username'];
$q = "SELECT * FROM `cardtask` WHERE username = '".$username."' ORDER BY datestarted DESC LIMIT 1";
$r = mysqli_query( $conn, $q );
if ( mysqli_num_rows( $r )>0 ) {
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    echo json_encode( $userInfo );

} else {
    echo 'Something Wrong';
}

closeConn( $conn );

?>