$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        type: "post",
        url: "./loginRegister/register.php",
        data: $('form').serialize(),
        beforeSend: function () {
            $('#Register-btn').html("Registering User").append('<img src="./assets/imgs/login_loader.gif" width="50px" height="50px"></img>');
        },
        complete: function () {
            $('#Register-btn').html('Register');
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
});

$('#old-account').on('click', function () {
    // alert("hi");
    $.ajax({
        type: "GET",
        url: "./views/login.php",
        dataType: "html",
        before: function () {
            //show the loading image
        },
        complete: function () {
            //hide the loading image
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