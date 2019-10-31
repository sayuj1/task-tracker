<?php

include_once './dbconfig/dbconfig.php';

$con = openConn();

echo 'Connected Successfully';

closeConn( $con );

?>