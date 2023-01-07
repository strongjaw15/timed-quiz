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

let questions = [
  {question: "How many toes does a fish have?",
    answers: ["0", "3", "10", "27"],
    correctAnswer: "0"},
  {question: "How many wings on a cow?",
    answers: ["0", "4", "5", "12"],
    correctAnswer: "0"},
  {question: "How old was George Washington when the first Bald Eagle was born from a golden egg forged by Ben Franklin and the egyptian gods?",
    answers: ["5", "7", "11", "37", "George Washington wasn't alive yet when the first Bald Eagle was discovered."],
    correctAnswer: "George Washington wasn't alive yet when the first Bald Eagle was discovered."},
  {question: "How do you spell cheh-kuh-sluh-vaa-kee-uh?",
    answers: ["Checkoslovakia", "Czechoslovakia", "Zcekosluvackia", "Chechkuhslaavokia"],
    correctAnswer: "Czechoslovakia"},
  {question: "How many times does the sun set on the traveler's journey in Around the World in Eighty Days?",
    answers: ["79", "80", "81", "82"],
    correctAnswer: "81"},
  {question: "WHo worte the first logarithm?",
    answers: ["Charles Darwin", "John Napier", "Robert Boyle", "Isaac Newton"],
    correctAnswer: "John Napier"},
  {question: "When did plate tectonics theory become commonly accepted?",
    answers: ["1910s", "1940s", "1960s", "1980s"],
    correctAnswer: "1960s"},
]

// This starts the quiz.
function start(){
  countdown = setInterval(timer, 1000);

  // This sets the scoreValue and questionNumber at the beginning of the quiz.
  scoreValue = 0;
  questionNumber = 0;

  // This clears out the show scores stuff if it's there.
  questionBox.innerHTML=""
  formBox.innerHTML=""

  // This hides the other buttons.
  hideScoresButton();
  hideStartButton();
}

// This is the timer. It also has the ask question function nesting in it so that the first question shows up at the same time as the timer.
function timer(){
  if(secondsLeft === 60){
    askQuestion();
  }

  secondsDisplay.textContent=`${secondsLeft} Seconds Left`;
  secondsLeft--;

  // This clears the timer and goes to the dialogue at the end of the quiz.
  if(secondsLeft < 0 || questionNumber === questions.length){
    clearInterval(countdown);
    secondsDisplay.textContent="";
    secondsLeft = 60;
    sendMessage();
    showScoresButton();
  }
}

// This function hides the start button.
function hideStartButton(){
  startButton.setAttribute("style", "display: none");
}
 // This function shows the start button.
function showStartButton(){
  startButton.setAttribute("style", "display: block")
}

 // This function hides the show scores button.
 function hideScoresButton(){
  scoresButton.setAttribute("style", "display: none")
}

 // This function shows the scores button.
 function showScoresButton(){
  scoresButton.setAttribute("style", "display: block")
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
      for(var i = 0; i < questions[questionNumber].answers.length; i++){
        answerButton = document.createElement("button");
        answerButton.setAttribute("style", "width: 18em; height: 5em");
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
    secondsLeft = secondsLeft/2
  }
}

// This sends the message at the end of the quiz.
function sendMessage(){

  // This sets the score value to a percentage and displays it.
  scorePercentage = [[scoreValue/questions.length]*100] + "%";
  questionBox.textContent=`Congratulations, your score is ${scorePercentage}!`;

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

  // This fetches the saved scores and stores them in their variable.
  let fromStorage = JSON.parse(localStorage.getItem("scores"));
  if(fromStorage !== null){
    savedScores = fromStorage
  };

  // This puts the latest initials and score into an object.
  let newObject = {
    initials: initialsText,
    score: scorePercentage
  };
  // This puts the latest scores into the same variable as the saved scores.
  savedScores.push(newObject);

  // This saves the updated score history.
  localStorage.setItem("scores", JSON.stringify(savedScores));

  // refresh();
  formBox.innerHTML="";
  hideScoresButton();
  showScores();
  showStartButton();
}

// This refreshes the page for a new quiz once the scores are saved.
function refresh(){
  location.reload();
}

// This shows the saved high scores.
function showScores(){

  // This clears the questions box and saved scores before displaying scores.
  questionBox.innerHTML="";
  savedScores.splice(0, [savedScores.length]);

  // This gets the saved scores from local storage.
  let fromStorage = JSON.parse(localStorage.getItem("scores"));
  if(fromStorage !== null){
    savedScores = fromStorage;
  }

  for(i=0;i<savedScores.length;i++){
    let newLine = document.createElement("p");
    newLine.textContent = `${savedScores[i].initials}: ${savedScores[i].score}`;
    questionBox.appendChild(newLine);
  }

  clearHighScoresButton();
}

// This creates the button to clear the highscores.
function clearHighScoresButton(){
  clearButton = document.createElement("button");
  clearButton.setAttribute("style", "width: 12em");
  clearButton.setAttribute("class", "clear");
  clearButton.textContent = `Clear High Scores`;
  questionBox.appendChild(clearButton);
}

// This clears the high scores
function clearHighScores(){
  localStorage.clear();
  refresh();
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

  // This is for the show scores button.
  else if(event.target.matches("button.scores")){
    showScores()
    scoresButton.setAttribute("style", "display: none")
  }

  // This is for the clear high scores button
  else if(event.target.matches("button.clear")){
    clearHighScores()
  }
});