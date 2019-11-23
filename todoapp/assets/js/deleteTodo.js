// removing todo 
function removeTodo(todoID) {
    $("div[id=" + todoID + "]").remove();
}

// deleting todo
function todoDelete(todoID) {
    // alert("rech" + todoID);
    $.ajax({
        type: "get",
        url: "../customizeTodo/deleteTodo.php   ",
        data: { todoID: todoID },
        success: function(data) {
            if (data.split("::")[0] == "successful") {
                // showing deletion message
                let deleteModal = document.querySelector("#deleteTodoModal");
                let deleteInstance = M.Modal.getInstance(deleteModal);

                deleteInstance.open();
                removeTodo(todoID);

                if (data.split("::")[1] == 0) {
                    // if no todo found
                    $('.no-todo-found').html("<h3 class='col push-m2'> No Todo Found!</h3>");
                }

            } else if (data.split("::")[0] == "failed") {
                alert('failed to delete todo!');
            }


        },
        error: function(err) {
            console.error(err);
        }
    });
}