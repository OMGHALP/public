'use strict'

//  CODE from the constructor is a reserved word.   We're gonna have to fix that at some point.   Specifically, need to change it in the constructor to problemobj.codes AND the table-header in Postgres to codes so that the two line up when pulling problems out of the database.  Ditto with the object literal currently at line 63

//  Constructor for New problems
function Problem(problemobj) {
    this.question = problemobj.question,
        this.expectation = problemobj.expectation,
        this.result = problemobj.result,
        this.best_guess = problemobj.best_guess,
        this.codes = problemobj.code,
        this.solved = problemobj.solved,
        this.tag = problemobj.tag,
        this.id = problemobj.problem_id
    
}

Problem.all = [];
Problem.one = {};

function initMainPage() {
    //  Hides the Sections for SPA Compliance
    $("section").hide();
    $('#animal').hide();
    $('#treadmillgif').show();
 
    // Hits the dog.ceo API, gets a random dog pic, and renders it to the page
    $.ajax("https://dog.ceo/api/breeds/image/random")
        .then((results) => {
            $('#animal').attr('src', `${results.message}`);
        })
}

$('#provideHelp').on('click', function () {
    //  User Clicks I'm Here to Help
    // SPA
    $('#treadmillgif').hide();
    $("section").hide();
    $("#animal").hide();
    $("#browseProblems").empty().append("<h2>Previously Submitted Problems</h2>");
    $("#browseProblems").show();

    //Fetches the problems and loads them into Problem.all  Then automatically calls hereToHelp once Problem.all is loaded with problem objects
    Problem.all = [];
    Problem.fetchAll(hereToHelp)
})

function hereToHelp() {
    Problem.all.forEach(prob => {
        $('#browseProblems').append(prob.toHtml())
    })

    //turns on the event listeners to see which of the problems was clicked on.
    $('problem button').on('click', function (event) {
        event.preventDefault();

        //Builds out a Problem object from data harvested off the page.  The object is passed through the constructor so that it can inherit the PUT prototype, and is assigned to Problem.one
        let prob = $(this).parent().find('*');
        Problem.one = new Problem({
            question: prob[1].innerText,
            expectation: prob[6].innerText,
            result: prob[8].innerText,
            best_guess: prob[10].innerText,
            code: prob[4].innerText,
            solved: prob[12].innerText,
            tag: `ans`,
            problem_id: prob[0].id
        });

        //Now that we have our problem object, it's time to "leave" this page and head for the edit the problem page

        goSolveProblem()
    })
}

function goSolveProblem() {
    //Standard SPA stuff
    $("section").hide();
    $("#submit").hide();
    $('textarea').empty();
    $('#newProblem').show();
    $("#reply").show();
    $('#edit').show();
    
    //Pre-populate the form with previous answers
    $("#problem").val(Problem.one.question);
    $("#expectation").val(Problem.one.expectation);
    $("#result").val(Problem.one.result);
    $("#bestGuess").val(Problem.one.best_guess);
    $("#theCode").val(Problem.one.code);
    $("#reply").val(Problem.one.solved);
    $("#tags").val(Problem.one.tag);   
}

//User clicks on Get Help
$('#getHelp').on('click', function () {
    //  SPA navigation
    // $('#newProblem').empty();
    $("section").hide();
    $('#newProblem').show();
    $("#animal").show();
    $("#reply").hide();
    $('#treadmillgif').hide();
    $('#edit').hide();
});

//User clicks the PLZ HALP button
$('#submit').on('click', function (event) {
    event.preventDefault();
    Problem.one = new Problem({
        question: $('#problem').val(),
        expectation: $('#expectation').val(),
        result: $('#result').val(),
        best_guess: $('#bestGuess').val(),
        codes: $('#daCodez').val(),
        tag: $('#tags').val(),
    })

    Problem.one.insertRecord();
    initProblemPosted();
});


function initProblemPosted() {
    //SPA "Navigation"
    $("section").hide();
    $("#animal").hide();
    $("#submitted").show();

    $('#home-page').on('click', function () {
        initMainPage();
    })
}

$('#edit').on('click', function () {
    event.preventDefault();
    Problem.one = new Problem({
        question: $('#problem').val(),
        expectation: $('#expectation').val(),
        result: $('#result').val(),
        best_guess: $('#bestGuess').val(),
        codes: $('#daCodez').val(),
        tag: $('#tags').val(),
    })

    Problem.one.insertRecord();
    initProblemPosted();
})
    
$(document).ready(initMainPage())

///   This stuff is from Problem Methods... which is currently not referenced in our HTML

Problem.loadAll = (array) => {
    array.forEach(element => {
        Problem.all.push(new Problem(element))
    })
}

Problem.prototype.toHtml = function () {
    let template = Handlebars.compile($('#problem-template').text());
    return template(this);
}