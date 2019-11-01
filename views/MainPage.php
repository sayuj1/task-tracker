<?php
session_start();
include_once '../dbconfig/dbconfig.php';

// opening database connection
$conn = openConn();

// echo 'Connected Successfully';

?>

<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>
        <?php 
     echo $_SESSION['firstname'];
    ?>
    </title>
    <link rel='stylesheet' href='../assets/css/bootstrap.min.css'>
    <link rel='stylesheet' href='../assets/css/MainPage.css'>
</head>

<body>
    <div class='top-bar row justify-content-md-center'>
        <div class="col align-self-center">
            <span style="float: left;padding-left: 2%;">Task Tracker</span>
            <span style="float: right;padding-right: 2%;">Howdy, <?php echo $_SESSION['username'] ?></span>
        </div>
    </div>
    <img src="../assets/imgs/table-task-loader.gif" id="preloader" alt="your browser does not support gifs!"
        width="100%" height="50%" style="margin: 0 auto">
    <div class="main-container" style="display: none;">
        <div class="row justify-content-sm-center">
            <div class="col-sm-12 col-md-8">
                <h1>hello there</h1>
                <!-- add a task bar goes here -->
            </div>
        </div>


        <div class="row justify-content-md-center">
            <div id="task-loading" class="col-sm-12 col-md-8">

            </div>
            <div class="table-tasks col-sm-12 col-md-8"
                style="display: none;width:100%;height:100%;border: 2px solid yellow;">
                <!-- below task will be displayed -->
                hello
            </div>
        </div>

    </div>

</body>

<!-- Required JS files -->

<script src="../assets/js/jquery3.3.1.min.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'
    integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'>
</script>
<script src='../assets/js/bootstrap.min.js'></script>
<script src='../assets/js/jquery.min.js'></script>
<script src='../assets/js/showData.js'></script>

<!-- This script is for preloading the page -->
<script>
$(document).ready(function() {
    loadUserData();

    function pageLoaded() {
        $('#preloader').hide();
        let showPage = document.querySelector(".main-container");
        showPage.style.display = "block";
    }
    pageLoaded();

});
</script>

</html>

<?php

//closing database connection
closeConn( $conn );

?>