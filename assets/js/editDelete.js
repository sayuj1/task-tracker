// for removing the card from the DOM
function removeCard(card_id) {

    $('div[id=' + card_id + ']').remove();
}


// for editing the card
function editCard(card_id) {
    console.log("id received" + card_id);

    // add functionality below
}

// for updating the total card values
function updateTotalCardValues() {
    let count = $("#total-cards-value").val();
    count = Number(count) - 1;
    // alert(count);
    $(".total-card-value-holder").html(count);
    $(".total-card-value-holder").append(
        `<input type="hidden" value=` + count + ` id="total-cards-value">`
    );
}

// for deleting the card
function deleteCard(card_id) {
    console.log("id received" + card_id);
    $.ajax({
        type: "post",
        url: "../editDelete/deleteCard.php",
        data: {
            cardID: card_id
        },
        beforeSend: function () {
            // add the loader later
        },
        complete: function () {
            // add the loader later
        },
        success: function (data) {

            console.log('it is working');
            console.log(data);
            if (data == 'successful') {
                // call a function to remove the card from the page
                removeCard(card_id);
                console.log('deleted');
                // call a modal to show the deletion information
                // display info message
                var deleteModal = document.querySelector("#modal4");
                var deleteInstance = M.Modal.getInstance(deleteModal);

                deleteInstance.open();

                // updating the total count value
                updateTotalCardValues();

            } else if (data == 'failed') {
                // add a modal to show the message
                console.log('fail to delete the card! Please try again');
            }
        },
        error: function (err) {
            console.log("Not successful");
        }
    });
    // add functionality below
}