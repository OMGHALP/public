'use strict'

//  Constructor for New problems
function Problem(problemobj) {
    this.question = problemobj.problem
    this.tag = problemobj.tagz
    this.expectation = problemobj.expected
    this.result = problemobj.result
    this.best_guess = problemobj.bestGuess
    this.code = problemobj.theCode
    this.result = problemobj.result
}

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
    $("#browseProblems").empty();
    $("#browseProblems").show();

    //Fetches the problems and loads them into Problem.all
    Problem.all = [];
    Problem.fetchAll();

    Problem.all.forEach(prob => $('#browseProblems').append(prob.toHtml()));

    //turns on the event listeners to see what was clicked on.
    eventListeners();

})

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
        problem: $('#problem').val(),
        tagz: $('#tags').val(),
        expected: $('#expectation').val(),
        result: $('#result').val(),
        bestGuess: $('#bestGuess').val(),
        theCode: $('#daCodez').val(),
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


    $('#stack-overflow').on('click', function () {
        window.location.href = "https://stackoverflow.com/questions/ask"
    })

    $('#home-page').on('click', function () {
        initMainPage();
    })


}


$('#provideHelp').on('click', function () {
    //  SPA navigation
    $("section").hide();
    $("#animal").hide();
    $('#browseProblems').show();


});





$(document).ready(initMainPage())





///   This stuff is from Problem Methods... which is currently not referenced in our HTML

Problem.loadAll = (array) => {
    array.forEach(element => Problem.all.push(new Problem(element)))
}