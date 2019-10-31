<?php

include_once './dbconfig/dbconfig.php';

$con = openConn();

// echo 'Connected Successfully';

// closeConn( $con );

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
<img src="./assets/imgs/preloader.gif" id="preloader" alt="your browser does not support gifs!" width="100%" height="50%" style="margin: 0 auto">
<div class="main-container" style="display: none;">


    <div class='top-bar row justify-content-md-center'>

        <div class="col align-self-center">
            Task Tracker
        </div>

    </div>
    <div class='container'>
        <div class="row justify-content-md-center">
            <div class="login-box col-sm-12 col-md-8 shadow-sm p-3 mb-5 rounded">
                <form action="" method="POST">
                    <div class="row justify-content-md-center">
                        <div class="form-group col-sm-12 col-md-8">
                            <label for="username">Username</label>
                            <input type="text" name="username" class="form-control" id="username"
                                placeholder="Enter your username">
                        </div>
                    </div>
                    <div class="row justify-content-md-center">
                        <div class="form-group col-sm-12 col-md-8">
                            <label for="password">Password</label>
                            <input type="text" name="password" id="password" class="form-control"
                                placeholder="Enter your password">
                        </div>
                    </div>
                    <div class="row justify-content-md-center">
                        <div class="form-group col-sm-12 col-md-8">
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
                        </div>
                    </div>
                </form>
                <div class="row justify-content-md-center">
                    <div class="col-sm-12 col-md-8 new-user">
                        Are You New Here?
                    </div>
                    <div class="col-sm-12 col-md-8">
                        <button type="button" class="btn btn-secondary btn-lg btn-block">Create an account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</body>

<!-- Javascript -->

<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js'
    integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'>
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'
    integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'>
</script>
<script src='./assets/js/bootstrap.min.js'></script>

<script>
$(document).ready(function() {
    function pageLoaded(){
        $('#preloader').hide();
        
        let showPage = document.querySelector(".main-container");
        showPage.style.display="block";

    }

    pageLoaded();

});
</script>

</html>