let secondsLeft = 90;
let countdown;
let secondsDisplay = document.getElementsByTagName("h2");
let startButton = document.getElementById("startButton")

// This is the start function, called by clicking the start button.
function start(){
  // askQuestion();
  startTimer;
  console.log("hi");
}

// This starts the timer.
function startTimer(){
  countdown = setInterval(timer, 1000);
}

// This is the timer.
function timer(){
  secondsLeft--;
  secondsDisplay.textContent="seconds left";

  if(secondsLeft === 0){
    clearInterval(countdown);
    // sendMessage();
  }
}

// This poses each question.
function askQuestion(){

}

// This sends the message at the end of the quiz.
function sendMessage(){

}

// This is the event listener for the start button. It initiates the quiz.
startButton.addEventListener("click", start);