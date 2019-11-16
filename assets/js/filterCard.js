//TODO this file can be more optimized by making function more dynamic by passing the status values

// getting filter-operation div for showing current selected value of the filter button
let filterTitle = document.querySelector('#filter-operation');

function updateFilterCount(countStatus) {
    if (countStatus == 0) {
        $('#no-card-found').html("<h3>No Tasks Found!</h3>");
        let count = $("#total-cards-value").val();
        // $(".total-card-value-holder").html(countStatus);
        $(".total-card-value-holder").html(
            `<input type="visible" value=` + countStatus + ` id="total-cards-value-holder">
            <input type="hidden" value=` + count + ` id="total-cards-value">`
        );
    } else {
        let count = $("#total-cards-value").val();
        // $(".total-card-value-holder").html(countStatus);
        $(".total-card-value-holder").html(
            `<input type="visible" value=` + countStatus + ` id="total-cards-value-holder">
            <input type="hidden" value=` + count + ` id="total-cards-value">`
        );
    }
}


// shows all the tasks
$('.all-tasks-btn').on('click', function() {

    $("#filter-cards").html("");

    // clearing old data
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "All Tasks";

    $(".filter-card-tasks").hide();

    let allTasks = document.querySelectorAll('.card_status');
    for (i = 0; i < allTasks.length; i++) {
        allTasks[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
        // fix the bug if no tasks is found display message 'no ongoing tasks'
    }
    let countStatus = allTasks.length;
    $(".card-tasks").show();
    updateFilterCount(countStatus);
});

// shows the ongoing tasks
$('.ongoing-tasks-btn').on('click', function() {

    // clearing old data
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Ongoing Tasks";

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
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Paused Tasks";

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
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Delayed Tasks";

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
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Stopped Tasks";

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
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Completed Tasks";

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
    $('#no-card-found').html('');

    // setting up the title
    filterTitle.innerHTML = "Not Started Yet Tasks";

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

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "latestTasks"
        },
        dataType: "json",
        success: function(data) {
            // console.log(data);

            $(".card-tasks").hide();
            $("#filter-cards").html("");
            $(".filter-card-tasks").show();

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(data, data.length, container);

        },
        error: function(err) {
            console.log(err);
        }
    });
});

$('.oldest-tasks').on('click', function() {
    // console.log('clicked');

    $.ajax({
        type: "get",
        url: "../filterCards/filterCards.php",
        data: {
            tasks: "oldestTasks"
        },
        dataType: "json",
        success: function(data) {
            // console.log(data);

            $(".card-tasks").hide();
            $("#filter-cards").html("");
            $(".filter-card-tasks").show();

            // this function is in showData.js file
            let container = "filter-cards";
            loadCards(data, data.length, container);
        },
        error: function(err) {
            console.log(err);
        }
    });
});