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

            // showing deletion message
            let deleteModal = document.querySelector("#deleteTodoModal");
            let deleteInstance = M.Modal.getInstance(deleteModal);

            deleteInstance.open();
            removeTodo(todoID);

        },
        error: function(err) {
            console.error(err);
        }
    });
}