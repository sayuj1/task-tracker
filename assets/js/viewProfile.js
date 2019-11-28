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
    let imgSplit = [];
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
                <span id="update-profile-loader" style="left: 35%;position: absolute;z-index: 99999;top: 300px;font-size: x-large;font-weight: 700;">
                    <div class="ui active inline loader"></div> Updating Profile...
                </span>`);
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
                    $("#updateProfile-firstname")[0].style.setProperty("border", "none");
                    $("#updateProfile-firstname")[0].style.setProperty("border-bottom", "2px solid");
                    $("#updateProfile-firstname")[0].style.setProperty("border-bottom-color", "teal");
                }
                if ($("#last-name-error").length) {
                    $("#last-name-error").remove();
                    $("#updateProfile-lastname")[0].style.setProperty("border", "none");
                    $("#updateProfile-lastname")[0].style.setProperty("border-bottom", "2px solid");
                    $("#updateProfile-lastname")[0].style.setProperty("border-bottom-color", "teal");

                }

                // checking for errors
                if (jsonData.status == "notSuccessful") {
                    // displaying errors if field is empty
                    if (jsonData.status1 == "emptyFields") {
                        if ($("#updateProfile-firstname").val() == "") {
                            $("#updateProfile-firstname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='first-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#updateProfile-firstname");
                        }
                        if ($("#updateProfile-lastname").val() == "") {
                            $("#updateProfile-lastname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='last-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#updateProfile-lastname");
                        }
                    }
                    // displaying errors if name is incorrect 
                    if (jsonData.status2 == "nameIncorrect") {
                        let firstname = $("#updateProfile-firstname").val();
                        let lastname = $("#updateProfile-lastname").val();
                        let validLetters = /^[A-Za-z]+$/;

                        if (firstname.match(validLetters)) {
                            $("#first-name-error").remove();
                            $("#updateProfile-firstname")[0].style.setProperty("border-bottom", "2px solid");
                            $("#updateProfile-firstname")[0].style.setProperty("border-bottom-color", "teal");
                            // alert('firname correct');
                        } else {
                            $("#updateProfile-firstname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='first-name-error' style='color: black;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#updateProfile-firstname");
                            // alert('firname incorrect');
                        }
                        if (lastname.match(validLetters)) {
                            // alert('lastname correct');
                            $("#last-name-error").remove();
                            $("#updateProfile-lastname")[0].style.setProperty("border-bottom", "2px solid");
                            $("#updateProfile-lastname")[0].style.setProperty("border-bottom-color", "teal");
                        } else {
                            $("#updateProfile-lastname")[0].style.setProperty("border", "5px solid red");
                            $("<div id='last-name-error' style='color: black;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#updateProfile-lastname");
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

            $(".view-profile").load('./updateProfile.html', function() {
                $(".profile-img").attr("src", finalImgPath);
                $("#updateProfile-username").val(data[0]["username"]);
                $("#updateProfile-firstname").val(data[0]["firstname"]);
                $("#updateProfile-lastname").val(data[0]["lastname"]);
                submitForm();
            });

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
            // console.log(data);
            let finalImgPath = updateImagePath(data);

            $(".view-profile").load('./viewProfile.html', function() {
                $(".profile-img").attr("src", finalImgPath);
                $("#viewProfile-username")[0].innerText = data[0]["username"];
                $("#viewProfile-firstname")[0].innerText = data[0]["firstname"];
                $("#viewProfile-lastname")[0].innerText = data[0]["lastname"];
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}