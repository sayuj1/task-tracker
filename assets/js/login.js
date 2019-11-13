$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "./loginRegister/login.php",
        data: $('form').serialize(),
        beforeSend: function () {
            $('#login-btn').html(`Logging In <div class="ui active inline loader"></div>`);
        },
        complete: function () {
            $('#login-btn').html('Login');
        },
        success: function (data) {
            // console.log(data);
            console.log('data received');
            if (data == "ValidCredentials") {
                // console.log(data);

                // clearing field values after successful submission
                $("#username").val('');
                $("#password").val('');

                // if error messages are present then clear them
                if ($("#user-error").length) {
                    $("#user-error").remove();
                    $("#username")[0].style.setProperty("border", "none");
                }
                if ($("#pass-error").length) {
                    $("#pass-error").remove();
                    $("#password")[0].style.setProperty("border", "none");
                }

                window.location.href = "./views/MainPage.php";
            } else if (data == "InvalidUsername") {
                // showing error
                if ($("#user-error").length) {
                    // console.log('present already');
                    // add a toast message
                } else {
                    $("#pass-error").remove();
                    $("#password")[0].style.setProperty("border", "none");
                    $("<div id='user-error' style='color: white;text-align:center;'> Username Does not Exists </div>").insertAfter("#username");
                    $("#username")[0].style.setProperty("border", "5px solid red");
                    $("#password").val('');
                }
                console.log("Username does not exists");

            } else if (data == "InvalidPassword") {
                // removing username error

                if ($("#pass-error").length) {
                    // console.log('present already');
                    // add a toast message
                } else {
                    $("#user-error").remove();
                    $("#username")[0].style.setProperty("border", "none");

                    $("<div id='pass-error' style='color: white;text-align:center;'> Your password is not valid </div>").insertAfter("#password");
                    $("#password")[0].style.setProperty("border", "5px solid red");
                    $("#password").val('');
                }
                console.log("Invalid Password");
            } else {
                console.log("Something went wrong! Sorry :(");
            }
        },
        error: function () {
            console.log("Something went wrong! Sorry :(");
        }
    });
});

$('#new-account').on('click', function () {
    // alert("hi");
    $.ajax({
        type: "GET",
        url: "./views/register.php",
        dataType: 'html',
        beforeSend: function () {
            //show the loading image
            $('.login-box').html('<div class="ui active dimmer login-register-loader" ><div class = "ui huge text loader" > Loading</div></div>');
        },
        complete: function () {
            //hide the loading image
            $('.login-register-loader').hide();
        },
        success: function (data) {
            // $('#login-box').load('./views/register.php');
            $('.login-box').html(data);
            $.getScript("./assets/js/register.js");
        },
        error: function (err) {
            console.log(err);
        }
    });
});