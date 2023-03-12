var intialInstructions = document.getElementById('initialInstructions')
var startButton = document.getElementById('startButton')
var questionContainer = document.getElementById('question-container')
var answerButtons = document.getElementById('answer-buttons')
var timeRemaining = document.getElementById('time-remaining')
let shuffledQuestions, currentQuestionIndex, timer

startButton.addEventListener('click', startQuiz)

function startQuiz() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainer.classList.remove('hide')
  answerButtons.classList.remove('hide')
  timeRemaining.classList.remove('hide')
  setNextQuestion()
  startTimer()
  initialInstructions.remove('hide')

}

function startTimer() {
  let timeLeft = 5
  timeRemaining.innerText = `Time: ${timeLeft}`
  timer = setInterval(() => {
    timeLeft--
    timeRemaining.innerText = `Time: ${timeLeft}`
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
  clearInterval(timer)
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  setTimeout(() => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++
      setNextQuestion()
      startTimer()
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
        { text: '4', correct: true },
        { text: '22', correct: false },
        { text: 'VI', correct: false },
        { text: '101', correct: false}
      ]
    },
    {
      question: 'What is the capital of North Carolina?',
      answers: [
        { text: 'Raleigh', correct: true },
        { text: 'Charlotte', correct: false },
        { text: 'Mayberry', correct: false },
        { text: 'Greensboro', correct: false }
      ]
    },
    {
      question: 'What is the capial of South Carolina?',
      answers: [
        { text: 'Greenville', correct: false },
        { text: 'Columbia', correct: true },
        { text: 'Spartanburg', correct: false },
        { text: 'Beaufort', correct: false }
        ]
    }
]
    function endQuiz() {
        clearInterval(timer)
        questionContainer.innerText = 'All done! Your final score is UNKNOWN'
        answerButtons.remove ('hide')
        answerButtons.classList.add('hide')
        timeRemaining.classList.add('hide')
        startButton.classList.remove('hide')
      }