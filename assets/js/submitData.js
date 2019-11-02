$(".large-device").on("submit", function(e) {
  e.preventDefault();
  // alert("reached here");
  $.ajax({
    type: "post",
    url: "../submitUserData/submitTaskData.php",
    data: $(".large-device").serialize(),
    beforeSend: function() {
      // show the loader
    },
    complete: function() {
      // hide the loader
    },
    success: function(data) {
      if (data == "insertionSuccessful") {
        // add a toast message later

        // card create modal
        var elem1 = document.querySelector("#modal1");
        var instance1 = M.Modal.getInstance(elem1);

        // display info message
        var elem3 = document.querySelector("#modal3");
        var instance3 = M.Modal.getInstance(elem3);

        instance3.open();
        //before closing the modal reset the card value;
        $(".ok").on("click", function() {
          // alert("button is pressed");
          instance1.close();
        });
      } else if (data == "failed") {
        console.log("Failed to create card! Try again :(");
      } else {
        console.log("error from server side!");
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
});
