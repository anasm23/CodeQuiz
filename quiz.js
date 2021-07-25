/// get Elements from html 
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
var timeidv = document.getElementById(".timediv");
var score = 0;
var timeleft = 60;
var countscore = document.querySelector(".score");




console.log(countscore);
let shuffledQuestions, currentQuestionIndex
console.log(window.localStorage);

/// onclick functions to start game and timer. 
startButton.addEventListener('click', startGame);
startButton.addEventListener('click', setTimer);
nextButton.addEventListener('click', () => {
  // if(questions.answer === true){
  //   core++;
  //     countscore.textContent = "Score: " + score;
  //     currentQuestionIndex++
  // setNextQuestion()
  // }
  // else if (questions.answer === false);{
  //   score--;
  //   countscore.textContent = "Score: " + score;
  //   currentQuestionIndex++
  // setNextQuestion()
  // }
    do{
      score++;
      countscore.textContent = "Score: " + score;
      currentQuestionIndex++
  setNextQuestion()
    }
    while(questions.answer === true );
  if (questions.answer === false){
    score--;
    countscore.textContent = "Score: " + score;
    currentQuestionIndex++
  setNextQuestion()
  }
})

function addsc(){
  do{
    score++
    countscore.textContent = "Score: " + score;
    currentQuestionIndex++
setNextQuestion()
  }
  while(questions.answer === true );
}
function subscore(){
  if (questions.answer === false){
    score--;
    countscore.textContent = "Score: " + score;
    currentQuestionIndex++
  setNextQuestion()
  }
  else {
    addsc();
  }
}
///timer function
function setTimer(){
  var timer = setInterval(function(){
    timeleft--;
    timediv.textContent = timeleft + " seconds left";

    if(timeleft === 0){
      clearInterval(timer);
    }
  }, 1000);
}

///local storage
var count = localStorage.getItem("count");

/// score counter
var countscore = document.querySelector(".score");
// function addscore(){
//   if (questions.answer === true){
//   score++
//   countscore.textContent = "Score: " + score;
//   }
//   else{
//     score--;
//     countscore.textContent = "Score: " + score;
//   }
// }

// function incscore(){
// if(answer.correct === true) {
//   countscore++;
//   countscore.textContent = "Score:" + score ;
// }

// console.log(countscore);




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
      { text: '1. quotes', correct: false },
      { text: '2. curly brackets', correct: false},
      { text: '3. parenthesis', correct: false},
      { text: '4. all of the above', correct: true },
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
        { text: '4. parenthesis', correct: true },
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing contenet to the debugger is: ',
    answers: [
        { text: '1. Javascript', correct: false },
        { text: '2. terminal/bash', correct: false },
        { text: '3. for loops', correct: false },
        { text: '4. console log', correct: true },
    ]
  }
]

