let viewHighScore = function (){
let lastScore = JSON.parse (localStorage.getItem("score"))
let lastScore2 = document.querySelector(".lastScore2")
lastScore2.innerHTML=lastScore
}
export {viewHighScore}