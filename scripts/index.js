'use strict'


//User clicks on Get Help
$('#getHelp').on('click', function () {
    //  SPA navigation
    $("section").hide();
    $('#newProblem').show();


    //Hits the dog.ceo API, gets a random dog pic, and renders it to the page
    // var getdog = $.ajax("https://dog.ceo/api/breeds/image/random");
    // doggo = getdog.responseJSON.message;   //  Need to ask a TA at some point why getdog.responseJSON is undefined, when it shows up in the console.
    // $('#animal').attr('src', `${doggo}`);

    //User clicks the PLZ HALP button
    $("#submit").on('click', function (event) {
        event.preventDefault
        let $problem = $('#problem?').text()
        debugger

    })
})



//https://stackoverflow.com/questions/ask