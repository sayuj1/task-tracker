<?php
include_once '../dbconfig/todoDBconfig.php';
session_start();

// opening database connection
$conn = todoOpenConn();

?>

<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>TodoApp</title>
    <!--Import Google Icon Font-->
    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
    <!-- Import Customize CSS -->
    <link rel="stylesheet" href="../assets/css/todoapp.css">
    <!--Import materialize.css-->
    <link type='text/css' rel='stylesheet' href='../assets/css/materialize.min.css' media='screen,projection' />
    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .top-bar {
        background-color: #1a1a1d;
        height: 50px;
        color: white;
        font-size: 2rem;
    }
    .todo-setting-btn{
        cursor: pointer;
    }
    </style>
</head>

<body>

    <!-- top bar -->
    <div class='top-bar'>
        <div class="valign-wrapper">
            <div class="left-align" style="width:50%;margin-left: 5px;">My-Todo</div>
            <div class="right-align" style="width:50%;margin-right: 5px;">

                <!-- Dropdown Trigger -->
                <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Howdy,
                    <?php echo $_SESSION['username'] ?>
                    <i class="material-icons right">arrow_drop_down</i>
                </a>

                <!-- Dropdown Structure -->
                <ul id='dropdown1' class='dropdown-content'>
                    <li><a id="task-tracker-btn"><i class="material-icons left">person</i>Task-Tracker</a>
                    </li>
                    <li class="divider" tabindex="-1"></li>
                    <li><a href="../../logout/logout.php"><i class="material-icons left">account_circle</i>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class='container' style='margin-top: 20px;'>

        <!-- Showing the confirmation of todo creation -->
        <div id="createTodoModal" class="modal">
            <div class="modal-content center-align">
                <h4>Todo Created Successfully!</h4>
            </div>

            <div class="modal-footer" style="text-align: center">
                <button type="button" class="modal-close waves-effect waves-teal btn blue darken-1">OK</button>
            </div>
        </div>

        <!-- Showing the confirmation of todo deletion -->
        <div id="deleteTodoModal" class="modal">
            <div class="modal-content center-align">
                <h4>Todo Deleted Successfully!</h4>
            </div>

            <div class="modal-footer" style="text-align: center">
                <button type="button" class="modal-close waves-effect waves-teal btn blue darken-1">OK</button>
            </div>
        </div>

        <div class='row'>
            <form method='post' class="todo-form">
                <div class='col s10 m8 flow-text'>
                    <textarea name='todoBox' id='todo-box' cols='30' rows='30' placeholder='Add A Quick TODO...'
                        style='max-width:100%;height:100px;resize:none;padding: 14px'></textarea>

                </div>
                <div class='col s2 m4' style='margin-top: 20px;'>
                    <a class='btn-floating btn-large waves-effect waves-light purple' id="todo-btn"><i
                            class='material-icons'>add</i></a>
                </div>
            </form>
        </div>

        <div class='row display-todo'>

        </div> <!-- row -->


    </div> <!-- container -->
</body>

<!-- Required JS files -->
<script src='../assets/js/jquery3.3.1.min.js'></script>
<script src='../assets/js/jquery.min.js'></script>

<!-- for functionality of the app -->
<script src="../assets/js/submitTodo.js"></script>
<script src="../assets/js/showTodo.js"></script>
<script src="../assets/js/editTodo.js"></script>
<script src="../assets/js/deleteTodo.js"></script>
<script src="../assets/js/statusUpdateTodo.js"></script>
<script type='text/javascript' src='../assets/js/materialize.min.js'></script>

<script>
$(document).ready(function() {
    // initializing dropdown
    $('.dropdown-trigger').dropdown();
    //loading todos
    loadTodoData();

    // initializing modal 
    $('.modal').modal();

    $('#task-tracker-btn').on('click', function(){
        window.location.href = "../../views/mainPage.php";
    });


});
</script>

</html>

<?php

todoCloseConn( $conn );

?>