function goBack() {

    // removing the resize event
    $(window).off("resize");

    $(".view-profile").hide();
    $(".create-filter").show();
    $(".task-container").show();
}

function loadDetails() {
    // console.log('reach here');
    $.ajax({

        type: "get",
        url: "../viewDetails/viewDetails.php",
        dataType: "json",
        beforeSend: function () {
            // loader goes here
        },
        complete: function () {
            // loader goes here
        },
        success: function (dataResponse) {
            // console.log(dataResponse);

            // drawing graph of user tasks
            google.charts.load("current", {
                packages: ['corechart']
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let data = google.visualization.arrayToDataTable([
                    ["Status", "Tasks-Status", {
                        role: "style"
                    }],
                    ["Ongoing", dataResponse["Ongoing"], "color: #40c4ff"],
                    ["Delayed", dataResponse["Delayed"], "color: #ff6e40"],
                    ["Pause", dataResponse["Pause"], "color: #b39ddb"],
                    ["Stopped", dataResponse["Stopped"], "color: #ff8a80"],
                    ["Not Started Yet", dataResponse["NotStartedYet"], "color: #ff80ab"],
                    ["Completed", dataResponse["Completed"], "color: #69f0ae "]
                ]);

                let view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                    {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                let options = {
                    title: "Analysis of Users Tasks",
                    height: 500,
                    bar: {
                        groupWidth: "95%"
                    },
                    legend: {
                        position: "top"
                    },
                };
                let chart = new google.visualization.ColumnChart(document.querySelector(".view-profile"));
                chart.draw(view, options);

                // just to make chart responsive
                $(window).resize(function () {
                    // console.log('event triggered');
                    drawChart();
                });

                $('.view-profile').append(
                    `
                    <div class="row center-align">
                    <a onclick=goBack() class="waves-effect waves-light btn blue darken-1 btn-large hide-on-small-only">Go To Mainpage</a>
                    <a onclick=goBack() class="waves-effect waves-light btn blue darken-1 hide-on-med-and-up">Go To Mainpage</a>
                    </div>
                    `
                );

            }

        },
        error: function (err) {
            console.log(err);
        }
    });
}