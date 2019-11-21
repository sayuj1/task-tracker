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
    <!-- <link rel = 'stylesheet' href = '../assets/css/'> -->
    <!--Import materialize.css-->
    <link type='text/css' rel='stylesheet' href='../assets/css/materialize.min.css' media='screen,projection' />

    <style>
    .todo-setting-trigger {
        cursor: pointer;
    }

    .edit-todo:hover {
        background-color: red;
    }

    [id*="todo-setting"]{
        width: 178px !important;
    }
    
    .setting-spin {
        -webkit-animation-name: spin;
        -webkit-animation-duration: 300ms;
        -webkit-animation-iteration-count: finite;
        -webkit-animation-timing-function: linear;
        -moz-animation-name: spin;
        -moz-animation-duration: 300ms;
        -moz-animation-iteration-count: finite;
        -moz-animation-timing-function: linear;
        -ms-animation-name: spin;
        -ms-animation-duration: 300ms;
        -ms-animation-iteration-count: finite;
        -ms-animation-timing-function: linear;

        animation-name: spin;
        animation-duration: 300ms;
        animation-iteration-count: finite;
        animation-timing-function: linear;
    }

    @-ms-keyframes spin {
        from {
            -ms-transform: rotate(0deg);
        }

        to {
            -ms-transform: rotate(360deg);
        }
    }

    @-moz-keyframes spin {
        from {
            -moz-transform: rotate(0deg);
        }

        to {
            -moz-transform: rotate(45deg);
        }
    }

    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(45deg);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(45deg);
        }
    }
    </style>
</head>

<body>
    <div class='container' style='margin-top: 20px;'>

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

<script type='text/javascript' src='../assets/js/materialize.min.js'></script>

<script>
$(document).ready(function() {

    loadTodoData();    

   
});
</script>

</html>

<?php

todoCloseConn( $conn );

?>