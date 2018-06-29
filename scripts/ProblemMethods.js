'use strict'

Problem.prototype.toHtml = function () {
    let template = Handlebars.compile($('#problem-template').text());
    return template(this);
}



