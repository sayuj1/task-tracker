<?php

session_start();
include_once '../dbconfig/todoDBconfig.php';

$conn = todoOpenConn();

$username = $_SESSION['username'];

$q = "SELECT * FROM `todotask` WHERE username = '".$username."' ORDER BY datecreated DESC";
$r = mysqli_query( $conn, $q );
if ( mysqli_num_rows( $r ) === 0 ) {
    echo 'zeroRow';

} else if ( mysqli_num_rows( $r ) > 0 ) {
    while( $row = mysqli_fetch_assoc( $r ) ) {
        $userInfo[] = $row;
    }

    echo json_encode( $userInfo );
} else {
    echo 'something wrong';
}

todoCloseConn( $conn );

// Note --> Don't know why for zero rows the result gets into error option in AJAX
?>