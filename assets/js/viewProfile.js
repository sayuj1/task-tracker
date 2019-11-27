// for going back to mainpage
function goToMainpage() {
    $(".view-profile").hide();
    $(".create-filter").show();
    $(".task-container").show();
}

// for going back to view-profile
function goToViewProfile() {
    $(".view-profile").html("");
    loadProfile();
}

// updating image path
function updateImagePath(data) {
    //* before displaying image setting img path from absolute to relative
    let img = data[0]["profileImg"];
    let imgSplit = []
    imgSplit = img.split("/");
    let imgSplitLen = imgSplit.length;
    let imgRelativePath = ["..", imgSplit[imgSplitLen - 2], imgSplit[imgSplitLen - 1]];
    return imgRelativePath.join("/");
}

// adding event listeners after loading the dom elements
function submitForm() {
    // updating user profile by sending data to server
    $(".update-profile").on("submit", function(e) {
        // alert('clickced');
        // console.log('here');
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "../viewProfile/updateProfile.php",
            data: $(".update-profile").serialize(),
            beforeSend: function() {
                // loader goes here

                $(".view-profile").prepend(`
                <span id="update-profile-loader" style="left: 35%;
                position: absolute;
                z-index: 99999;
                top: 300px;
                font-size: x-large;
                font-weight: 700;"><div class="ui active inline loader"></div> Updating Profile...</span> 
                `);
                let updateCardContainer = document.querySelector(
                    ".update-card-container"
                );
                updateCardContainer.style.setProperty("filter", "blur(3px)");
            },
            complete: function() {
                // loader goes here

                $("#update-profile-loader").remove();
                let updateCardContainer = document.querySelector(
                    ".update-card-container"
                );
                updateCardContainer.style.setProperty("filter", "blur(0px)");
            },
            success: function(data) {

                let jsonData = JSON.parse(data);

                // clearing previous errors
                if ($("#first-name-error").length) {
                    $("#first-name-error").remove();
                    $("#firstname")[0].style.setProperty("border", "none");
                    $("#firstname")[0].style.setProperty("border-bottom", "2px solid");
                    $("#firstname")[0].style.setProperty("border-bottom-color", "teal");
                }
                if ($("#last-name-error").length) {
                    $("#last-name-error").remove();
                    $("#lastname")[0].style.setProperty("border", "none");
                    $("#lastname")[0].style.setProperty("border-bottom", "2px solid");
                    $("#lastname")[0].style.setProperty("border-bottom-color", "teal");

                }

                // checking for errors
                if (jsonData.status == "notSuccessful") {
                    // displaying errors if field is empty
                    if (jsonData.status1 == "emptyFields") {
                        if ($("#firstname").val() == "") {
                            $("#firstname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='first-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#firstname");
                        }
                        if ($("#lastname").val() == "") {
                            $("#lastname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='last-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#lastname");
                        }
                    }
                    // displaying errors if name is incorrect 
                    if (jsonData.status2 == "nameIncorrect") {
                        let firstname = $("#firstname").val();
                        let lastname = $("#lastname").val();
                        let validLetters = /^[A-Za-z]+$/;

                        if (firstname.match(validLetters)) {
                            $("#first-name-error").remove();
                            $("#firstname")[0].style.setProperty("border-bottom", "2px solid");
                            $("#firstname")[0].style.setProperty("border-bottom-color", "teal");
                            // alert('firname correct');
                        } else {
                            $("#firstname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='first-name-error' style='color: black;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#firstname");
                            // alert('firname incorrect');
                        }
                        if (lastname.match(validLetters)) {
                            // alert('lastname correct');
                            $("#last-name-error").remove();
                            $("#lastname")[0].style.setProperty("border-bottom", "2px solid");
                            $("#lastname")[0].style.setProperty("border-bottom-color", "teal");
                        } else {
                            $("#lastname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='last-name-error' style='color: black;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#lastname");
                            // alert('lastname incorrect');
                        }
                    }
                }

                // showing success message if no error received
                if (jsonData.status == "updationSuccessful") {

                    //TODO: need to add a toast message at the top
                    alert("Profile Updated");

                    // need to update title bar value
                    let titleValue = document.querySelector("title");
                    titleValue.innerHTML = jsonData.firstname;
                } else if (data == "failed") {
                    alert("sorry could not update your profile! Please try again");
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
}

// loading update profile page
function updateProfile() {
    $.ajax({
        type: "get",
        url: "../viewProfile/viewProfile.php",
        dataType: "json",
        beforeSend: function() {
            // loader goes here
            $(".view-profile").hide();
            $(".view-profile-loader").show();
            $(".view-profile-loader").html(`
             <div class="row">
            <div class="col s12 m9 offset-m3" style="background-color: black; filter: opacity(0.9);height:70vh;">
            <div class="ui active dimmer">
    <div class="ui large text loader">Loading</div>
  </div>
            </div>
            </div>
            `);
        },
        complete: function() {
            // loader goes here
            $(".view-profile-loader").hide();
        },
        success: function(data) {
            // console.log(data);
            let finalImgPath = updateImagePath(data);
            $(".view-profile").show();
            $(".view-profile").html(
                `<div class='row update-card-container'>
                <div class='col s12 m9'>
                    <div class='card z-depth-3'>
                        <a onclick=goToViewProfile() class="btn light-blue" style="
                    margin-left: 10px;
                    margin-top: 10px;"><i class="material-icons left">arrow_back</i></a>
                        <form method='POST' class='update-profile'>
                            <div class='row'>
                                <div class='card-title center-align' style='font-size: 32px;'>Update User's Profile</div>
                            </div>
                            <div class="center-align">
                                <img src=` + finalImgPath + ` alt="img not supported!" class="profile-img">
                            </div><br>
                            <div class='row flow-text black-text center-align card-main-row'>
            
                                <div class='col s6 m6'>
                                    <span>Username</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='username' placeholder='Enter your username' value=` + data[0]["username"] + ` required disabled>
                                </div>
            
                                <div class='col s6 m6'>
                                    <span>Firstname</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='firstname' id='firstname' placeholder='Enter your firstname' value=` + data[0]["firstname"] + ` required>
                                </div>
            
                                <div class='col s6 m6'>
                                    <span>Lastname</span>
                                </div>
                                <div class='col s6 m6'>
                                    <input type='text' name='lastname' id='lastname' placeholder='Enter your lastname' value=` + data[0]["lastname"] + ` required>
                                </div>
            
                            </div>
            
                            <div class='card-footer view-profile-card-footer' style='padding: 16px;'>
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
        error: function(err) {
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
        beforeSend: function() {
            // loader goes here
            $(".view-profile-loader").show();

            $(".view-profile-loader").html(`
            <div class="row">
            <div class="col s12 m6 offset-m3">
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
            </div>
            </div>`);
        },
        complete: function() {
            // loader goes here
            $(".view-profile-loader").hide();
        },
        success: function(data) {
            console.log(data);

            let finalImgPath = updateImagePath(data);
            $(".view-profile").html(
                `
                <div class="row">
                <div class="col s12 m9">
                    <div class="card z-depth-3">
                        <div class="row">
                            <div class="card-title center-align" style="font-size: 32px;">User Profile</div>
                            <div class="center-align">
                            <img src=` + finalImgPath +
                ` alt="img not supported!" class="profile-img">
                </div>
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

                        <div class="card-footer view-profile-card-footer" style="padding: 16px;">
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
        error: function(err) {
            console.log(err);
        }
    });
}