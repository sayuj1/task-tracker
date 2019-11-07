// for removing the card from the DOM
function removeCard(card_id) {
    $("div[id=" + card_id + "]").remove();
}

// for updating the total card values
function updateTotalCardValues() {
    let count = $("#total-cards-value").val();
    count = Number(count) - 1;
    // alert(count);
    $(".total-card-value-holder").html(count);
    $(".total-card-value-holder").append(
        `<input type="hidden" value=` + count + ` id="total-cards-value">`
    );
}

// for loading the card values for updation
function loadValues(card_id) {
    $.ajax({
        type: "get",
        url: "../getUserData/getTaskDataByID.php",
        dataType: "json",
        data: {
            cardID: card_id
        },
        success: function (data) {
            // console.log(data);
            if (data == "zeroRow") {
                console.log("Invalid card");
            } else if (data == "something wrong") {
                console.log("server error! sorry");
            } else {
                // console.log(data);
                $(".edit-form #card-id").val(data[0]["id"]);
                $(".edit-form #card-title-edit").val(data[0]["title"]);
                $(".edit-form #card-body").val(data[0]["task"]);
                $(".edit-form #status").val(data[0]["status"]);
                $(".edit-form #card-assigned").val(data[0]["assignedby"]);
                $("#card-title-edit").characterCounter();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

// clearing edit form fields after successful submission
function clearEditFormFields() {
    $(".edit-form #card-id").val("");
    $(".edit-form #card-title").val("");
    $(".edit-form #card-body").val("");
    $(".edit-form #status").val($(".edit-form #status option:first").val());
    $(".edit-form #card-assigned").val("");
    $("#card-title-edit").characterCounter();
}

// for editing the card
function editCard(card_id) {
    // console.log("id received" + card_id);
    loadValues(card_id);
}

// updating the card after the successful edited in the database
function updateCard(updatedData) {

    // getting the updated values 
    let card_id = updatedData[0]["value"];
    let card_title = updatedData[1]["value"];
    let card_task = updatedData[2]["value"];
    let card_status = updatedData[3]["value"];
    let card_assignedBy = updatedData[4]["value"];

    // setting the updated values to the card
    $("div[id=" + card_id + "] .card_title")[0].innerHTML = card_title;
    $("div[id=" + card_id + "] .card_task")[0].innerHTML = card_task;
    $("div[id=" + card_id + "] .card_status")[0].innerHTML = card_status;
    $("div[id=" + card_id + "] .card_assignedBy")[0].innerHTML = `<i class="material-icons left small" style="margin-right: 0px;margin-top: 3px;">assignment_ind</i>Assigned By: ` + card_assignedBy;

    // For status color
    let statusArr = {
        "Ongoing": "light-blue accent-2",
        "Pause": "deep-purple lighten-3",
        "Delayed": "deep-orange accent-2",
        "Stopped": "red accent-1",
        "Completed": "green accent-2",
        "Not Started Yet": "pink accent-1"
    };

    // updating the status color
    let className = $("div[id=" + card_id + "] .card_status").attr('class').split(' ');
    // console.log(className[2], className[3]);
    $("div[id=" + card_id + "] .card_status").removeClass(className[2] + ' ' + className[3]).addClass(statusArr[card_status]);
}

// edit card submission
$(".edit-form").on("submit", function (e) {
    e.preventDefault();
    let editDataArray = $(".edit-form").serializeArray();
    // console.log(editDataArray);
    $.ajax({
        type: "post",
        url: "../editDelete/editCard.php",
        data: $(".edit-form").serialize(),
        beforeSend: function () {
            // show the loader
        },
        complete: function () {
            // hide the loader
        },
        success: function (data) {
            // console.log(data);
            if (data == "updationSuccessful") {
                // add a toast message later

                // card create modal
                var editModal = document.querySelector("#modal5");
                var editModalInstance = M.Modal.getInstance(editModal);

                // display info message
                var editMessageModal = document.querySelector("#modal6");
                var editMessageModalInstance = M.Modal.getInstance(editMessageModal);

                editMessageModalInstance.open();

                // update the real time card
                updateCard(editDataArray);

                $(".editOk").on("click", function () {
                    // alert("button is pressed");

                    clearEditFormFields();
                    editModalInstance.close();
                });
            } else if (data == "failed") {
                console.log("Failed to create card! Try again :(");
            } else {
                console.log("error from server side!");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});

// for deleting the card
function deleteCard(card_id) {
    // console.log("id received" + card_id);
    $.ajax({
        type: "post",
        url: "../editDelete/deleteCard.php",
        data: {
            cardID: card_id
        },
        beforeSend: function () {
            // add the loader later
        },
        complete: function () {
            // add the loader later
        },
        success: function (data) {
            // console.log('it is working');
            // console.log(data);
            if (data == "successful") {
                // call a function to remove the card from the page
                removeCard(card_id);
                // console.log('deleted');
                // call a modal to show the deletion information
                // display info message
                var deleteModal = document.querySelector("#modal4");
                var deleteInstance = M.Modal.getInstance(deleteModal);

                deleteInstance.open();

                // updating the total count value
                updateTotalCardValues();
            } else if (data == "failed") {
                // add a modal to show the message
                console.log("fail to delete the card! Please try again");
            }
        },
        error: function (err) {
            console.log("Not successful");
        }
    });
}