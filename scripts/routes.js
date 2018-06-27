'use strict'

Problem.prototype.insertRecord = function (callback) {
    $.post('http://127.0.0.1:3000/question', {
        question: this.question,
        tag: this.tag,
        expectation: this.expectation,
        result: this.result,
        best_guess: this.best_guess,
        code: this.code,
    })
        .then(console.log("working?"))
        .then(callback);
}

Problem.fetchAll = callback => {
    $.get('http://127.0.0.1:3000/problem')
        .then(results => {
            Problem.loadAll(results);
            callback();
        })
};

Problem.solve = callback => {
    $.put('http://127.0.0.1:3000/solutions')
        .then(
            console.log('trollololol')
        )
}

// Problem.delete = callback => {
//     $.ajax shit
//         .then(
//             "stuff"
//         )
// }