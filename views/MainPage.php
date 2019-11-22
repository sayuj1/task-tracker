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
    <!--Import Semantic-UI Loader -->
    <link rel="stylesheet" href="../assets/css/loader.min.css">
    <link rel="stylesheet" href="../assets/css/placeholder.min.css">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Import Customize CSS -->
    <link rel='stylesheet' href='../assets/css/MainPage.css'>
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="../assets/css/materialize.min.css" media="screen,projection" />
    <!--Import Semantic-UI Icon Font-->
    <link rel="stylesheet" href="../assets/css/icon.min.css">

    <!-- critical css -->
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
        height: 50px;
        color: white;
        font-size: 2rem;
    }

    #task-loading {
        padding: 30px;
    }
    </style>
</head>

<body>
    <!-- preloader image -->
    <div id="loader">
        <img src="../assets/imgs/preloader1.gif" id="preloader" alt="your browser does not support gifs!">
    </div>

    <div class="main-container" style="display: none;">

        <!-- top bar -->
        <div class='top-bar'>
            <div class="valign-wrapper">
                <div class="left-align" style="width:50%;margin-left: 5px;">Task-Tracker</div>
                <div class="right-align" style="width:50%;margin-right: 5px;">

                    <!-- Dropdown Trigger -->
                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Howdy,
                        <?php echo $_SESSION['username'] ?>
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <!-- Dropdown Structure -->
                    <ul id='dropdown1' class='dropdown-content'>
                        <li><a id="view-profile-btn"><i class="material-icons left">person</i>View Profile</a>
                        </li>
                        <li><a id="view-detail-btn"><i class="material-icons left">dashboard</i>Task Details</a></li>
                        <li class="divider" tabindex="-1"></li>
                        <li><a href="../logout/logout.php"><i class="material-icons left">account_circle</i>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="middle-container">

            <!-- Showing the confirmation of card creation -->
            <div id="modal3" class="modal">
                <div class="modal-content center-align">
                    <h4>Task Created Successfully!</h4>
                </div>

                <div class="modal-footer" style="text-align: center">
                    <button type="button" class="modal-close waves-effect waves-teal btn blue darken-1 ok">OK</button>
                </div>
            </div>

            <!-- Showing the confirmation of card deletion -->
            <div id="modal4" class="modal">
                <div class="modal-content center-align">
                    <h4>Task Deleted Successfully!</h4>
                </div>

                <div class="modal-footer" style="text-align: center">
                    <button type="button" class="modal-close waves-effect waves-teal btn blue darken-1">OK</button>
                </div>
            </div>

            <!-- Showing the updation message for the card -->
            <div id="modal6" class="modal">
                <div class="modal-content center-align">
                    <h4>Task Updated Successfully!</h4>
                </div>

                <div class="modal-footer" style="text-align: center">
                    <button type="button"
                        class="modal-close waves-effect waves-teal btn blue darken-1 editOk">OK</button>
                </div>
            </div>

            <!-- showing the edit modal card -->
            <!-- Modal Structure -->
            <div id="modal5" class="modal" style="overflow-x: unset;">
                <div class="row">
                    <div class="modal-content edit-modal-container">
                        <form method="POST" class="col m10 push-m1 edit-form">
                            <input type='hidden' id="card-id" name="card-id">
                            <div class="row left-align">
                                <div class="col s6 m4">
                                    <label for="card-title-edit" class="label">
                                        Task-Title:
                                    </label>
                                </div>
                                <div class="col s6 m6 push-m2">
                                    <input type="text" name="title" id="card-title-edit" data-length="50"
                                        placeholder="Task Title" maxlength="50" autofocus required>
                                </div>
                            </div>
                            <div class="row left-align">
                                <div class="col s6 m4">
                                    <label for="card-body" class="label">
                                        Task-Details:
                                    </label>
                                </div>
                                <div class="col s6 m6 push-m2 flow-text">
                                    <textarea name="tasks" id="card-body" placeholder="Your Tasks goes here...."
                                        style="max-width:100%;height:200px;resize:none;padding: 14px"
                                        required></textarea>
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
                                    <input type="text" name="assignedby" id="card-assigned" placeholder="Assigned By"
                                        required>
                                </div>
                            </div>
                    </div>

                    <div class="modal-footer col" style="text-align: center">
                        <button type="submit" name="editCard" class="btn btn-large blue darken-1">Edit</button>
                        <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
                    </div>
                    </form>
                </div>
            </div>


            <!-- For medium and large devices  -->
            <div class="container hide-on-small-only create-filter">
                <div class="row">
                    <div class="col m5">
                        <!-- Modal Trigger -->
                        <a class="waves-effect waves-light btn btn-large modal-trigger" href="#modal1"><i
                                class="material-icons right">add_circle</i>Create a Card</a>

                        <!-- Modal Structure -->
                        <div class="modal-container-large">
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
                                                <div class="col s6 m6 push-m2 flow-text">
                                                    <textarea name="tasks" id="card-body"
                                                        placeholder="Your Tasks goes here...."
                                                        style="max-width:100%;height:200px;resize:none;padding: 14px"
                                                        required></textarea>
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
                                                        placeholder="Assigned By" required>
                                                </div>
                                            </div>
                                    </div>

                                    <div class="modal-footer col m6 push-m2 center-align">
                                        <button type="submit" name="createCard"
                                            class="btn btn-large blue darken-1">Create
                                            Card</button>
                                        <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="col m5 push-m2 right-align">

                        <!-- Dropdown Trigger -->
                        <a class='dropdown-trigger waves-effect waves-light btn btn-large' href='#'
                            data-target='dropdown2'>
                            <i class="material-icons right">filter_list</i>Filter
                        </a>

                        <!-- Dropdown Structure -->
                        <ul id='dropdown2' class='dropdown-content'>
                            <li><a class="all-tasks-btn"><i class="material-icons">
                                        assignment
                                    </i>All Tasks</a>
                            </li>
                            <!-- <li><a id="view-profile-btn"><i class="material-icons left">person</i>Today Tasks</a>
                        </li>
                        <li><a id="view-detail-btn"><i class="material-icons left">dashboard</i>Yesterday Tasks</a></li> -->
                            <li class="divider" tabindex="-1"></li>
                            <li><a class="latest-tasks"><i class="sort amount down icon"></i>Latest Tasks</a>
                            </li>
                            <li><a class="oldest-tasks"><i class="vertically flipped sort amount up icon"></i>Oldest
                                    Tasks</a>
                            </li>
                            <li><a class="ongoing-tasks-btn"><i class="large play circle icon"></i>Ongoing Tasks</a>
                            </li>
                            <li><a class="pause-tasks-btn"><i class="large pause icon"></i>Pause Tasks</a>
                            </li>
                            <li><a class="delayed-tasks-btn"><i class="large ban icon"></i>Delayed Tasks</a>
                            </li>
                            <li><a class="stopped-tasks-btn"><i class="large stop icon"></i>Stopped Tasks</a>
                            </li>
                            <li><a class="completed-tasks-btn"><i class="large check circle icon"></i>Completed
                                    Tasks</a>
                            </li>
                            <li><a class="notstartedyet-tasks-btn"><i class="large close icon"></i>Not Started Yet
                                    Tasks</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <!-- for small devices  -->
            <div class="container hide-on-med-and-up create-filter">
                <div class="row">
                    <div class="col s12 center-align">
                        <!-- Modal Trigger -->
                        <a class="waves-effect waves-light btn modal-trigger" href="#modal2"><i
                                class="material-icons right">add_circle</i>Create a Card</a>

                        <div class="modal-container-small">
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
                                                        placeholder="Task Title" autofocus required>
                                                </div>
                                            </div>
                                            <div class="row left-align">
                                                <div class="col s12">
                                                    <label for="card-body" class="label">
                                                        Task-Details:
                                                    </label>
                                                </div>
                                                <div class="col s12 flow-text">
                                                    <textarea name="tasks" id="card-body"
                                                        placeholder="Your Tasks goes here...."
                                                        style="max-width:100%;height:200px;resize:none;padding: 14px;"
                                                        required></textarea>
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
                                                        placeholder="Assigned By" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer" style="text-align: center">
                                            <button type="submit" name="createCard"
                                                class="btn btn-large blue darken-1">Create
                                                Card</button>
                                            <!-- <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a> -->
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!-- add a task bar goes here -->
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 center-align">

                        <!-- Dropdown Trigger -->
                        <a class='dropdown-trigger waves-effect waves-light btn filter-tasks' href='#'
                            data-target='dropdown3'>
                            <i class="material-icons right">filter_list</i>Filter
                        </a>

                        <!-- Dropdown Structure -->
                        <ul id='dropdown3' class='dropdown-content'>
                            <li><a class="all-tasks-btn"><i class="material-icons left">person</i>All Tasks</a>
                            </li>
                            <!-- <li><a id="view-profile-btn"><i class="material-icons left">person</i>Today Tasks</a>
                        </li>
                        <li><a id="view-detail-btn"><i class="material-icons left">dashboard</i>Yesterday Tasks</a></li> -->
                            <li class="divider" tabindex="-1"></li>
                            <li><a class="latest-tasks"><i class="material-icons left">account_circle</i>Latest
                                    Tasks</a>
                            </li>
                            <li><a class="oldest-tasks"><i class="material-icons left">account_circle</i>Oldest
                                    Tasks</a>
                            </li>
                            <li><a class="ongoing-tasks-btn"><i class="material-icons left">person</i>Ongoing Tasks</a>
                            </li>
                            <li><a class="pause-tasks-btn"><i class="material-icons left">person</i>Pause Tasks</a>
                            </li>
                            <li><a class="delayed-tasks-btn"><i class="material-icons left">person</i>Delayed Tasks</a>
                            </li>
                            <li><a class="stopped-tasks-btn"><i class="material-icons left">person</i>Stopped Tasks</a>
                            </li>
                            <li><a class="completed-tasks-btn"><i class="material-icons left">person</i>Completed
                                    Tasks</a>
                            </li>
                            <li><a class="notstartedyet-tasks-btn"><i class="material-icons left">person</i>Not Started
                                    Yet
                                    Tasks</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Main Task container -->
            <div class="container task-container">

                <!-- for showing while loading the tasks -->
                <div id="task-loading">

                </div>

                <!-- contain all tasks -->
                <div class="card-tasks" style="display: none;">
                    <span class="total-cards">Total Cards: <span class="total-card-value-holder"></span></span>
                    <div id="filter-operation" style="text-align: center;font-size: 2rem;"> <!-- Filter Selected -->
                    All Tasks
                    </div>
                    <div class="row" id="no-card-found" style="text-align: center;"></div>
                    <div class="row" id="all-cards">
                        <!-- below cards will be displayed -->
                    </div>

                </div>

                <!-- contains tasks latest and oldest -->
                <div class="filter-card-tasks" style="display: none;">
                <span class="total-cards">Total Cards: <span class="total-card-value-holder"></span></span>
                <div id="filter-title" style="text-align: center;font-size: 2rem;"> <!-- Filter Selected -->
                    
                    </div>
                    <div id="filter-task-status-title" style="text-align: center;font-size: 2rem;"> <!-- Filter Selected -->
                    All Tasks
                    </div>
                    <div class="row" id="no-filter-card-found" style="text-align: center;"></div>
                    <div class="row" id="filter-cards">
                        <!-- below cards will be displayed -->
                    </div>
                </div>
            </div>

        </div>

        <!-- view profile & view details loaded here -->
        <div class="view-profile-container container">
            <div class="row">
                <div class="col s12 m9">
                    <div class="view-profile-loader" style="display: none;">

                    </div>
                </div>
            </div>
            <div class="container view-profile" style="display: none;">

                <!-- User Profile & settings Loaded Here -->
            </div>
        </div>

    </div>
</body>

<!-- Required JS files -->

<script src="../assets/js/jquery3.3.1.min.js"></script>
<script src='../assets/js/jquery.min.js'></script>

<!-- for creating graph -->
<script async src="https://www.gstatic.com/charts/loader.js"></script>

<!-- for functionality of the app -->
<script defer src='../assets/js/showData.js'></script>
<script defer src="../assets/js/submitData.js"></script>
<script defer src="../assets/js/editDelete.js"></script>
<script defer src="../assets/js/viewProfile.js"></script>
<script defer src="../assets/js/viewDetails.js"></script>
<script defer src="../assets/js/filterCard.js"></script>
<script type="text/javascript" src="../assets/js/materialize.min.js"></script>

<!-- This script is for preloading the page -->
<script>
    // makes sure the whole site is loaded 
    $(window).on('load', function() { 
     $('#loader').fadeOut('slow');;
     $('.main-container').fadeIn(1000);
});

$(document).ready(function() {
    // loading the content of the page
    function pageLoaded() {
       
        // initializing dropdown
        $('.dropdown-trigger').dropdown();

        // setting up the dropdown menu
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
            hover: false,
            inDuration: 300,
            outDuration: 225,
            
        });

        // initializing modal 
        $('.modal').modal();

        // attaching character counter on title
        $('#card-title').characterCounter();
        $('#card-title-sm').characterCounter();

    }
    // calling the page load function
    pageLoaded();

    // loading user tasks
    loadUserData();

    // for loading the user profile
    $('#view-profile-btn').on('click', function() {

        // removing the resize event
        $(window).off("resize");

        // alert('clicked');
        $('.create-filter').hide();
        $('.task-container').hide();

        // cleaning old data
        $('.view-profile').html('');
        // loading user profile
        $('.view-profile').show();

        loadProfile();

    });

    // for loading the task details
    $("#view-detail-btn").on('click', function() {

        $('.create-filter').hide();
        $('.task-container').hide();

        //removing the previous data 
        $('.view-profile').html("");
        $(".view-profile-loader").html("");

        //loading the task details
        $('.view-profile').show();
        loadDetails();
    });

    

});
</script>

</html>

<?php

//closing database connection
closeConn( $conn );

?>