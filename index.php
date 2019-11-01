<?php
session_start();
include_once './dbconfig/dbconfig.php';

// opening database connection
$con = openConn();

// echo 'Connected Successfully';

?>

<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Login Page</title>
    <link rel='stylesheet' href='./assets/css/bootstrap.min.css'>
    <link rel='stylesheet' href='./assets/css/index.css'>
      
</head>

<body>

    <img src="./assets/imgs/preloader.gif" id="preloader" alt="your browser does not support gifs!" width="100%"
        height="auto" style="display: block; margin: 0 auto;">
    </div>
    <div class="main-container" style="display: none;">


        <div class='top-bar row justify-content-md-center'>

            <div class="col align-self-center">
                Task Tracker
            </div>

        </div>
        <div class='container'>
            <div class="row justify-content-md-center" style="width: 100%;">
                <div class="login-box col-sm-12 col-md-8 shadow-sm p-3 mb-5 rounded">
                    <!-- dynamically loading the login/register page -->

                </div>
            </div>
        </div>
    </div>
</body>

<!-- Required JS files -->
<script src="./assets/js/jquery3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
    integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous">
</script>
<script src='./assets/js/bootstrap.min.js'></script>
<script src='./assets/js/jquery.min.js'></script>

<!-- This script is for preloading the page -->
<script>
$(document).ready(function() {

    $.ajax({
        async: true,
        type: "GET",
        url: "./views/login.php",
        dataType: 'html',
        before: function() {
            //show the loading image
        },
        complete: function() {
            //hide the loading image
        },
        success: function(data) {
            // console.log(data);

            $('.login-box').html(data);
            $.getScript("./assets/js/login.js");
            // console.log(document.querySelector('#new-account'));

        },
        error: function(err) {
            console.log(err);
        }
    });

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
closeConn( $con );

?>