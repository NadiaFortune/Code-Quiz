//How will the quiz function?
//1. The user starts with the welcome page in the browser
//2. The user clicks the start quiz button
//3. The timer starts to countdown from 90 seconds
//4. The questions are presented one at a time with 4 answer choices - only one answer is correct
//5. If an incorrect answer is selected, 10 seconds is deducted from the timer
//6. Once the timer reaches zero, or the user completes the quiz, the score is displayed
//7. The user has the ability to enter their name and save their score.

var startQuizButton = document.querySelector("#startButton")
var timeLeftEl = document.querySelector("#time")
var timeLeft = 90


function startQuiz() {
    var startScreenEl = document.querySelector("#start-screen")
    startScreenEl.innerHTML = ""
    startTimer()
    
}

startQuizButton.addEventListener("click", startQuiz) 

function startTimer() {
    myInterval = setInterval(function() {
        timeLeftEl.innerHTML = timeLeft
        timeLeft = timeLeft - 1


    }, 1000);
}

function displayQuestions() {
    
}