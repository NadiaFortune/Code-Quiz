//How will the quiz function?
//1. The user starts with the welcome page in the browser
//2. The user clicks the start quiz button
//3. The timer starts to countdown from 90 seconds
//4. The questions are presented one at a time with 4 answer choices - only one answer is correct
//5. If an incorrect answer is selected, 10 seconds is deducted from the timer
//6. Once the timer reaches zero, or the user completes the quiz, the score is displayed
//7. The user has the ability to enter their name and save their score.



var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#startButton");
var introPage = document.querySelector("#start-screen");

var questionPage = document.querySelector("#questions");
var askQuestion = document.querySelector("#question-title");

var reactButtons = document.querySelectorAll(".answers");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var userInitial = document.querySelector("#initial");

var submitBtn = document.querySelector("#submit");
var highScorePage = document.querySelector("#highscores");
var scoreRecord = document.querySelector("#score_record");
// var scoreCheck = document.querySelector(".scores");
var finish = document.querySelector("#finish");

var backBtn = document.querySelector("#back_btn");
var clearBtn= document.querySelector("#clear_btn");
var timeLeftEl = document.querySelector("#time");

var timeLeft = 120;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;


    //WHEN I click the start button, THEN a timer starts(The setInterval() Method)
    function countdown() {
        
        var timerInterval = setInterval(function () {

          timeLeft--;
    
            if (timeLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time is up!"; 
                // if time is up, show on score board content instead of "all done!"
                finish.textContent = "Time is up!";
                gameOver();

            } else  if(questionCount >= questions.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

    //Click the button to start the quiz
function startQuiz () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
      
}
    //present the questions and answers
function showQuestion (n) {
        askQuestion.textContent = questions[n].question;
        answerBtn1.textContent = questions[n].answers[0];
        answerBtn2.textContent = questions[n].answers[1];
        answerBtn3.textContent = questions[n].answers[2];
        answerBtn4.textContent = questions[n].answers[3];
        questionNumber = n;
    }

    //WHEN I answer a question,Show if answer is correct or wrong 
function checkAnswer(event) {
    event.preventDefault();
    //make it display
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    // answer check
    if (questions[questionNumber].correctAnswer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        timeLeft = timeLeft - 10;
        checkLine.textContent = "Wrong! The correct answer is " + questions[questionNumber].correctAnswer + " .";
    }
         //THEN I am presented with another question
    if (questionNumber < questions.length -1 ) {
    // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
    //WHEN all questions are answered or the timer reaches 0, Game is over
function gameOver() {

        questionPage.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
        // show final score
        finalScore.textContent = "Your final score is :" + totalScore ;
        // clearInterval(timerInterval);  
        timeLeft.style.display = "none"; 
};

// get current score and initials from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


// render score to the score board
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
    // Slice the high score array to only show the top five high scores. 
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

// sort score and ranking the highscore list
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

// push new score and initial to the local storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

/* Add event listeners*/
// startbtn to start the quiz
startBtn.addEventListener("click", startQuiz);

//click any choices button, go to the next question
reactButtons.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

// check highscore ranking list
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

//go back to main page
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});