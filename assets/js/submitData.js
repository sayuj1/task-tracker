// clearing the card fields after successful submission
function clearSmallDeviceFields() {
    $(".small-device #card-title-sm").val("");
    $(".small-device #card-body").val("");
    $(".small-device #status").val($(".small-device #status option:first").val());
    $(".small-device #card-assigned").val("");
    $("#card-title-sm").characterCounter();
}

// clearing the card fields after successful submission
function clearLargeDeviceFields() {
    $(".large-device #card-title").val("");
    $(".large-device #card-body").val("");
    $(".large-device #status").val($(".large-device #status option:first").val());
    $(".large-device #card-assigned").val("");
    $("#card-title").characterCounter();
}

// function to prepend the latest card
function prependTheLatestCard(container, data) {
    // For status color
    let statusArr = {
        "Ongoing": "light-blue accent-2",
        "Pause": "deep-purple lighten-3",
        "Delayed": "deep-orange accent-2",
        "Stopped": "red accent-1",
        "Completed": "green accent-2",
        "Not Started Yet": "pink accent-1"
    };

    $("#" + container + "").prepend(
        `<div class="col s12 m6" id=` +
        data[0]["id"] +
        `>
<div class="card yellow accent-1">
<div class="card-title row">
            <div class="col s12 m7 card_title">` +
        data[0]["title"] +
        `
            </div>
            <div class="col s12 m5">
            <div class="chip card_status ` + statusArr[data[0]["status"]] + `">` +
        data[0]["status"] +
        `
          </div>
          </div>
          <p class="col s12 valign-wrapper" style="font-size: medium;font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;">date_range</i>` +
        data[0]["datestarted"].split("::")[0] + `<i class="material-icons small" style="margin-right: 0px;margin-left: 5px;">access_time</i>` + data[0]["datestarted"].split("::")[1] +
        `</p>
            <p class="col s12 card_assignedBy" style="font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;margin-top: 3px;">assignment_ind</i>Assigned By: ` +
        data[0]["assignedby"] +
        `</p>
          </div>
            <div class="divider pink darken-4" style="height: 2px;"></div>
<div class="card-content black-text flow-text">
<input type="hidden" value=` +
        data[0]["id"] +
        `>
    <p class="card_task">` +
        data[0]["task"] +
        `</p>
</div>
<div class="card-footer" style="border-top: 2px solid #880e4f; padding: 16px;">
<a class="waves-effect waves-light btn modal-trigger blue darken-1" href="#modal5" id=` +
        data[0]["id"] +
        ` onclick=editCard(this.id)><i class="material-icons right">edit</i>Edit</a>
<a class="waves-effect waves-light btn red darken-1" id=` +
        data[0]["id"] +
        ` onclick=deleteCard(this.id) style="float: right;"><i class="material-icons right">delete_forever</i>Delete</a>
</div>
</div>
</div>`
    );
}



// display the last inserted card of the user
function loadTheLatestCard() {
    // alert('reach here');
    $.ajax({
        type: "get",
        url: "../getUserData/getLastTaskData.php",
        dataType: "json",
        beforeSend: function() {
            if ($('.card-tasks')[0].style.display == "block") {
                $("#all-cards").prepend(`
      <div class="row" id="latest-card-loader">
      <div class="col s12 m6">
            <div class="ui fluid placeholder" >
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
            </div>
            </div>
            `)
            } else {
                $("#filter-cards").prepend(`
      <div class="row" id="latest-card-loader">
      <div class="col s12 m6">
            <div class="ui fluid placeholder" >
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
            </div>
            </div>
            `)
            }

            // $("#task-loading").html('<img src="../assets/imgs/tasks-loading.gif" width="100%" height="100%"></img>');
        },
        complete: function() {
            $('#latest-card-loader').remove();
            // $("#task-loading").hide();
            // document.querySelector(".card-tasks").style.display = "block";
        },
        success: function(data) {
            // alert('hi');
            // alert(count);
            // alert('first one');
            if ($('.card-tasks')[0].style.display == "block") {
                prependTheLatestCard("all-cards", data);
            } else {
                prependTheLatestCard("filter-cards", data);
            }


            let visibleCount = $(".total-cards-value-holder").val();
            let hiddenCount = $(".total-cards-value").val();
            // console.log(hiddenCount);
            // console.log(visibleCount);
            hiddenCount = Number(hiddenCount) + 1;
            visibleCount = Number(visibleCount) + 1;
            // alert(count);
            // $(".total-card-value-holder").html(visibleCount);
            $(".total-card-value-holder").html(
                `<input type="visible" value=` + visibleCount + ` class="total-cards-value-holder" readonly disabled>
        <input type="hidden" value=` + hiddenCount + ` class="total-cards-value">`
            );
            // removing the "no task found" message
            $('#no-card-found').empty();
            $('#no-filter-card-found').empty();

        },
        error: function(err) {
            // console.log(err);
            console.log("something not right");
        }
    });
}

// large device card create
$(".large-device").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "../submitUserData/submitTaskData.php",
        data: $(".large-device").serialize(),
        beforeSend: function() {
            // show the loader
            $(".modal-container-large").prepend(`
      <span id="create-card-loader-lg" style="left: 42%;
                position: absolute;
                z-index: 99999;
                top: 300px;
                font-size: x-large;
                font-weight: 700;"><div class="ui active inline loader"></div> Creating Tasks....</span> 
                `);
            let createCardContainer = document.querySelector("#modal1");
            createCardContainer.style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            // hide the loader
            $("#create-card-loader-lg").remove();
            let createCardContainer = document.querySelector("#modal1");
            createCardContainer.style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            if (data == "insertionSuccessful") {
                // add a toast message later

                // card create modal
                var elem1 = document.querySelector("#modal1");
                var instance1 = M.Modal.getInstance(elem1);

                // display info message
                var elem3 = document.querySelector("#modal3");
                var instance3 = M.Modal.getInstance(elem3);

                loadTheLatestCard();
                instance3.open();

                $(".ok").on("click", function() {
                    // alert("button is pressed");

                    clearLargeDeviceFields();
                    instance1.close();
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

// Small device card create
$(".small-device").on("submit", function(e) {
    e.preventDefault();
    // alert("reached here");
    $.ajax({
        type: "post",
        url: "../submitUserData/submitTaskData.php",
        data: $(".small-device").serialize(),
        beforeSend: function() {
            // show the loader
            $(".modal-container-small").prepend(`
      <span id="create-card-loader-sm" style="left: 20%;
                position: absolute;
                z-index: 99999;
                top: 300px;
                font-size: large;
                font-weight: 700;"><div class="ui active inline loader"></div> Creating Tasks....</span> 
                `);
            let createCardContainer = document.querySelector("#modal2");
            createCardContainer.style.setProperty("filter", "blur(3px)");
        },
        complete: function() {
            // hide the loader
            $("#create-card-loader-sm").remove();
            let createCardContainer = document.querySelector("#modal2");
            createCardContainer.style.setProperty("filter", "blur(0px)");
        },
        success: function(data) {
            if (data == "insertionSuccessful") {
                // add a toast message later

                // card create modal
                var elem2 = document.querySelector("#modal2");
                var instance2 = M.Modal.getInstance(elem2);

                // display info message
                var elem3 = document.querySelector("#modal3");
                var instance3 = M.Modal.getInstance(elem3);

                loadTheLatestCard();
                instance3.open();

                $(".ok").on("click", function() {
                    // alert("button is pressed");
                    clearSmallDeviceFields();
                    instance2.close();
                });
            } else if (data == "failed") {
                // add a modal error here
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