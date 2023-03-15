var intialInstructions = document.getElementById('initialInstructions')
var startButton = document.getElementById('startButton')
var questionContainer = document.getElementById('question-container')
var answerButtons = document.getElementById('answer-buttons')
var timeRemainingBox = document.getElementById('time-remaining')
var correctIncorrectText = document.getElementById('correct-incorrect')
var scoreTextBox = document.getElementById('score-container')
var nameForm = document.getElementById('nameForm')
var submitName = document.getElementById('submitName')
var submitButton = document.getElementById('submitButton')
var timeLeft =60
var score =0
let shuffledQuestions, currentQuestionIndex, timer

startButton.addEventListener('click', startQuiz) //Event Listener starts quiz function on click

function startQuiz() {  //Function sets initial score to 0, starts timer, hides initial html and displays questions
  setScore(score);
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
  startTimer();
  initialInstructions.remove('hide');
}

function setScore(score) {  //Function sets score to intial score of 0
  scoreTextBox.innerText = `Score: ${score}`;
}

function incrementScore() {  //Function increments score by 1 as a question is correct or Boolean true
  score++;
  setScore(score);
}

function startTimer() {  //Function sets parameters for timer
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

function setNextQuestion() {  //Function goes to next question
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {  //Function appends answer buttons and listens for which is clicked
  questionContainer.innerText = question.question  
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  })
}

function resetState() { //Resets answers to go to next question
  clearStatusClass(document.body);
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {  //Function for choosing answers.  A correct answer will display correct.  An incorrect will display incorrect and deduct 10 seconds
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
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
  setTimeout(() => { //Sets a brief delay between questions so the user can see if their selection was correct or incorrect
    correctIncorrectText.innerText = ''
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++;
      setNextQuestion();
      } else {
      endQuiz();
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
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [  //Questions and answers with boolean to determine if answer is correct or incorrect
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

function endQuiz() { //Function to end quiz that stops timer, gives final score, and allows for name submission
  clearInterval(timer);
  questionContainer.innerText = `All done! Your final score is ${score}`;
  answerButtons.remove ('hide');
  nameForm.style.display = "block";
}

submitButton.addEventListener('click', displayHighscore); //Form submit button event listener
var nameSubmission = document.getElementById('nameSubmission')

function displayHighscore (){ //Logs score and puts it into local storage by an array
  var highscoreTable2 = JSON.parse(localStorage.getItem("highscore")) || [];
    let lastScore =  {
    Name: nameSubmission.value,
    Score: score
}
  highscoreTable2.push(lastScore) 
  localStorage.setItem("highscore", JSON.stringify(highscoreTable2));
}