//* Get elements  

const username = document.querySelector('#username'),
    saveSoreBtn = document.querySelector('#saveScoreBtn'),
    finalScore = document.querySelector('#finalScore'),
    mostResentScore = localStorage.getItem('mostResentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostResentScore;

username.addEventListener('keyup', () => {
    saveSoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
    e.preventDefault();

    const score = {
        score: mostResentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a, b) => {
        return a - b;
    });

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
}