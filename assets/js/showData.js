// display all the cards of the user received from the server

function loadCards(data, totalCards, container) {
    for (var i = 0; i < totalCards; i++) {
        // For status color
        let statusArr = {
            Ongoing: "light-blue accent-2",
            Pause: "deep-purple lighten-3",
            Delayed: "deep-orange accent-2",
            Stopped: "red accent-1",
            Completed: "green accent-2",
            "Not Started Yet": "pink accent-1"
        };
        // console.log(data[i]);
        // if (i % 2 == 0) {
        $("#" + container + "").append(
            `
                <div class="col s12 m6" id=` +
            data[i]["id"] +
            `>
                <div class="card yellow accent-1">
                <div class="card-title row">
                <div class="col s12 m7 card_title">` +
            data[i]["title"] +
            `
                </div>
                <div class="col s12 m5">
                <div class="chip card_status ` +
            statusArr[data[i]["status"]] +
            `">` +
            data[i]["status"] +
            `
              </div>
              </div>
              <p class="col s12 valign-wrapper" style="font-size: medium;font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;">date_range</i>` +
            data[i]["datestarted"].split("::")[0] +
            `<i class="material-icons small" style="margin-right: 0px;margin-left: 5px;">access_time</i>` +
            data[i]["datestarted"].split("::")[1] +
            `</p>
                <p class="col s12 card_assignedBy" style="font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;margin-top: 3px;">assignment_ind</i>Assigned By: ` +
            data[i]["assignedby"] +
            `</p>
              </div>
                <div class="divider pink darken-4" style="height: 2px;"></div>
                    <div class="card-content black-text flow-text">
                    <input type="hidden" value=` +
            data[i]["id"] +
            `>
                   <p class="card_task">` +
            data[i]["task"] +
            `</p>
                    </div>
                    <div class="card-footer" style="border-top: 2px solid #880e4f;padding: 16px;">
                    <a class="waves-effect waves-light btn modal-trigger blue darken-1" href="#modal5" id=` +
            data[i]["id"] +
            ` onclick="editCard(this.id)"><i class="material-icons right">edit</i>Edit</a>
                    <a class="waves-effect waves-light btn red darken-1" id=` +
            data[i]["id"] +
            ` onclick="deleteCard(this.id)" style="float: right;"><i class="material-icons right">delete_forever</i>Delete</a>
                    </div>
                    </div>
            </div>
            `
        );
    }
}

// requesting from the server for the user tasks data
function loadUserData() {
    $.ajax({
        async: true,
        type: "get",
        url: "../getUserData/getTaskData.php",
        dataType: "json",
        beforeSend: function() {
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
            // console.log("data received");
            // console.log(data);
            $(".total-card-value-holder").html(
                `<input type="visible" value=` + data.length + ` id="total-cards-value-holder">
                <input type="hidden" value=` +
                data.length +
                ` id="total-cards-value">`
            );
            let container = "all-cards";
            loadCards(data, data.length, container);
        },
        error: function(err) {
            // console.log(err);
            let count = 0;
            $(".total-card-value-holder").html(
                `<input type="visible" value=` + count + ` id="total-cards-value-holder">`
                `<input type="hidden" value=` +
                count +
                ` id="total-cards-value">`
            );
            // console.log("something went wrong :(");
        }
    });
}