$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "./loginRegister/register.php",
        data: $('form').serialize(),
        beforeSend: function () {
            $('#Register-btn').html(`Registering User <div class="ui active inline loader"></div>`);
        },
        complete: function () {
            $('#Register-btn').html('Register');
        },
        success: function (data) {
            // console.log(data);
            console.log('data received');
            if (data == "emptyFields") {
                console.log("Empty Field are not allowed");
                // window.location.href = "./views/MainPage.php";
            } else if (data == "nameIncorrect") {
                console.log("Special Characters are not allowed in names");
            } else if (data == "passwordLessThan8") {
                console.log("Password length cannot be less than 8");
            } else if (data == "userExists") {
                console.log("This username already exists, please use another one");
            } else if (data == "tryAgain") {
                console.log("Something went wrong!");
            } else if (data == "successful") {
                console.log("User Registered Successfully!");
            }
        },
        error: function () {
            console.log("Something went wrong! Sorry :(");
        }
    });
});

$('#old-account').on('click', function () {
    // alert("hi");
    $.ajax({
        type: "GET",
        url: "./views/login.php",
        dataType: "html",
        beforeSend: function () {
            //show the loading image
            $('.login-box').html('<div class="ui active dimmer login-register-loader" ><div class = "ui huge text loader" > Loading</div></div>');
        },
        complete: function () {
            //hide the loading image
            $('.login-register-loader').hide();
        },
        success: function (data) {
            $('.login-box').html(data);
            $.getScript("./assets/js/login.js");
        },
        error: function (err) {
            console.log(err);
        }
    });
});