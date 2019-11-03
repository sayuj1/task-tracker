function loadUserData() {
    // display all the cards of the user on page load
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
            document.querySelector(".card-tasks").style.display = "block";
        },
        success: function (data) {
            console.log('data received');
            // console.log(data);
            $(".total-card-value-holder").html(data.length + `<input type="hidden" value=` + data.length + ` id="total-cards-value">`);
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i]);
                if (i % 2 == 0) {
                    $('#all-cards').append(`<div class="col s12 m5">
                        <div class="card blue darken-1">
                            <div class="card-content white-text">
                            <input type="hidden" value=` + data[i]['id'] + `>
                                <span class="card-title">` + data[i]['title'] + `</span>
                                <p>` + data[i]['datestarted'] + `</p>
                                <p>` + data[i]['status'] + `</p>
                                <p>` + data[i]['task'] + `</p>
                            </div>
                            <div class="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                            </div>
                    </div>`);
                } else {
                    $('#all-cards').append(`<div class="col s12 m5 push-m2">
                        <div class="card blue darken-1">
                            <div class="card-content white-text">
                            <input type="hidden" value=` + data[i]['id'] + `>
                                <span class="card-title">` + data[i]['title'] + `</span>
                                <p>` + data[i]['datestarted'] + `</p>
                                <p>` + data[i]['status'] + `</p>
                                <p>` + data[i]['task'] + `</p>
                            </div>
                            <div class="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>`);
                }
            }

        },
        error: function (err) {
            // console.log(err);
            let count = 0;
            $(".total-card-value-holder").html(count + `<input type="hidden" value=` + count + ` id="total-cards-value">`);
            console.log("something went wrong :(");
        }
    });

}