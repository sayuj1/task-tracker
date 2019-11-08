// for going back to cards
function goBack() {
    $('.view-profile').hide();
    $('.create-filter').show();
    $('.task-container').show();
}

// for updating the user profile

// for loading user profile
function loadProfile() {
    $.ajax({
        type: "get",
        url: "./viewProfile.php",
        dataType: "json",
        beforeSend: function () {
            // loader goes here 
        },
        complete: function () {
            // loader goes here
        },
        success: function (data) {
            // console.log(data);
            $('.view-profile').html(`
                <div class="row">
                <div class="col s12 m6 offset-m3">
                    <div class="card z-depth-3">
                        <div class="row">
                            <div class="card-title center-align" style="font-size: 32px;">User Profile</div>
                        </div>

                        <div class="row flow-text black-text center-align card-main-row z-depth-1">
                            <div class="col s6 m6 card-content-data">
                                <span>Username</span>
                            </div>
                            <div class="col s6 m6 card-content-data">
                                <span>` + data[0]['username'] + `</span>
                            </div>

                            <div class="col s6 m6 card-content-data">
                                <span>Firstname</span>
                            </div>
                            <div class="col s6 m6 card-content-data">
                                <span>` + data[0]['firstname'] + `</span>
                            </div>

                            <div class="col s6 m6 card-content-data">
                                <span>Lastname</span>
                            </div>
                            <div class="col s6 m6 card-content-data">
                                <span>` + data[0]['lastname'] + `</span>
                            </div>

                        </div>

                        <div class="card-footer view-profile-card-footer" style="padding: 24px;">
                            <a onclick=goBack() class="waves-effect waves-light btn blue darken-1">Go Back</a>
                            <a href="#" class="waves-effect waves-light btn orange darken-1" style="float: right;">Update
                                Profile</a>
                        </div>
                    </div>
                </div>
            </div>
                `);
        },
        error: function (err) {
            console.log(err);
        }
    });
}