// To Do:
  // fix my buttons!!!!
  // save the score and itials
    // in my save function I need to:
      // get the score
      // get the questions number
      // get the initials from the input.
      // save them to local storage
  // create second page that displays highscores

let secondsLeft = 60;
let countdown;
let questionText;
let questionContent;
let questionNumber = 0;
let answersList;
let answer;
let chosenAnswer;
let properAnswer;
let correctAnswer;
let scoreValue = 0;
let scorePercentage;
let initials;
let initialsP;
let initialsText;
let submissionButton;
let button;
let savedScores = [];

const main = document.querySelector("main");
const questionBox = document.getElementById("questionBox");
const secondsDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const scoresButton = document.getElementById("scoresButton")
const formBox = document.getElementById("initialsBox");

startButton.setAttribute("class", "start");
scoresButton.setAttribute("class", "scores");


// questions[0].answers[i] <-- this is an example of how to navigate through an array of objects

// Make a function to show one question at a time, make a loop to display the answers, put the answers in an array in the array of objects.

let questions = [
  {question: "How many toes does a fish have?",
    answers: ["0 toes", "3", "10", "27"],
    correctAnswer: "0 toes"},
  {question: "How many wings on a cow?",
    answers: ["0 wings", "4", "5", "12"],
    correctAnswer: "0 wings"}
]

// This starts the quiz.
function start(){
  countdown = setInterval(timer, 1000);

  // This sets the scoreValue at the beginning of the quiz.
  scoreValue = 0;

  // This clears out the end of quiz stuff.
  questionBox.innerHTML=""
}

// This is the timer. It also has the ask question function nesting in it so that the first question shows up at the same time as the timer.
function timer(){
  if(secondsLeft === 60){
    askQuestion();
    hideStartButton();
  }

  secondsDisplay.textContent=`${secondsLeft} Seconds Left`;
  secondsLeft--;

  // This clears the timer and goes to the dialogue at the end of the quiz.
  if(secondsLeft < 0 || questionNumber === questions.length){
    clearInterval(countdown);
    secondsDisplay.textContent="";
    secondsLeft = 60;
    sendMessage();
  }
}

// These functions hide and show the start button.
function hideStartButton(){
  startButton.setAttribute("style", "display: none");
}

function showStartButton(){
  startButton.setAttribute("style", "display: block")
}

// This poses the questions.
function askQuestion(){
  
  // This creates the question text.
  questionText = document.createElement("h3");
  questionText.textContent = `${questions[questionNumber].question}`;
  questionBox.appendChild(questionText);

    // This creates the list paragraph for the answers to sit in.
    answersList = document.createElement("p");
    answersList.setAttribute("style", "display: flex; flex-direction: column; align-items: center; gap: 0.5em");
    questionBox.appendChild(answersList);

      // This creates and populates the buttons with the multiple choice answers, using a for loop.
      for(var i = 0; i < 4; i++){
        answerButton = document.createElement("button");
        answerButton.setAttribute("style", "width: 12em");
        answerButton.setAttribute("class", "answer");
        answerButton.textContent = `${questions[questionNumber].answers[i]}`;
        answersList.appendChild(answerButton);

      }
  // This sets the correct answer up for comparison with the chosen answer in the tallyScore function.
  properAnswer = questions[questionNumber].correctAnswer
}

// This advances to the next question, activated by event listener on the answer buttons.
function advanceQuestion(){
  questionBox.innerHTML = "";

  if(questionNumber < questions.length){
    askQuestion()}
}

function tallyScore(){
  if(chosenAnswer === properAnswer){
    scoreValue++
  }  

  // This penalizes a wrong answer by taking time off the clock.
  else {
    secondsLeft = secondsLeft-5
  }
}

// This sends the message at the end of the quiz.
function sendMessage(){

  // This sets the score value to a percentage and displays it.
  x = scoreValue;
  y = questions.length;
  z = x/y;
  scorePercentage = z*100;
  questionBox.textContent=`Congrats, your score is ${scorePercentage}%!`;

  // This creates the submission text.
  initialsP = document.createElement("p");
  initialsP.textContent = "Please enter your initials and save your score.";
  formBox.appendChild(initialsP);

  // This creates the input field for saving the score.
  initials = document.createElement("input");
  initials.setAttribute("type", "text");
  initials.setAttribute("placeholder", "INITIALS");
  initials.setAttribute("id", "getMeForSave")
  initials.setAttribute("style", "text-align: center");
  formBox.appendChild(initials);

  // This creates the submission button.
  submissionButton = document.createElement("button");
  submissionButton.setAttribute("class", "save");
  submissionButton.textContent = `SAVE`;
  formBox.appendChild(submissionButton);
}

// This saves the score and initials to local storage.
function saveScore(){

  // This fetches the saved scores and objectifies them.
  // savedScores = localStorage.getItem("scores");
  // JSON.parse(savedScores);

  // This puts the latest initials and score into an object.
  let newObject = {
    initials: `${initialsText}:`,
    score: `${scorePercentage}%`
  }
  savedScores.push(newObject);

  // This stringifies the saves scores and sends them to local storage.
  let stringed = JSON.stringify(savedScores);
  localStorage.setItem("scores", stringed)
}

// This is the event listener for the buttons.
main.addEventListener("click", function(event){
  
  // This is for the start button.
  if(event.target.matches("button.start")){
    start()
  }
  
  // This is for the answer buttons.
  else if(event.target.matches("button.answer")){
    chosenAnswer = event.target.firstChild.data;
    questionNumber++;
    tallyScore();
    advanceQuestion();
  }
  
  // This is for the save button.
  else if(event.target.matches("button.save")){
    event.preventDefault();
    initialsText = document.getElementById("getMeForSave").value;
    saveScore();
  }
});

// This is the event listener for the start button. It initiates the quiz.
// startButton.addEventListener("click", start);

// This is the event listener for the save button.
// formBox.addEventListener("click", save);