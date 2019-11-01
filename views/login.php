<?php

session_start();
include_once '../dbconfig/dbconfig.php';

$conn = openConn();

echo '

<form method="POST">
                        <div class="row justify-content-md-center">
                            <div class="form-group col-sm-12 col-md-8">
                                <label for="username">Username</label>
                                <input type="text" name="username" class="form-control" id="username"
                                    placeholder="Enter your username" required>
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="form-group col-sm-12 col-md-8">
                                <label for="password">Password</label>
                                <input type="password" name="password" id="password" class="form-control"
                                    placeholder="Enter your password" required>
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="form-group col-sm-12 col-md-8">
                                <button name="login" type="submit" class="btn btn-primary btn-lg btn-block" id="login-btn">Login</button>
                            </div>
                        </div>
                    </form>
                    <div class="row justify-content-md-center">
                        <div class="col-sm-12 col-md-8 new-user">
                            Are You New Here?
                        </div>
                        <div class="col-sm-12 col-md-8">
                            <button type="button" class="btn btn-secondary btn-lg btn-block" id="new-account">Create an account</button>
                        </div>
                    </div>
';

closeConn( $conn );
?>