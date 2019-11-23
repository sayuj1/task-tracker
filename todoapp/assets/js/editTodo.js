function updateEditTodo(todoID) {
    let todoContentBox = $("div[id=" + todoID + "] > .card-panel > .card-content")[0];
    todoContentBox.innerHTML = todoContentBox.innerText;
}

function submitTodoEdit(todoID) {
    let todoContent = $("div[id=" + todoID + "] > .card-panel > .card-content")[0].innerText;
    // alert('clicked ' + todoID + todoContent);

    $.ajax({
        type: "post",
        url: "../customizeTodo/editTodo.php",
        data: { todoID: todoID, todoContent: todoContent },
        beforeSend: function() {
            $("#" + todoID + "").eq(0).prepend(`
            <span id="edit-todo-loader" style="
            left: 25%;
            position: absolute;
            margin-top: 50px;
            z-index: 99999;
            font-size: 2rem;
            font-weight: 700;"><div class="ui active inline loader"></div> Updating Todo...</span>`);
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            $("#edit-todo-loader").remove();
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            // console.log(data);
            if (data == "updationSuccessful") {

                updateEditTodo(todoID);

                let todoContentBox = $("div[id=" + todoID + "] > .card-panel > .card-content")[0];
                todoContentBox.removeAttribute("contenteditable");

                todoContentBox.style.setProperty("border", "none");

                $('.todoEditButton').remove();

                alert("todo updated");

            } else if (data == "failed") {
                console.log(data);
                alert('failed to update the todo');
            }
            // console.log(data);

        },
        error: function(err) {
            console.error(err);
        }
    });
}

function loadEditTodo(todoID) {
    $.ajax({
        type: "get",
        url: "../getTodoData/getTodoDataByID.php",
        data: { todoID: todoID },
        beforeSend: function() {
            $("#" + todoID + "").eq(0).prepend(`
            <span id="edit-todo-loader" style="
            left: 25%;
            position: absolute;
            margin-top: 50px;
            z-index: 99999;
            font-size: 2rem;
            font-weight: 700;"><div class="ui active inline loader"></div> Loading Todo...</span>`);
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            $("#edit-todo-loader").remove();
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            // console.log(data);
            let parsedData = JSON.parse(data);

            let todoContentBox = $("div[id=" + todoID + "] > .card-panel > .card-content")[0];
            todoContentBox.innerText = parsedData[0].todo;

            // console.log(data);
        },
        error: function(err) {
            console.error(err);
        }
    });
}

function todoEdit(todoID) {
    // alert(todoID);
    loadEditTodo(todoID);

    let todoContentBox = $("div[id=" + todoID + "] > .card-panel > .card-content")[0];
    todoContentBox.setAttribute("contenteditable", "");
    todoContentBox.style.setProperty("border", "1px solid yellow");

    $(`<a class='btn btn-large todoEditButton' id=` + todoID + ` onclick=submitTodoEdit(this.id) style='margin-top: 10px; font-weight: 700;'>Edit</a>`).insertAfter("div[id=" + todoID + "] > .card-panel > .divider");

}