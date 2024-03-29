<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

echo '
<form method="POST" enctype="multipart/form-data" action="./loginRegister/register.php" id="registerForm">
    <div class="row">
        <div class="form-group col-sm-12" style="text-align: center;">
            <img id="uploadPreview" src="./assets/imgs/login.png" class="login-img">
            <div class="row justify-content-md-center">
                <div class="col-sm-12 col-md-8">
                    <input type="file" id="imglink" name="imglink" accept=".jpg, .jpeg, .png" onchange="PreviewImage()" class="form-control" style="margin-top: 10px;font-size: small;">
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="form-group col-sm-12 col-md-8">
            <label for="firstname">Firstname</label>
            <input type="text" name="firstname" class="form-control" id="firstname" placeholder="Enter your firstname" required>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="form-group col-sm-12 col-md-8">
            <label for="lastname">Lastname</label>
            <input type="text" name="lastname" class="form-control" id="lastname" placeholder="Enter your lastname" required>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="form-group col-sm-12 col-md-8">
            <label for="username">Username</label>
            <input type="text" name="username" class="form-control" id="username" placeholder="Enter your username" required>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="form-group col-sm-12 col-md-8">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Enter your password" required>
        </div>
    </div>
    <div class="row justify-content-md-center">
        <div class="form-group col-sm-12 col-md-8">
            <button name="register" type="submit" class="btn btn-primary btn-lg btn-block" id="Register-btn">Register</button>
        </div>
    </div>
</form>
<div class="row justify-content-md-center">
    <div class="col-sm-12 col-md-8 new-user">
        Have An Account Already?
    </div>
    <div class="col-sm-12 col-md-8">
        <button type="button" class="btn btn-secondary btn-lg btn-block" id="old-account">Back To Login</button>
    </div>
</div>
';

closeConn( $conn );
?>