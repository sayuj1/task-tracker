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
    <link rel='stylesheet' href='../assets/css/MainPage.css'>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="../assets/css/materialize.min.css" media="screen,projection" />

</head>

<body>
    <div class='top-bar'>
        <div class="valign-wrapper">
            <div class="left-align" style="width:50%;">Task Tracker</div>
            <div class="right-align" style="width:50%;">Howdy, <?php echo $_SESSION['username'] ?></div>
        </div>
    </div>
    <img src="../assets/imgs/table-task-loader.gif" id="preloader" alt="your browser does not support gifs!"
        width="100%" height="50%" style="margin: 0 auto">
    <div class="main-container" style="display: none;">

        <!-- For confirming the card submission -->
        <div id="modal3" class="modal">
            <div class="modal-content center-align">
                <h4>Card Created Successfully!</h4>
            </div>

            <div class="modal-footer" style="text-align: center">
                <button type="button" class="modal-close waves-effect waves-teal btn blue darken-1 ok">OK</button>
            </div>
        </div>

        <!-- For medium and large devices  -->
        <div class="container hide-on-small-only">
            <div class="row">
                <div class="col m5">
                    <!-- Modal Trigger -->
                    <a class="waves-effect waves-light btn btn-large modal-trigger" href="#modal1"><i
                            class="material-icons right">add_circle</i>Create a Card</a>

                    <!-- Modal Structure -->
                    <div id="modal1" class="modal" style="overflow-x: unset;">
                        <div class="row">
                            <div class="modal-content">
                                <form method="POST" class="col m10 push-m1 large-device">
                                    <div class="row left-align">
                                        <div class="col s6 m4">
                                            <label for="card-title" class="label">
                                                Task-Title:
                                            </label>
                                        </div>
                                        <div class="col s6 m6 push-m2">
                                            <input type="text" name="title" id="card-title" data-length="50"
                                                placeholder="Task Title" maxlength="50" autofocus required>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s6 m4">
                                            <label for="card-body" class="label">
                                                Task-Details:
                                            </label>
                                        </div>
                                        <div class="col s6 m6 push-m2">
                                            <textarea name="tasks" id="card-body" placeholder="Your Tasks goes here...."
                                                style="max-width:100%;height:200px;resize:none" required></textarea>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s6 m4">
                                            <label for="status" class="label">
                                                Task-Status:
                                            </label>
                                        </div>
                                        <div class="col s6 m6 push-m2">
                                            <select name="status" style="display: block;" id="status">
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Pause">Pause</option>
                                                <option value="Delayed">Delayed</option>
                                                <option value="Stopped">Stopped</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Not Started Yet">Not Started Yet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s6 m4">
                                            <label for="card-assigned" class="label">
                                                Assigned-By:
                                            </label>
                                        </div>
                                        <div class="col s6 m6 push-m2">
                                            <input type="text" name="assignedby" id="card-assigned"
                                                placeholder="Assigned By" autofocus required>
                                        </div>
                                    </div>
                            </div>

                            <div class="modal-footer col m6 push-m2 center-align">
                                <button type="submit" name="createCard" class="btn btn-large blue darken-1">Create
                                    Card</button>
                                <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
                            </div>
                            </form>
                        </div>
                    </div>
                    <!-- add a task bar goes here -->
                </div>
                <div class="col m5 push-m2 right-align">
                    <a class="waves-effect waves-light btn btn-large"><i
                            class="material-icons right">filter_list</i>Filter</a>
                </div>
            </div>
        </div>

        <!-- for small devices  -->
        <div class="container hide-on-med-and-up">
            <div class="row">
                <div class="col s12 center-align">
                    <!-- Modal Trigger -->
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal2"><i
                            class="material-icons right">add_circle</i>Create a Card</a>


                    <!-- Modal Structure -->
                    <div id="modal2" class="modal" style="overflow-x: unset;">
                        <div class="row">
                            <form method="POST" class="col s10 push-s1 small-device">
                                <div class="modal-content">
                                    <div class="row left-align">
                                        <div class="col s12">
                                            <label for="card-title-sm" class="label">
                                                Task-Title:
                                            </label>
                                        </div>
                                        <div class="col s12">
                                            <input type="text" name="title" id="card-title-sm" data-length="50"
                                                placeholder="Task Title" autofocus>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s12">
                                            <label for="card-body" class="label">
                                                Task-Details:
                                            </label>
                                        </div>
                                        <div class="col s12">
                                            <textarea name="tasks" id="card-body" placeholder="Your Tasks goes here...."
                                                style="max-width:100%;height:200px;resize:none"></textarea>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s12">
                                            <label for="status" class="label">
                                                Task-Status:
                                            </label>
                                        </div>
                                        <div class="col s12">
                                            <select name="status" style="display: block;" id="status">
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Pause">Pause</option>
                                                <option value="Delayed">Delayed</option>
                                                <option value="Stopped">Stopped</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Not Started Yet">Not Started Yet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row left-align">
                                        <div class="col s12">
                                            <label for="card-assigned" class="label">
                                                Assigned-By:
                                            </label>
                                        </div>
                                        <div class="col s12">
                                            <input type="text" name="assignedby" id="card-assigned"
                                                placeholder="Assigned By" autofocus>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer" style="text-align: center">
                                    <button type="submit" name="createCard" class="btn btn-large blue darken-1">Create
                                        Card</button>
                                    <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- add a task bar goes here -->
                </div>
            </div>
            <div class="row">
                <div class="col s12 center-align">
                    <a class="waves-effect waves-light btn"><i class="material-icons right">filter_list</i>Filter</a>
                </div>
            </div>
        </div>


        <div class="container">
            <div id="task-loading" class="">

            </div>
            <div class="card-tasks col-sm-12 col-md-8"
                style="display: none;width:100%;height:100%;border: 2px solid yellow;">
                <!-- below cards will be displayed -->
                hello
            </div>
        </div>

    </div>

</body>

<!-- Required JS files -->

<script src="../assets/js/jquery3.3.1.min.js"></script>
<script src='../assets/js/jquery.min.js'></script>
<script src='../assets/js/showData.js'></script>
<script src="../assets/js/submitData.js"></script>
<script type="text/javascript" src="../assets/js/materialize.min.js"></script>

<!-- This script is for preloading the page -->
<script>
$(document).ready(function() {
    loadUserData();

    function pageLoaded() {
        $('#preloader').hide();
        let showPage = document.querySelector(".main-container");
        showPage.style.display = "block";

        $('.modal').modal();
        $('#card-title').characterCounter();
        $('#card-title-sm').characterCounter();
    }
    pageLoaded();

});
</script>

</html>

<?php

//closing database connection
closeConn( $conn );

?>