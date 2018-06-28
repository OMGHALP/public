'use strict'

//   Local URL  http://127.0.0.1:3000
//   Heroku URL  https://omg-halp-project.herokuapp.com
Problem.prototype.insertRecord = function (callback) {
    $.post('http://127.0.0.1:3000/question', {
        question: this.question,
        tag: this.tag,
        expectation: this.expectation,
        result: this.result,
        best_guess: this.best_guess,
        code: this.code,
    })
        .then(console.log)
        .then(callback);
}

Problem.fetchAll = callback => {
    $.get('http://127.0.0.1:3000/problem')
        .then(results => {
            Problem.loadAll(results);
            callback();
        })
};

Problem.prototype.updateRecord = function (callback) {
    console.log(this)
    $.ajax
        ({
            url: `http://127.0.0.1:3000/solution`,
            method: 'PUT',
            data: {
                question: this.question,
                tag: this.tag,
                expectation: this.expectation,
                best_guess: this.best_guess,
                code: this.code,
                result: this.result,
                problem_id: this.id
            }
    })
        .then(console.log)
        .then(callback);
}
