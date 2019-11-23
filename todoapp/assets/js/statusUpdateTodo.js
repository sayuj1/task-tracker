// setting status complete
function todoComplete(todoID) {
    // alert(todoID);
    $.ajax({
        type: "post",
        url: "../customizeTodo/statusUpdateTodo.php",
        data: { todoStatus: "Complete", todoID: todoID },
        beforeSend: function() {
            $("#" + todoID + "").eq(0).prepend(`
            <span id="edit-todo-loader" style="
            left: 20%;
            position: absolute;
            margin-top: 50px;
            z-index: 99999;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;"><div class="ui active inline loader"></div> Updating Status...</span>`);
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            $("#edit-todo-loader").remove();
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            if (data == "updationSuccessful") {
                // $("div[id=" + todoID + "]")[0].style.setProperty("text-decoration", "line-through");
                $("div[id=" + todoID + "] > .card-panel > .card-content")[0].style.setProperty("text-decoration", "line-through");

                // updating status text
                $("div[id=" + todoID + "] > .card-panel > .todoStatus")[0].textContent = "Status: Complete";

                // updating status color
                $("div[id=" + todoID + "] > .card-panel > .todoStatus").addClass('green-text text-accent-2').removeClass('yellow-text');
            } else {
                console.log(data);
                alert('something went wrong!');
            }
        },
        error: function(err) {
            console.error(err);
        }
    });
}

// setting status pending
function todoPending(todoID) {
    $.ajax({
        type: "post",
        url: "../customizeTodo/statusUpdateTodo.php",
        data: { todoStatus: "Pending", todoID: todoID },
        beforeSend: function() {
            $("#" + todoID + "").eq(0).prepend(`
            <span id="edit-todo-loader" style="
            left: 20%;
            position: absolute;
            margin-top: 50px;
            z-index: 99999;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;"><div class="ui active inline loader"></div> Updating Status...</span>`);
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            $("#edit-todo-loader").remove();
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            if (data == "updationSuccessful") {
                // $("div[id=" + todoID + "]")[0].style.setProperty("text-decoration", "line-through");
                $("div[id=" + todoID + "] > .card-panel > .card-content")[0].style.setProperty("text-decoration", "none");

                // updating status text
                $("div[id=" + todoID + "] > .card-panel > .todoStatus")[0].textContent = "Status: Pending";

                // updating status color
                $("div[id=" + todoID + "] > .card-panel > .todoStatus").addClass('yellow-text').removeClass('green-text text-accent-2');
            } else {
                console.log(data);
                alert('something went wrong!');
            }
        },
        error: function(err) {
            console.error(err);
        }
    });
}