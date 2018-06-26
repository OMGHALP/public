
Problem.postOne = callback => {
    $.post('/question')
        .then(results => {
            initProblemPosted
        })
}

Problem.fetchAll = callback => {
    $.get('/problems')
        .then(results => {
            Problem.loadAll(results);
            callback();
        })
};