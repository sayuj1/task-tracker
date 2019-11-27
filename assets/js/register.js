$("form").on("submit", function(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "./loginRegister/register.php",
        data: new FormData(this),
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function() {
            $('#Register-btn').html(`Registering User <div class="ui active inline loader"></div>`);
        },
        complete: function() {
            $('#Register-btn').html('Register');
        },
        success: function(data) {
            console.log(data);
            let parseData = JSON.parse(data);
            // console.log(parseData);
            //removing errors if exists
            if ($("#img-size-error").length) {
                $("#img-size-error").remove();
                $("#uploadPreview")[0].style.setProperty("border", "none");
            }
            if ($("#img-type-error").length) {
                $("#img-type-error").remove();
                $("#uploadPreview")[0].style.setProperty("border", "none");
            }
            if ($("#first-name-error").length) {
                $("#first-name-error").remove();
                $("#firstname")[0].style.setProperty("border", "none");
            }
            if ($("#last-name-error").length) {
                $("#last-name-error").remove();
                $("#lastname")[0].style.setProperty("border", "none");
            }
            if ($("#user-name-error").length) {
                $("#user-name-error").remove();
                $("#username")[0].style.setProperty("border", "none");
            }
            if ($("#pass-error").length) {
                $("#pass-error").remove();
                $("#password")[0].style.setProperty("border", "none");
            }

            // checking for errors
            for (let i = 0; i < parseData.length; i++) {
                if (parseData[i] == "ImgSize") {
                    $("#uploadPreview")[0].style.setProperty("border", "5px solid red");
                    $("<div id='img-size-error' style='color: white;text-align:center;'> Imgage Size can't be more than 5MB! </div>").insertAfter("#imglink");
                } else if (parseData[i] == "InvalidImg") {
                    $("#uploadPreview")[0].style.setProperty("border", "5px solid red");
                    $("<div id='img-type-error' style='color: white;text-align:center;'> Invalid Imgage Type </div>").insertAfter("#imglink");
                }
                if (parseData[i] == "emptyFields") {
                    if ($("#firstname").val() == "") {
                        $("#firstname")[0].style.setProperty("border", "5px solid red");
                        $("<div id='first-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#firstname");
                    }
                    if ($("#lastname").val() == "") {
                        $("#lastname")[0].style.setProperty("border", "5px solid red");
                        $("<div id='last-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#lastname");
                    }
                    if ($("#username").val() == "") {
                        $("#username")[0].style.setProperty("border", "5px solid red");
                        $("<div id='user-name-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#username");
                    }
                    if ($("#password").val() == "") {
                        $("#password")[0].style.setProperty("border", "5px solid red");
                        $("<div id='pass-error' style='color: white;text-align:center;'> Empty! </div>").insertAfter("#password");
                    }
                    // console.log("Empty Field are not allowed");
                    // window.location.href = "./views/MainPage.php";
                } else if (parseData[i] == "nameIncorrect") {

                    let firstname = $("#firstname").val();
                    let lastname = $("#lastname").val();
                    let validLetters = /^[A-Za-z]+$/;

                    if (firstname.match(validLetters)) {
                        $("#first-name-error").remove();
                        $("#firstname")[0].style.setProperty("border", "none");
                        // alert('firname correct');
                    } else {
                        $("#firstname")[0].style.setProperty("border", "5px solid red");
                        $("<div id='first-name-error' style='color: white;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#firstname");
                        // alert('firname incorrect');
                    }
                    if (lastname.match(validLetters)) {
                        // alert('lastname correct');
                        $("#last-name-error").remove();
                        $("#lastname")[0].style.setProperty("border", "none");
                    } else {
                        $("#lastname")[0].style.setProperty("border", "5px solid red");
                        $("<div id='last-name-error' style='color: white;text-align:center;'> Special Characters or numbers are not allowed in names </div>").insertAfter("#lastname");
                        // alert('lastname incorrect');
                    }
                    // console.log("Special Characters are not allowed in names");

                } else if (parseData[i] == "userExists") {
                    $("#username")[0].style.setProperty("border", "5px solid red");
                    $("<div id='user-name-error' style='color: white;text-align:center;'> This username already exists, please use another one </div>").insertAfter("#username");
                    // console.log("This username already exists, please use another one");
                } else if (parseData[i] == "passwordLessThan8") {
                    $("#password")[0].style.setProperty("border", "5px solid red");
                    $("<div id='pass-error' style='color: white;text-align:center;'> Password length cannot be less than 8 </div>").insertAfter("#password");
                    // console.log("Password length cannot be less than 8");
                } else if (parseData[i] == "tryAgain") {
                    alert("Something went wrong!");
                } else if (parseData[i] == "successful") {
                    // add a modal
                    $("#imglink").val("");
                    $("#uploadPreview")[0].src = "./assets/imgs/login.png";
                    $("#firstname").val("");
                    $("#lastname").val("");
                    $("#username").val("");
                    $("#password").val("");

                    alert("User Registered Successfully!");
                    // clearing fields

                    // console.log("User Registered Successfully!");
                }
            }

        },
        error: function(err) {
            alert("Something went wrong! Sorry :(");
        }
    });
});

$('#old-account').on('click', function() {
    // alert("hi");
    $.ajax({
        type: "GET",
        url: "./views/login.php",
        dataType: "html",
        beforeSend: function() {
            //show the loading image
            $('.login-box').html('<div class="ui active dimmer login-register-loader" ><div class = "ui huge text loader" > Loading</div></div>');
        },
        complete: function() {
            //hide the loading image
            $('.login-register-loader').hide();
        },
        success: function(data) {
            $('.login-box').html(data);
            $.getScript("./assets/js/login.js");
        },
        error: function(err) {
            console.log(err);
        }
    });
});