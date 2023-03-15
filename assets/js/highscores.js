let lastScore = JSON.parse(localStorage.getItem("highscore"));  //Pulls score from local storage as an array

let lastScoreJS = document.querySelector(".lastScoreJS");

lastScore.forEach(score => {
    var scoreH2 = document.createElement('h2');
    scoreH2.textContent = `Name: ${score.Name}, Score: ${score.Score}`;
    lastScoreJS.append(scoreH2);
}); 

var clearButton = document.getElementById('clearHighScores');
var highscoreTable = document.getElementById('highscoreTable');

clearButton.addEventListener('click', clearHighScores); //Event listener to clear highscores

function clearHighScores() { //Resets highscore text and clears local storage scores
    localStorage.clear("score");
    highscoreTable.innerText = 'Highscores:'
}
