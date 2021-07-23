/// get Elements from html 
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalscore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
var timeidv = document.getElementById(".timediv");

let shuffledQuestions, currentQuestionIndex
 
startButton.addEventListener('click', startGame)
startButton.addEventListener('click', setTimer)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  
})
var timeleft = 60;
///timer function
function setTimer(){
  var timer = setInterval(function(){
    timeleft--;
    timediv.textContent = timeleft + "seconds left";

    if(timeleft === 0){
      clearInterval(timer);
    }
  }, 1000);
}



///game function
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
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
    question: 'Commonly used data types DO NOT include:',
    answers: [
      { text: '1. Strings', correct: false },
      { text: '2. Booleans', correct: true },
      { text: '3. Alerts', correct: false },
      { text: '4. numbers', correct: false },
    ]
  },
  {
    question: 'The condition in an if / else statement is enclosed within ____.',
    answers: [
      { text: '1. quotes', correct: true },
      { text: '2. curly brackets', correct: true },
      { text: '3. parenthesis', correct: true },
      { text: '4. square brackets', correct: true },
    ]
  },
  {
    question: 'Arrays in javasript can be used to store ______.',
    answers: [
      { text: '1. Numbers and Strings', correct: false },
      { text: '2. other arrays', correct: true },
      { text: '3. booleans', correct: false },
      { text: '4. all of the above', correct: false },
    ]
  },
  {
    question: 'string values must be enclose within ______ when being assigned to variables.',
    answers: [
        { text: '1. commas', correct: false },
        { text: '2. curly brackets', correct: false },
        { text: '3. quotes', correct: false },
        { text: '4. parenthesis', correct: false },
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing contenet to the debugger is: ',
    answers: [
        { text: '1. Javascript', correct: false },
        { text: '2. terminal/bash', correct: false },
        { text: '3. for loops', correct: false },
        { text: '4. console log', correct: false },
    ]
  }
]


//highscores

var Hscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");

// clear.addEventListener("click", function () {
//     localStorage.reload();
// });

var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores !== null) {

    for (var i=0; i< scores.length; i++) {

        var scorelist = document.createElement("list");
        scorelist.textContent = scores[i].initials + " " + scores[i].score;
    }
}

