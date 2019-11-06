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
            console.log("data received");
            // console.log(data);
            $(".total-card-value-holder").html(
                data.length +
                `<input type="hidden" value=` +
                data.length +
                ` id="total-cards-value">`
            );
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i]);
                if (i % 2 == 0) {
                    $("#all-cards").append(
                        `<input type="hidden" value=` +
                        data[i]["id"] +
                        ` id=` +
                        data[i]["id"] +
                        `>
                        <div class="col s12 m6">
                        <div class="card blue-grey lighten-5">
                        <div class="card-title row">
                        <div class="col s12 m7">` +
                        data[i]["title"] +
                        `
                        </div>
                        <div class="col s12 m5">
                        <div class="chip">` +
                        data[i]["status"] +
                        `
                      </div>
                      </div>
                      <p class="col s12" style="font-size: medium;font-weight: 400;"><i class="material-icons left" style="margin-right: 2px;">date_range</i>` +
                        data[i]["datestarted"] +
                        `</p>
                      </div>
                        <div class="divider pink darken-4" style="height: 2px;"></div>
                            <div class="card-content black-text flow-text">
                            <input type="hidden" value=` +
                        data[i]["id"] +
                        `>
                           <p>` +
                        data[i]["task"] +
                        `</p>
                            </div>
                            <div class="card-action" style="border-top: 2px solid #880e4f">
                            <button type="button" class="waves-effect waves-light btn" id=` +
                        data[i]["id"] +
                        `><i class="material-icons right">edit</i>Edit</button>
                            <button type="button" class="waves-effect waves-light btn" id=` +
                        data[i]["id"] +
                        `><i class="material-icons right">delete_forever</i>Delete</button>
                            </div>
                            </div>
                    </div>`
                    );
                } else {
                    $("#all-cards").append(
                        `
                        <div class="col s12 m6">
                        <div class="card blue-grey lighten-5">
                        <div class="card-title row"><div class="col s12 m7">` +
                        data[i]["title"] +
                        `
                        </div>
                        <div class="col s12 m5">
                        <div class="chip">` +
                        data[i]["status"] +
                        `
                        </div>
                        </div>
                        <p class="col s12" style="font-size: medium;font-weight: 400;"><i class="material-icons left" style="margin-right: 2px;">date_range</i>` +
                        data[i]["datestarted"] +
                        `</p>
                        </div>
                        <div class="divider pink darken-4" style="height: 2px;"></div>
                            <div class="card-content black-text flow-text">
                            <input type="hidden" value=` +
                        data[i]["id"] +
                        `>
                                <p>` +
                        data[i]["task"] +
                        `</p>
                            </div>
                            <div class="card-action" style="border-top: 2px solid #880e4f">
                            <button type="button" class="waves-effect waves-light btn" id=` +
                        data[i]["id"] +
                        `><i class="material-icons right">edit</i>Edit</button>
                            <button type="button" class="waves-effect waves-light btn" id=` +
                        data[i]["id"] +
                        `><i class="material-icons right">delete_forever</i>Delete</button>
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
            console.log("something went wrong :(");
        }
    });
}