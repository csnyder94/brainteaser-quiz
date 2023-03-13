let lastScore = JSON.parse(localStorage.getItem("highscore"));  //Pulls score from local storage
let lastScoreJS = document.querySelector(".lastScoreJS"); 
lastScoreJS.innerHTML = '<h2>' + lastScore.Name + " " + lastScore.Score + '</h2>'; //displays name and highscore
var clearButton = document.getElementById('clearHighScores');
var highscoreTable = document.getElementById('highscoreTable');

clearButton.addEventListener('click', clearHighScores); //Event listener to clear highscores

function clearHighScores() { //Resets highscore text and clears local storage scores
    localStorage.clear("score");
    highscoreTable.innerText = 'Highscores:'
}
