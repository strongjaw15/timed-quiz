let secondsLeft = 90;
let countdown;
let question;
let questionContent;
let questionAnswersList;
let questionAnswers;

const questionBox = document.getElementById("questionBox");
const secondsDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");

// questions[0].answers[i] <-- this is an example of how to navigate through an array of objects

// Make a function to show one question at a time, make a loop to display the answers, put the answers in an array in the array of objects.

let questions = [
  {q1: "How many toes does a fish have?",
    a: 2,
    b: 3,
    c: 10,
    d: 27},
  {q2: "How many wings on a cow?",
    a: 1,
    b: 4,
    c: 5,
    d: 12}
]

// This is the start function, called by clicking the start button.
function start(){
  questionBox.innerHTML="";
  askQuestion();
  startTimer();
}

// This starts the timer.
function startTimer(){
  countdown = setInterval(timer, 200);
}

// This is the timer.
function timer(){
  secondsDisplay.textContent=`${secondsLeft} Seconds Left`;
  secondsLeft--;

  if(secondsLeft < 0){
    clearInterval(countdown);
    secondsDisplay.textContent="";
    secondsLeft = 90;
    sendMessage();
  }
}

// This poses the questions. Needs lots of work.
function askQuestion(){
  question = document.createElement("h3");
  // let questionContent = document.createTextNode(`question`);
  // question.appendChild(questionContent); <-- ^ these are old code, left for reference
  question.textContent = `question`;
  questionBox.appendChild(question);
    questionAnswersList = document.createElement("ol");
    // questionAnswersList.setAttribute("style", "list-style-type: numeric;"); <-- this is for the ol type
    questionBox.appendChild(questionAnswersList);

    // for( var i = 0; i<questionAnswers.length; i++){ <-- this is for looping the line items
      questionAnswers = document.createElement("li");
      questionAnswers.textContent = `asd`;
      questionAnswersList.appendChild(questionAnswers);
    // }
}

// This sends the message at the end of the quiz.
function sendMessage(){
  questionBox.textContent="Congrats, your score is 0!";

}

// This is the event listener for the start button. It initiates the quiz.
startButton.addEventListener("click", start);