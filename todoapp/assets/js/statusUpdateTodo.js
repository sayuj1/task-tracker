function todoComplete(todoID) {
    // alert(todoID);
    $.ajax({
        type: "post",
        url: "../customizeTodo/statusUpdateTodo.php",
        data: { todoStatus: "Complete", todoID: todoID },
        success: function(data) {
            if (data == "updationSuccessful") {
                // $("div[id=" + todoID + "]")[0].style.setProperty("text-decoration", "line-through");
                $("div[id=" + todoID + "] > .card-panel > .card-content")[0].style.setProperty("text-decoration", "line-through");

                // updating status text
                $("div[id=" + todoID + "] > .card-panel >.todoStatus")[0].textContent = "Status: Complete";

                // updating status color
                $("div[id=" + todoID + "] > .card-panel >.todoStatus").addClass('green-text text-accent-2').removeClass('yellow-text');
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

function todoPending(todoID) {
    $.ajax({
        type: "post",
        url: "../customizeTodo/statusUpdateTodo.php",
        data: { todoStatus: "Pending", todoID: todoID },
        success: function(data) {
            if (data == "updationSuccessful") {
                // $("div[id=" + todoID + "]")[0].style.setProperty("text-decoration", "line-through");
                $("div[id=" + todoID + "] > .card-panel > .card-content")[0].style.setProperty("text-decoration", "none");

                // updating status text
                $("div[id=" + todoID + "] > .card-panel >.todoStatus")[0].textContent = "Status: Pending";

                // updating status color
                $("div[id=" + todoID + "] > .card-panel >.todoStatus").addClass('yellow-text').removeClass('green-text text-accent-2');
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