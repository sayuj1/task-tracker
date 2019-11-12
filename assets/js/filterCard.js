// this file can be more optimized by making function more dynamic by passing the status values

// shows all the tasks
$('.all-tasks-btn').on('click', function () {

    $("#filter-cards").html("");
    $(".filter-card-tasks").hide();
    let allTasks = document.querySelectorAll('.card_status');

    for (i = 0; i < allTasks.length; i++) {
        allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    $(".card-tasks").show();
});

// shows the ongoing tasks
$('.ongoing-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Ongoing") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

// shows the pause tasks
$('.pause-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Pause") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

// shows the delayed tasks
$('.delayed-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Delayed") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

// shows the stopped tasks
$('.stopped-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Stopped") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

// shows the completed tasks
$('.completed-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Completed") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

// shows the not started yet tasks
$('.notstartedyet-tasks-btn').on('click', function () {
    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Not Started Yet") {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
});

$('.latest-tasks').on('click', function () {
    // console.log('clicked');

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "latestTasks"
        },
        dataType: "json",
        success: function (data) {
            // console.log(data);

            $(".card-tasks").hide();
            $("#filter-cards").html("");
            $(".filter-card-tasks").show();

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(data, data.length, container);

        },
        error: function (err) {
            console.log(err);
        }
    });
});

$('.oldest-tasks').on('click', function () {
    // console.log('clicked');

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "oldestTasks"
        },
        dataType: "json",
        success: function (data) {
            // console.log(data);

            $(".card-tasks").hide();
            $("#filter-cards").html("");
            $(".filter-card-tasks").show();

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(data, data.length, container);
        },
        error: function (err) {
            console.log(err);
        }
    });
});