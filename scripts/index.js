'use strict'

//  Constructor for New problems
function Problem(problemobj) {
    this.problem = problemobj.problem
    this.expected = problemobj.expected
    this.result = problemobj.result
    this.bestGuess = problemobj.bestGuess
    this.theCode = problemobj.theCode
    this.tagz = problemobj.tagz
}

Problem.all = [];
Problem.one = {};

function initMainPage() {
    //  Hides the Sections for SPA Compliance
    $("section").hide();

    // Hits the dog.ceo API, gets a random dog pic, and renders it to the page
    $.ajax("https:///api/breeds/image/random")
    .then((results) => {
        $('#animal').attr('src', `${results.message}`);
    })
}

function initBrowsePage () {
    // SPA
    $("section").hide();
    $("#browseProblems#").empty();
    $("#browseProblems#").show();

    Problem.fetchAll();
    Problem.all.forEach(prob => $('#browseProblems').append(prob.toHtml()));
}

//User clicks on Get Help
$('#getHelp').on('click', function () {
    //  SPA navigation
    $("section").hide();
    $('#newProblem').show();
    $("#animal").show();
});


//User clicks the PLZ HALP button
$('#submit').on('click', function (event) {
    event.preventDefault();
    Problem.one = new Problem({
        problem: $('#problem').text(),
        expected: $('#expectation').text(),
        result: $('#result').text(),
        bestGuess: $('#bestGuess').text(),
        theCode: $('#daCodez').text(),
        tagz: $('#tagz').text()
    });

    initProblemPosted();
});

function initProblemPosted() {
    //SPA "Navigation"
    $("section").hide();
    $("#animal").hide();
    $("#submitted").show();


    //  Build out page in HTML with an ID of Submitted.  No idea dog image, an option to go to Stack Overflow, and JS for a random No Can Halp line out of Rosie's list.
    // window.location.href = "https://stackoverflow.com/questions/ask"

}


$('#provideHelp').on('click', function () {
    //  SPA navigation
    $("section").hide();
    $("#animal").hide();
    $('#browseProblems').show();


});















$(document).ready(initMainPage())