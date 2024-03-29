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
    <!--Import Semantic-UI Loader -->
    <link rel="stylesheet" href="./assets/css/loader.min.css">
    <!--Import Bootstrap CSS-->
    <link rel='stylesheet' href='./assets/css/bootstrap.min.css'>
    <!-- /* critical css */ -->
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: whitesmoke;
    }

    #loader {
        position: fixed;
        width: 100%;
        height: 100vh;
        text-align: center;
        margin-top: 25%;
        z-index: 99999;
    }

    .top-bar {
        background-color: #1a1a1d;
        height: 8vh;
    }

    .top-bar>div {
        color: white;
        /* border: 2px solid yellow; */
        padding-left: 45%;
        font-size: 35px;
    }

    .login-box {
        /* border: 2px solid red; */
        background-color: #1f2833;
        min-height: 60vh;
        margin-top: 5%;
    }

    label {
        color: #66fcf1;
        font-weight: 700;
        font-size: 1.5rem;
    }

    .new-user {
        color: #66fcf1;
        font-weight: 700;
        font-size: 1.5rem;
    }
    .login-img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    @media screen and (max-width: 400px) {
        .login-box {
            min-height: 60vh;
            margin-top: 10%;
            margin-left: 5%;
        }

        label {
            font-weight: 500;
            font-size: 1rem;
        }

        .new-user {
            font-weight: 500;
            font-size: 1rem;
        }

        .top-bar>div {
            color: white;
            font-size: 35px;
            padding-left: 30%;
        }

        #user-error,
        #pass-error {
            font-size: 16px;
        }

        .login-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    }
    </style>

</head>

<body>
    <!-- preloader image -->
    <div id="loader">
        <img src="./assets/imgs/preloader1.gif" id="preloader" alt="your browser does not support gifs!">
    </div>

    <div class="main-container" style="display: none;">
        <div class='top-bar row justify-content-md-center'>

            <div class="col align-self-center">
                Task-Tracker
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


    <!-- Required JS files -->
    <script src="./assets/js/jquery3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous">
    </script>
    <script src='./assets/js/bootstrap.min.js'></script>
    <script src='./assets/js/jquery.min.js'></script>

    <!-- This script is for preloading the page -->
    <script>
    // makes sure the whole site is loaded 
    $(window).on('load', function() {
        $('#loader').fadeOut('slow');;
        $('.main-container').fadeIn(1000);
    });

    $(document).ready(function() {

        // loading login page
        $.ajax({
            async: true,
            type: "GET",
            url: "./views/login.php",
            dataType: 'html',
            beforeSend: function() {
                //show the loading image
                $('.login-box').html(
                    '<div class="ui active dimmer login-register-loader" ><div class = "ui huge text loader" > Loading</div></div>'
                );
            },
            complete: function() {
                //hide the loading image
                $('.login-register-loader').hide();
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

    });
    </script>
    <script type="text/javascript">
    function PreviewImage() {
        var freader = new FileReader();
        freader.readAsDataURL(document.getElementById("imglink").files[0]);
        freader.onload = function(frevent) {
            document.getElementById("uploadPreview").src = frevent.target.result;
        };
    };
    </script>
</body>

</html>

<?php

//closing database connection
closeConn( $con );

?>