'use strict'

//  CODE from the constructor is a reserved word.   We're gonna have to fix that at some point.   Specifically, need to change it in the constructor to problemobj.codes AND the table-header in Postgres to codes so that the two line up when pulling problems out of the database.

//  Constructor for New problems
function Problem(problemobj) {
    this.question = problemobj.question,
        this.expectation = problemobj.expectation,
        this.result = problemobj.result,
        this.best_guess = problemobj.best_guess,
        this.codes = problemobj.code,
        this.solved = problemobj.solved,
        this.tag = problemobj.tag
}

// function Problem(problemobj) {
//     this.question = problemobj.problem
//     this.tag = problemobj.tagz
//     this.expectation = problemobj.expected
//     this.result = problemobj.result
//     this.best_guess = problemobj.bestGuess
//     this.codes = problemobj.theCode
// }



Problem.all = [];
Problem.one = {};

function initMainPage() {
    //  Hides the Sections for SPA Compliance
    $("section").hide();
    $('#animal').hide();
    // Hits the dog.ceo API, gets a random dog pic, and renders it to the page

    //Comment In to re-enable AJAX call to see dogs
    $.ajax("https://dog.ceo/api/breeds/image/random")
        .then((results) => {
            $('#animal').attr('src', `${results.message}`);
        })
}

$('#provideHelp').on('click', function () {
    //  User Clicks I'm Here to Help
    // SPA
    $("section").hide();
    $("#animal").hide();
    $("#browseProblems").empty().append("<h2>Previously Submitted Problems</h2>");
    $("#browseProblems").show();

    //Fetches the problems and loads them into Problem.all
    Problem.all = [];
    Problem.fetchAll(hereToHelp)
})

function hereToHelp() {
    Problem.all.forEach(prob => {
        console.log(prob.toHtml())
        $('#browseProblems').append(prob.toHtml())
    })

    //turns on the event listeners to see what was clicked on.
    eventListeners();

}


function eventListeners() {
    $('problem').on('click', '$(.solution)', function (event) {
        event.preventDefault();
        let prob = $(this).parent().find('*')
    })
};

//User clicks on Get Help
$('#getHelp').on('click', function () {
    //  SPA navigation
    // $('#newProblem').empty();
    $("section").hide();
    $('#newProblem').show();
    $("#animal").show();
});

//User clicks the PLZ HALP button
$('#submit').on('click', function (event) {
    event.preventDefault();
    console.log(`you're trying to submit.`)
    Problem.one = new Problem({
        question: $('#problem').val(),
        expectation: $('#expectation').val(),
        result: $('#result').val(),
        best_guess: $('#bestGuess').val(),
        codes: $('#daCodez').val(),
        tag: $('#tags').val(),
    })

    Problem.one.insertRecord();
    console.log('TEST')
    initProblemPosted();
});


function initProblemPosted() {
    //SPA "Navigation"
    $("section").hide();
    $("#animal").hide();
    $("#submitted").show();


    $('#stackoverflow').on('click', function () {
        window.location.href = "https://stackoverflow.com/questions/ask"
    })

    $('#home-page').on('click', function () {
        initMainPage();
    })
}

$(document).ready(initMainPage())

///   This stuff is from Problem Methods... which is currently not referenced in our HTML

Problem.loadAll = (array) => {
    array.forEach(element => {
        Problem.all.push(new Problem(element))
        console.log(element)
    })
}

Problem.prototype.toHtml = function () {
    let template = Handlebars.compile($('#problem-template').text());
    return template(this);
}

