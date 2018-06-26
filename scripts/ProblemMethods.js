'use strict'

Problem.loadAll = (array) => {
    array.forEach(element => Problem.all.push(new Problem(element)))
}

Problem.prototype.toHtml = function () {
    var template = Handlebars.compile($('#problem-template').text());
    return template(this);
}
