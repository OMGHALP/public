'use strict'

Problem.prototype.toHtml = function () {
    let template = Handlebars.compile($('#problem-template').text());
    return template(this);
}

let dogPuns = [
"Well that sounds like some ruff stuff",
"Have you tried chasing a squirrel?",
"Eating always makes me feel better",
"I would throw you a bone...but I ate mine",
"I do my best thinking when I'm playing catch",
"The best way to solve that is...SQUIRREL!",
"How about a walk? I LOVE walks!",
"Why you askin' me dawg?",
"Just tell your boss I ate your code",
"You're a sly dog, bet you can crack this in no time!",
"Try as I mutt, I cannot help you",
"I guess the leash I could do is look cute",
"You will find the solution when you leash expect it!",
"I would tell you a dog pun...but they are all corgi",
""
];

