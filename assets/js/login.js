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
                console.log(data);
                window.location.href = "./views/MainPage.php";
            } else if (data == "InvalidUsername") {

                console.log("Invalid Username");

            } else if (data == "InvalidPassword") {
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