function loadUserData() {
    // write here
    //about the user's tasks
    $.ajax({
        async: true,
        type: "get",
        url: "../getUserData/getTaskData.php",
        dataType: "json",
        beforeSend: function () {
            $("#task-loading").html('<img src="../assets/imgs/tasks-loading.gif" width="100%" height="100%"></img>');
        },
        complete: function () {
            $("#task-loading").hide();
            document.querySelector(".table-tasks").style.display = "block";
        },
        success: function (data) {
            console.log('data received');
        },
        error: function () {
            console.log("something went wrong!");
        }
    });

}