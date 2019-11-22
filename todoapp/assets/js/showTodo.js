// display all the cards of the user received from the server
function loadTodos(container, data, totalCards) {
    for (let i = 0; i < totalCards; i++) {
        // For status color
        let statusArr = {
            Pending: "yellow-text ",
            Complete: "green-text text-accent-2 "
        };

        $("." + container + "").append(
            `<div class='col s12 m8' id=` +
            data[i]["todoId"] +
            `>
        <div class='card-panel red accent-3 flow-text'>
            <div class="row">
                <div class="left-align col s6 white-text flow-text">
                ` +
            data[i]["datecreated"].split("::")[0] +
            `
                </div>
                <div class='right-align col s6'>
                    <!-- Dropdown Trigger -->
                    <a class='todo-setting-trigger' data-target='todo-setting` + data[i]["todoId"] + `'>
                        <i class='material-icons white-text'>settings</i>
                    </a>

                    <!-- Dropdown Structure -->
                    <ul id='todo-setting` + data[i]["todoId"] + `' class='dropdown-content'>
                        <li><a style="color: #2196f3;" id=` +
            data[i]["todoId"] +
            `><i class='material-icons left blue-text'>mode_edit</i>Edit</a>
                        </li>
                        <li><a style="color: red;" id=` +
            data[i]["todoId"] +
            ` onclick=todoDelete(this.id)><i class='material-icons left red-text'>delete</i>Delete</a>
                        </li>
                        <li><a style="color: green;" id=` +
            data[i]["todoId"] +
            `><i class='material-icons left green-text'>check</i>Completed</a>
                        </li>
                        <li><a style="color: #ff9800;" id=` +
            data[i]["todoId"] +
            `><i class='material-icons left orange-text'>close</i>Pending</a>
                        </li>
                    </ul>

                </div>
            </div>

            <div class='white-text card-content' style='text-align: justify'>
            ` +
            data[i]["todo"] +
            `
            </div>
            <br>
                    <div class="divider"></div>
                    <div class=" ` +
            statusArr[data[i]["status"]] +
            `right-align" style="margin-top: 10px;font-weight: 700;">
                    Status: ` + data[i]["status"] + `
                    </div>
        </div>
    </div>`
        );

    }
}

// requesting from the server for the user tasks data
function loadTodoData() {
    $.ajax({
        async: true,
        type: "get",
        url: "../getTodoData/getTodoData.php",
        dataType: "json",
        beforeSend: function() {

        },
        complete: function() {

        },
        success: function(data) {
            // console.log("data received");
            // console.log(data);

            let container = "display-todo";
            loadTodos(container, data, data.length);

            // initializing dropdown
            $('.todo-setting-trigger').dropdown();

            // setting up the dropdown menu
            let todoSettingTrigger = document.querySelectorAll('.todo-setting-trigger');
            let todoSettingInstance = M.Dropdown.init(todoSettingTrigger, {
                inDuration: 700,
                outDuration: 225,
                constrainWidth: "false"
            });

            $('.todo-setting-trigger').on('click', function() {
                $('.todo-setting-trigger > i').addClass('setting-spin');
                setTimeout(() => {
                    $('.todo-setting-trigger > i').removeClass('setting-spin');
                }, 500);
            });

        },
        error: function(err) {
            console.log(err);

        }
    });
}