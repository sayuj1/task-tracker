//TODO this file can be more optimized by making function more dynamic by passing the status values

// getting filter-operation div for showing current selected value of the filter button
let filterTitle = document.querySelector('#filter-operation');
let filterTaskStatusTitle = document.querySelector('#filter-task-status-title');

function updateFilterCount(countStatus) {
    if (countStatus == 0) {
        $('#no-card-found').html("<h3>No Tasks Found!</h3>");
        $('#no-filter-card-found').html("<h3>No Tasks Found!</h3>");
        let count = $("#total-cards-value").val();
        // $(".total-card-value-holder").html(countStatus);
        $(".total-card-value-holder").html(
            `<input type="visible" value=` + countStatus + ` class="total-cards-value-holder">
            <input type="hidden" value=` + count + ` class="total-cards-value">`
        );
    } else {
        let count = $(".total-cards-value").val();
        // $(".total-card-value-holder").html(countStatus);
        $(".total-card-value-holder").html(
            `<input type="visible" value=` + countStatus + ` class="total-cards-value-holder" readonly disabled>
            <input type="hidden" value=` + count + ` class="total-cards-value">`
        );
    }
}


// shows all the tasks
$('.all-tasks-btn').on('click', function() {

    $("#filter-cards").empty();

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "All Tasks";
    filterTaskStatusTitle.innerHTML = "All Tasks";

    $(".filter-card-tasks").hide();
    $(".card-tasks").hide();

    $.ajax({
        async: true,
        type: "get",
        url: "../getUserData/getTaskData.php",
        dataType: "json",
        beforeSend: function() {
            $("#task-loading").show();
            $("#task-loading").html(`
            <div class="ui fluid placeholder">
            <div class="image header">
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            </div>
            `);
        },
        complete: function() {
            $("#task-loading").hide();
            document.querySelector(".card-tasks").style.display = "block";
        },
        success: function(data) {
            $("#all-cards").empty();
            $(".card-tasks").show();
            let container = "all-cards";
            loadCards(container, data, data.length);
            let countStatus = data.length;
            $(".card-tasks").show();
            updateFilterCount(countStatus);
        },
        error: function(err) {

        },
    });



});

// shows the ongoing tasks
$('.ongoing-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Ongoing Tasks";
    filterTaskStatusTitle.innerHTML = "Ongoing Tasks"

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Ongoing") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
    }

    updateFilterCount(countStatus);

});

// shows the pause tasks
$('.pause-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Paused Tasks";
    filterTaskStatusTitle.innerHTML = "Paused Tasks";

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Pause") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    updateFilterCount(countStatus);
});

// shows the delayed tasks
$('.delayed-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Delayed Tasks";
    filterTaskStatusTitle.innerHTML = "Delayed Tasks";

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Delayed") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }

    updateFilterCount(countStatus);
});

// shows the stopped tasks
$('.stopped-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Stopped Tasks";
    filterTaskStatusTitle.innerHTML = "Stopped Tasks";

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Stopped") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    updateFilterCount(countStatus);
});

// shows the completed tasks
$('.completed-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Completed Tasks";
    filterTaskStatusTitle.innerHTML = "Completed Tasks";

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Completed") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    updateFilterCount(countStatus);
});

// shows the not started yet tasks
$('.notstartedyet-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').empty();
    $('#no-filter-card-found').empty();

    // setting up the title
    filterTitle.innerHTML = "Not Started Yet Tasks";
    filterTaskStatusTitle.innerHTML = "Not Started Yet Tasks";

    let allTasks = document.querySelectorAll('.card_status');
    let countStatus = 0;

    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].innerText.trim() == "Not Started Yet") {
            countStatus += 1;
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        } else {
            allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    updateFilterCount(countStatus);
});

$('.latest-tasks').on('click', function() {
    // console.log('clicked');
    $(".card-tasks").hide();
    $("#all-cards").empty();

    $('.filter-card-tasks').hide();
    $('#no-filter-card-found').empty();
    $("#filter-cards").empty();

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "latestTasks"
        },
        beforeSend: function() {
            $("#task-loading").show();
            $("#task-loading").html(`
            <div class="ui fluid placeholder">
            <div class="image header">
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            </div>
            `);
        },
        complete: function() {
            $("#task-loading").hide();
            // document.querySelector(".card-tasks").style.display = "block";
        },
        dataType: "json",
        success: function(data) {
            // console.log(data);


            $(".filter-card-tasks").show();

            $("#filter-title").html(`Latest Tasks`);
            filterTaskStatusTitle.innerHTML = "All Tasks";

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(container, data, data.length);

        },
        error: function(err) {
            console.log(err);
        }
    });
});

$('.oldest-tasks').on('click', function() {
    // console.log('clicked');
    $(".card-tasks").hide();
    $("#all-cards").empty();

    $('.filter-card-tasks').hide();

    $('#no-filter-card-found').empty();
    $("#filter-cards").empty();

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "oldestTasks"
        },
        dataType: "json",
        beforeSend: function() {
            $("#task-loading").show();
            $("#task-loading").html(`
            <div class="ui fluid placeholder">
            <div class="image header">
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            </div>
            `);
        },
        complete: function() {
            $("#task-loading").hide();
            // document.querySelector(".card-tasks").style.display = "block";
        },
        success: function(data) {
            // console.log(data);


            $(".filter-card-tasks").show();

            $("#filter-title").html(`Oldest Tasks`);
            filterTaskStatusTitle.innerHTML = "All Tasks";

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(container, data, data.length);
        },
        error: function(err) {
            console.log(err);
        }
    });
});