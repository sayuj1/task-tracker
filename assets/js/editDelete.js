// for removing the card from the DOM
function removeCard(card_id) {
    $("div[id=" + card_id + "]").remove();
}

// for updating the total card values
function updateTotalCardValues() {
    let visibleCount = $(".total-cards-value-holder").val();
    let hiddenCount = $(".total-cards-value").val();
    hiddenCount = Number(hiddenCount) - 1;
    visibleCount = Number(visibleCount) - 1;
    // alert(count);
    // $(".total-card-value-holder").html(visibleCount);
    $(".total-card-value-holder").html(
        `<input type="visible" value=` + visibleCount + ` class="total-cards-value-holder"  readonly disabled>
        <input type="hidden" value=` + hiddenCount + ` class="total-cards-value">`
    );
    if (visibleCount == 0) {
        $('#no-card-found').html("<h3>No Tasks Found!</h3>");
        $('#no-filter-card-found').html("<h3>No Tasks Found!</h3>");
    }
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
        beforeSend: function() {

        },
        complete: function() {

        },
        success: function(data) {
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
        error: function(err) {
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

// updating the card at the front-end after the successful edited in the database
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

    try {
        // setting the updated values to the filtered cards (oldest & latest tasks)
        $("div[id=" + card_id + "] .card_title")[1].innerHTML = card_title;
        $("div[id=" + card_id + "] .card_task")[1].innerHTML = card_task;
        $("div[id=" + card_id + "] .card_status")[1].innerHTML = card_status;
        $("div[id=" + card_id + "] .card_assignedBy")[1].innerHTML = `<i class="material-icons left small" style="margin-right: 0px;margin-top: 3px;">assignment_ind</i>Assigned By: ` + card_assignedBy;
    } catch (err) {
        // just ignore it  
        // console.log(err);
    }

}

// edit card submission
$(".edit-form").on("submit", function(e) {
    e.preventDefault();
    let editDataArray = $(".edit-form").serializeArray();
    // console.log(editDataArray);
    $.ajax({
        type: "post",
        url: "../editDelete/editCard.php",
        data: $(".edit-form").serialize(),
        beforeSend: function() {
            // show the loader
            $("#modal5").prepend(`
            <div id="edit-card-loader" style="margin-left: 30%;
                      position: sticky;
                      top: 50%;
                      z-index: 99999;
                      font-size: x-large;
                      font-weight: 700;"><div class="ui active inline loader"></div> Updating Tasks....</div> 
                      `);
            let editCardContainer = document.querySelector(".edit-modal-container");
            editCardContainer.style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            // hide the loader
            $("#edit-card-loader").remove();
            let editCardContainer = document.querySelector(".edit-modal-container");
            editCardContainer.style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
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

                $(".editOk").on("click", function() {
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
        error: function(err) {
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
        beforeSend: function() {
            // add the loader later
            $("#" + card_id + "").prepend(`
            <div id="delete-card-loader" style="margin-left: 30%;
                      position: sticky;
                      top: 50%;
                      z-index: 99999;
                      font-size: x-large;
                      font-weight: 700;"><div class="ui active inline loader"></div> Deleting Tasks....</div> 
                      `);
            let cardContent = document.getElementById("" + card_id + "").getElementsByClassName("card")[0];
            cardContent.style.visibility = "hidden";

        },
        complete: function() {
            // add the loader later
            $("#delete-card-loader").remove();

        },
        success: function(data) {
            // console.log('it is working');
            // console.log(data);
            if (data == "successful") {

                //* call a function to remove the card from the page
                removeCard(card_id);
                // console.log('deleted');
                //TODO: call a modal to show the deletion information
                // display info message
                var deleteModal = document.querySelector("#modal4");
                var deleteInstance = M.Modal.getInstance(deleteModal);

                deleteInstance.open();

                // updating the total count value
                updateTotalCardValues();
            } else if (data == "failed") {

                // add a modal to show the message
                alert('failed to delete the tasks! Please Try Again :(');
                let cardContent = document.getElementById("" + card_id + "").getElementsByClassName("card")[0];
                cardContent.style.visibility = "visible";
                console.log("fail to delete the card! Please try again");
            }
        },
        error: function(err) {

            console.log("Not successful");
            alert('failed to delete the tasks! Please Try Again :(');
            let cardContent = document.getElementById("" + card_id + "").getElementsByClassName("card")[0];
            cardContent.style.visibility = "visible";
        }
    });
}