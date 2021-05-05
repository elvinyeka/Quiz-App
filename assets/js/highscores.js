//* Get items 

const highScoresList = document.querySelector('#highScoreList'),
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScoresList);

highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");