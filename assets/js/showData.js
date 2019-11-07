// display all the cards of the user on page load

function loadUserData() {
    $.ajax({
        async: true,
        type: "get",
        url: "../getUserData/getTaskData.php",
        dataType: "json",
        beforeSend: function () {
            $("#task-loading").html(
                '<img src="../assets/imgs/tasks-loading.gif" width="100%" height="100%"></img>'
            );
        },
        complete: function () {
            $("#task-loading").hide();
            document.querySelector(".card-tasks").style.display = "block";
        },
        success: function (data) {
            // console.log("data received");
            // console.log(data);
            $(".total-card-value-holder").html(
                data.length +
                `<input type="hidden" value=` +
                data.length +
                ` id="total-cards-value">`
            );
            for (var i = 0; i < data.length; i++) {

                // For status color
                let statusArr = {
                    "Ongoing": "light-blue accent-2",
                    "Pause": "deep-purple lighten-3",
                    "Delayed": "deep-orange accent-2",
                    "Stopped": "red accent-1",
                    "Completed": "green accent-2",
                    "Not Started Yet": "pink accent-1"
                };
                // console.log(data[i]);
                if (i % 2 == 0) {
                    $("#all-cards").append(
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
                        <div class="chip card_status ` + statusArr[data[i]["status"]] + `">` +
                        data[i]["status"] +
                        `
                      </div>
                      </div>
                      <p class="col s12" style="font-size: medium;font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;">date_range</i>` +
                        data[i]["datestarted"] +
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
                    </div>`
                    );
                } else {
                    $("#all-cards").append(
                        `
                        <div class="col s12 m6" id=` +
                        data[i]["id"] +
                        `>
                        <div class="card yellow accent-1">
                        <div class="card-title row"><div class="col s12 m7 card_title">` +
                        data[i]["title"] +
                        `
                        </div>
                        <div class="col s12 m5">
                        <div class="chip card_status ` + statusArr[data[i]["status"]] + `">` +
                        data[i]["status"] +
                        `
                        </div>
                        </div>
                        <p class="col s12" style="font-size: medium;font-weight: 400;margin-top: 5px;"><i class="material-icons left small" style="margin-right: 0px;">date_range</i>` +
                        data[i]["datestarted"] +
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
                            <div class="card-footer" style="border-top: 2px solid #880e4f; padding: 16px;">
                            <a class="waves-effect waves-light btn modal-trigger blue darken-1" href="#modal5" id=` +
                        data[i]["id"] +
                        ` onclick=editCard(this.id)><i class="material-icons right">edit</i>Edit</a>
                            <a class="waves-effect waves-light btn red darken-1" id=` +
                        data[i]["id"] +
                        ` onclick=deleteCard(this.id) style="float: right;"><i class="material-icons right">delete_forever</i>Delete</a>
                            </div>
                        </div>
                    </div>`
                    );
                }
            }
        },
        error: function (err) {
            // console.log(err);
            let count = 0;
            $(".total-card-value-holder").html(
                count +
                `<input type="hidden" value=` +
                count +
                ` id="total-cards-value">`
            );
            // console.log("something went wrong :(");
        }
    });
}