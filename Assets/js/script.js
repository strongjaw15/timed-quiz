let secondsLeft = 91;
let countdown;
let secondsDisplay = document.getElementById("timer");
let startButton = document.getElementById("startButton");

// This is the start function, called by clicking the start button.
function start(){
  // askQuestion();
  startTimer();
}

// This starts the timer.
function startTimer(){
  countdown = setInterval(timer(), 1000);
}

// This is the timer.
function timer(){
  secondsLeft--;
  secondsDisplay.textContent=`${secondsLeft} Seconds Left`;

  if(secondsLeft === 0){
    clearInterval(countdown);
    // sendMessage();
    console.log("timer started");
  }
}

// This poses each question.
function askQuestion(){

}

// This sends the message at the end of the quiz.
function sendMessage(){

}

// This is the event listener for the start button. It initiates the quiz.
startButton.addEventListener("click", start());