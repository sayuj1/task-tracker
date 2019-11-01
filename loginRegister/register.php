<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

//database work goes here

closeConn( $conn );
?>