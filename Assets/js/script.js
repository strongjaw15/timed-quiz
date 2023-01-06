// To Do:
  // determine if a right answer has been selected
  // tally the score
  // stop the timer if all questions are asnwered
  // create a form to input user initials
  // save the score and itials
  // create second page that displays highscores

let secondsLeft = 90;
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

const questionBox = document.getElementById("questionBox");
const secondsDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");

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
  scoreValue = 0
}

// This is the timer. It also has the ask question function nesting in it so that the first question shows up at the same time as the timer.
function timer(){
  if(secondsLeft === 90){
    askQuestion();
    hideStartButton();
  }

  secondsDisplay.textContent=`${secondsLeft} Seconds Left`;
  secondsLeft--;

  if(secondsLeft < 0){
    clearInterval(countdown);
    secondsDisplay.textContent="";
    secondsLeft = 90;
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
        answerButton.textContent = `${questions[questionNumber].answers[i]}`;
        answersList.appendChild(answerButton);

      }
  // This sets the correct answer up for comparison with the chosen answer in the tallyScore function.
  properAnswer = questions[questionNumber].correctAnswer
}

// This advances to the next question, activated by event listener on the answer buttons.
function advanceQuestion(){
  questionBox.innerHTML = "";

  if(questionNumber < questions.length - 1){
    questionNumber++;
    askQuestion()}
  else{
    sendMessage()
  }
}

function tallyScore(){

  console.log("chosen answer: " + chosenAnswer)
  console.log("proper answer: " + properAnswer)

  if(chosenAnswer === properAnswer){ // <-- This isn't working yet.
    scoreValue++
  }  

  console.log("score value " + scoreValue)
}

// This sends the message at the end of the quiz.
function sendMessage(){
  questionBox.textContent=`Congrats, your score is ${scoreValue}/${questions.length}!`;

}

// This is the event listener for the start button. It initiates the quiz.
startButton.addEventListener("click", start);

// This is the event listener for the answer buttons.
questionBox.addEventListener("click", function(event){
  if(event.target.matches("button")){
    chosenAnswer = event.target.firstChild.data;
    tallyScore();
    advanceQuestion();
    console.log("button clicked " + event.target.firstChild.data)
  }
})