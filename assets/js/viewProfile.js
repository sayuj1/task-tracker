// for going back to mainpage
function goToMainpage() {
    $(".view-profile").hide();
    $(".create-filter").show();
    $(".task-container").show();
}

// for going back to view-profile
function goToViewProfile() {
    loadProfile();
}

// adding event listeners after loading the dom elements
function submitForm() {
    // updating user profile by sending data to server
    $(".update-profile").on("submit", function (e) {
        // alert('clickced');
        // console.log('here');
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "../viewProfile/updateProfile.php",
            data: $('.update-profile').serialize(),
            beforeSend: function () {
                // loader goes here
            },
            complete: function () {
                // loader goes here
            },
            success: function (data) {
                // console.log(data);
                if (data == 'updationSuccessful') {
                    alert('Profile Updated');

                } else if (data == 'failed') {
                    alert('sorry could not update your profile! Please try again')
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

// for updating the user profile
function updateProfile() {
    $.ajax({
        type: "get",
        url: "../viewProfile/viewProfile.php",
        dataType: "json",
        beforeSend: function () {
            // loader goes here
        },
        complete: function () {
            // loader goes here
        },
        success: function (data) {
            // console.log(data);

            $(".view-profile").html(
                `<div class='row'>
                <div class='col s12 m6 offset-m3'>
                    <div class='card z-depth-3'>
                    <a onclick=goToViewProfile() class="btn light-blue" style="
                    margin-left: 10px;
                    margin-top: 10px;"><i class="material-icons left">arrow_back</i></a>
                        <form method='POST' class='update-profile'>
                            <div class='row'>
                                <div class='card-title center-align' style='font-size: 32px;'>Update User's Profile</div>
                            </div>
            
                            <div class='row flow-text black-text center-align card-main-row'>
            
                                <div class='col s6 m6'>
                                    <span>Username</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='username' placeholder='Enter your username' value=` +
                data[0]['username'] + ` required disabled>
                                </div>
            
                                <div class='col s6 m6'>
                                    <span>Firstname</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='firstname' placeholder='Enter your firstname' value=` +
                data[0]['firstname'] + ` required>
                                </div>
            
                                <div class='col s6 m6'>
                                    <span>Lastname</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='lastname' placeholder='Enter your lastname' value = ` + data[0]['lastname'] + ` required>
                                </div>
            
                            </div>
                            
                            <div class='card-footer view-profile-card-footer' style='padding: 24px;'>
                            <a onclick=goToMainpage() class="waves-effect waves-light btn blue darken-1">Go To Mainpage</a>
                                <button type='submit' name='updateProfile' class='btn orange darken-1' style="float:right;">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`

            );
            submitForm();
        },
        error: function (err) {
            console.log("Error from server side " + err);
        }
    });
}
// for loading user profile
function loadProfile() {
    $.ajax({
        type: "get",
        url: "../viewProfile/viewProfile.php",
        dataType: "json",
        beforeSend: function () {
            // loader goes here
        },
        complete: function () {
            // loader goes here
        },
        success: function (data) {
            // console.log(data);
            $(".view-profile").html(
                `
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
                                <span>` +
                data[0]["username"] +
                `</span>
                            </div>

                            <div class="col s6 m6 card-content-data">
                                <span>Firstname</span>
                            </div>
                            <div class="col s6 m6 card-content-data">
                                <span>` +
                data[0]["firstname"] +
                `</span>
                            </div>

                            <div class="col s6 m6 card-content-data">
                                <span>Lastname</span>
                            </div>
                            <div class="col s6 m6 card-content-data">
                                <span>` +
                data[0]["lastname"] +
                `</span>
                            </div>

                        </div>

                        <div class="card-footer view-profile-card-footer" style="padding: 24px;">
                            <a onclick=goToMainpage() class="waves-effect waves-light btn blue darken-1">Go Back</a>
                            <a onclick=updateProfile() class="waves-effect waves-light btn orange darken-1" style="float: right;">Update
                                Profile</a>
                        </div>
                    </div>
                </div>
            </div>
                `
            );
        },
        error: function (err) {
            console.log(err);
        }
    });
}