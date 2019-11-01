$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "./loginRegister/login.php",
        data: $('form').serialize(),
        beforeSend: function () {
            $('#login-btn').html("Logging In").append('<img src="./assets/imgs/login_loader.gif" width="50px" height="50px"></img>');
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
        before: function () {
            //show the loading image
        },
        complete: function () {
            //hide the loading image
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