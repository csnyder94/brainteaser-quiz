import {viewHighScore} from "./highscores.mjs";
var intialInstructions = document.getElementById('initialInstructions')
var startButton = document.getElementById('startButton')
var questionContainer = document.getElementById('question-container')
var answerButtons = document.getElementById('answer-buttons')
var timeRemainingBox = document.getElementById('time-remaining')
var timeLeft =60
var correctIncorrectText = document.getElementById('correct-incorrect')
var score =0
var scoreTextBox = document.getElementById('score-container')
var nameForm = document.getElementById('nameForm')
var submitName = document.getElementById('submitName')
var button3 = document.getElementById('button3')
let shuffledQuestions, currentQuestionIndex, timer

startButton.addEventListener('click', startQuiz)

function startQuiz() {
  setScore(score)
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainer.classList.remove('hide')
  answerButtons.classList.remove('hide')
  timeRemainingBox.classList.remove('hide')
  setNextQuestion()
  startTimer()
  initialInstructions.remove('hide')

}
function setScore(score) {
  scoreTextBox.innerText = `Score: ${score}`
}
function incrementScore() {
  score++
  setScore(score)
}

function startTimer() {
  console.log("startTimer")
  // let timeLeft = 60
  timeRemainingBox.innerText = `Time: ${timeLeft}`
  timer = setInterval(() => {
    timeLeft--
    timeRemainingBox.innerText = `Time: ${timeLeft}`
    if (timeLeft === 0) {
      clearInterval(timer)
      endQuiz()
       
    }
  }, 1000)
}

function setNextQuestion() {
  resetState()
  
  showQuestion(shuffledQuestions[currentQuestionIndex])
  
}

function showQuestion(question) {
  questionContainer.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtons.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(correct) { correctIncorrectText.innerText = 'Correct'
    incrementScore()
    } else  {
      timeLeft -= 10;
      correctIncorrectText.innerText = 'Incorrect'
    }
  setTimeout(() => {
    correctIncorrectText.innerText = ''
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++
      setNextQuestion()
      } else {
      endQuiz()
    }
  }, 1000)
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: 'A. 4', correct: true },
        { text: 'B. 22', correct: false },
        { text: 'C. VI', correct: false },
        { text: 'D. 101', correct: false}
      ]
    },
    {
      question: 'What is the capital of North Carolina?',
      answers: [
        { text: 'A. Raleigh', correct: true },
        { text: 'B. Charlotte', correct: false },
        { text: 'C. Mayberry', correct: false },
        { text: 'D. Greensboro', correct: false }
      ]
    },
    {
      question: 'What is the capital of South Carolina?',
      answers: [
        { text: 'A. Greenville', correct: false },
        { text: 'B. Columbia', correct: true },
        { text: 'C. Spartanburg', correct: false },
        { text: 'D. Beaufort', correct: false }
        ]
    },
    {
      question: 'How many minutes are in a full week?',
      answers: [
        { text: 'A. 7,200', correct: false },
        { text: 'B. 10,800', correct: true },
        { text: 'C. 6,480', correct: false },
        { text: 'D. 168', correct: false }
        ]
    },
    {
      question: 'What planet has the most moons?',
      answers: [
        { text: 'A. Earth', correct: false },
        { text: 'B. Jupiter', correct: false },
        { text: 'C. Saturn', correct: true },
        { text: 'D. Venus', correct: false }
        ]
    }
]
    function endQuiz() {
        clearInterval(timer)
        
        questionContainer.innerText = `All done! Your final score is ${score}`
        answerButtons.remove ('hide')
        answerButtons.classList.add('hide')
        timeRemainingBox.classList.add('hide')
        startButton.classList.remove('hide')
        nameForm.style.display = "block"
}
button3.addEventListener('click', displayHighscore)

function displayHighscore (){
  score.textContent = score
  localStorage.setItem("score", score )
  console.log (score)
  viewHighScore()
}
         
        

