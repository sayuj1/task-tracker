function clearSmallDeviceFields() {
  $('.small-device #card-title-sm').val('');
  $('.small-device #card-body').val('');
  $(".small-device #status").val($(".small-device #status option:first").val());
  $('.small-device #card-assigned').val('');
  $('#card-title-sm').characterCounter();
}

function clearLargeDeviceFields() {
  $('.large-device #card-title').val('');
  $('.large-device #card-body').val('');
  $(".large-device #status").val($(".large-device #status option:first").val());
  $('.large-device #card-assigned').val('');
  $('#card-title').characterCounter();
}

// large device card create
$(".large-device").on("submit", function (e) {
  e.preventDefault();
  // alert("reached here");
  $.ajax({
    type: "post",
    url: "../submitUserData/submitTaskData.php",
    data: $(".large-device").serialize(),
    beforeSend: function () {
      // show the loader
    },
    complete: function () {
      // hide the loader
    },
    success: function (data) {
      if (data == "insertionSuccessful") {
        // add a toast message later

        // card create modal
        var elem1 = document.querySelector("#modal1");
        var instance1 = M.Modal.getInstance(elem1);

        // display info message
        var elem3 = document.querySelector("#modal3");
        var instance3 = M.Modal.getInstance(elem3);

        instance3.open();

        $(".ok").on("click", function () {
          // alert("button is pressed");
          clearLargeDeviceFields();
          instance1.close();
        });
      } else if (data == "failed") {
        console.log("Failed to create card! Try again :(");
      } else {
        console.log("error from server side!");
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});

// Small device card create
$(".small-device").on("submit", function (e) {
  e.preventDefault();
  // alert("reached here");
  $.ajax({
    type: "post",
    url: "../submitUserData/submitTaskData.php",
    data: $(".small-device").serialize(),
    beforeSend: function () {
      // show the loader
    },
    complete: function () {
      // hide the loader
    },
    success: function (data) {
      if (data == "insertionSuccessful") {
        // add a toast message later

        // card create modal
        var elem2 = document.querySelector("#modal2");
        var instance2 = M.Modal.getInstance(elem2);

        // display info message
        var elem3 = document.querySelector("#modal3");
        var instance3 = M.Modal.getInstance(elem3);

        instance3.open();

        $(".ok").on("click", function () {
          // alert("button is pressed");
          clearSmallDeviceFields();
          instance2.close();
        });
      } else if (data == "failed") {
        console.log("Failed to create card! Try again :(");
      } else {
        console.log("error from server side!");
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});