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
        beforeSend: function() {
            $("#" + todoID + "").eq(0).prepend(`
            <span id="edit-todo-loader" style="
            left: 20%;
            position: absolute;
            margin-top: 50px;
            z-index: 99999;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;"><div class="ui active inline loader"></div> Deleting Todo...</span>`);
            $("div[id=" + todoID + "] > .card-panel")[0].style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            $("#edit-todo-loader").remove();
        },
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