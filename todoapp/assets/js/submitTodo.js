// function to prepend the latest card
function prependTheLatestTodo(container, data) {
    // For status color
    let statusArr = {
        Pending: "yellow-text ",
        Complete: "lime-text "
    };

    $("." + container + "").prepend(
        `<div class='col s12 m8' id=` +
        data[0]["todoId"] +
        `>
    <div class='card-panel flow-text'>
        <div class="row">
            <div class="left-align col s6 white-text flow-text">
            ` +
        data[0]["datecreated"].split("::")[0] +
        `
            </div>
            <div class='right-align col s6'>
                <!-- Dropdown Trigger -->
                <a class='todo-setting-btn todo-setting-trigger` +
        data[0]["todoId"] +
        `' data-target='todo-setting` +
        data[0]["todoId"] +
        `'>
                    <i class='material-icons white-text'>settings</i>
                </a>

                <!-- Dropdown Structure -->
                <ul id='todo-setting` +
        data[0]["todoId"] +
        `' class='dropdown-content'>
                    <li><a style="color: #2196f3;" id=` +
        data[0]["todoId"] +
        ` onclick=todoEdit(this.id)><i class='material-icons left blue-text'>mode_edit</i>Edit</a>
                    </li>
                    <li><a style="color: red;" id=` +
        data[0]["todoId"] +
        ` onclick=todoDelete(this.id)><i class='material-icons left red-text'>delete</i>Delete</a>
                    </li>
                    <li><a style="color: green;" id=` +
        data[0]["todoId"] +
        ` onclick=todoComplete(this.id)><i class='material-icons left green-text'>check</i>Completed</a>
                    </li>
                    <li><a style="color: #ff9800;" id=` +
        data[0]["todoId"] +
        ` onclick=todoPending(this.id)><i class='material-icons left orange-text'>close</i>Pending</a>
                    </li>
                </ul>

            </div>
        </div>
        <div class = "white-text card-content"
        style = "text-align: justify;">
        ` +
        data[0]["todo"] +
        ` </div> 
            <br>
        <div class = "divider" > </div> <div class = "` +
        statusArr[data[0]["status"]] +
        `right-align todoStatus" style="margin-top: 10px;font-weight: 700;">
                Status: ` +
        data[0]["status"] +
        `
                </div>
    </div>
</div>`
    );
    $(".todo-setting-trigger" + data[0]["todoId"] + "").on("click", function() {
        $(".todo-setting-trigger" + data[0]["todoId"] + " > i").addClass(
            "setting-spin"
        );
        setTimeout(() => {
            $(".todo-setting-trigger" + data[0]["todoId"] + " > i").removeClass(
                "setting-spin"
            );
        }, 500);
    });
}

function loadTheLatestTodo(loadLocation) {
    $.ajax({
        type: "get",
        url: loadLocation,
        dataType: "json",
        beforeSend: function() {
            $('.todo-loader').show();
        },
        complete: function() {
            $('.todo-loader').hide();
        },
        success: function(data) {
            // console.log(data[0]);
            $(".no-todo-found").empty();

            prependTheLatestTodo("display-todo", data);

            // showing creation message
            let createModal = document.querySelector("#createTodoModal");
            let createInstance = M.Modal.getInstance(createModal);

            createInstance.open();
            // initializing dropdown
            $(".todo-setting-trigger").dropdown();

            // setting up the dropdown menu
            let todoSettingTrigger = document.querySelectorAll(".todo-setting-btn");
            let todoSettingInstance = M.Dropdown.init(todoSettingTrigger, {
                inDuration: 700,
                outDuration: 225
            });
        },
        error: function(err) {
            // console.log(err);
            alert("something not right");
        }
    });
}

$("#todo-btn").on("click", function() {
    let todo = $("#todo-box").val();
    // console.log(todo);
    if (todo) {
        //send the data
        $.ajax({
            type: "post",
            url: "../submitTodo/submitTodo.php",
            data: { todo: todo },
            beforeSend: function() {
                $(".todo-form").append(`
                <span id="create-todo-loader" style="
                left: 20%;
                position: absolute;
                margin-top: 50px;
                z-index: 99999;
                font-size: 1.5rem;
                font-weight: 700;"><div class="ui active inline loader"></div> Creating Todo...</span>`);
                $(".todo-form > .flow-text")[0].style.setProperty(
                    "filter",
                    "blur(3px)"
                );
            },
            complete: function() {
                $("#create-todo-loader").remove();
                $(".todo-form > .flow-text")[0].style.setProperty(
                    "filter",
                    "blur(0px)"
                );
            },
            success: function(data) {
                if (data == "insertionSuccessful") {
                    $("#todo-box").val("");
                    // console.log(data);
                    let loadLocation = "../getTodoData/getLastTodoData.php";
                    loadTheLatestTodo(loadLocation);
                } else if (data == "failed") {
                    alert("failed to create todo!");
                }
            },
            error: function(err) {
                console.log(err);
                alert("Something went wrong! Please try again");
            }
        });
    } else {
        alert("empty field");
    }
});