$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        type: "post",
        url: "./loginRegister/login.php",
        data: $('form').serialize(),
        beforeSend: function () {
            $('#login-btn').html("Logging In").append('<img src="./assets/imgs/login_loader.gif" width="50px" height="50px"></img>');
        },
        complete: function () {
            $('#login-btn').html('Login');
        },
        success: function (data) {
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
})