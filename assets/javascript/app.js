$(document).ready(function() {

    var numberQuestion = 0;
    
    var time = 15;
    
    var correctGuesses = 0;
    
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
    {
    question: "Which household possesses the banner of a moon and a falcon?",
    choices: ["House Greyjoy", "House Arryn", "House Lannister", "House Karstark"],
    rightAnswer: "House Arryn",
    }, 
    {
    question:"What was the name of Arya’s direwolf?",
    choices: ["Lady", "Summer", "Grey Wind", "Nymeria"],
    rightAnswer: "Nymeria",
    }, 
    {
    question:"Who was the first to stab John Snow in the Season 5 finale?",
    choices: ["Bowen Marsh", "Olly", "Alliser Thorne", "Othell Yarwyck"],
    rightAnswer: "Alliser Thorne",
    }, 
    {
    question:"Who said, 'A very small man can cast a very large shadow'?",
    choices: ["Tyrion Lannister", "Pycelle", "Petyr Baelish", "Lord Varys"],
    rightAnswer: "Lord Varys",  
    },
    {
    question:"What were the names of Aegon Targaryen's three dragons that Dany named her ships after?",
    choices: ["Balerion, Drogon, and Viserion", "Meraxes, Rhaegal, and Vhagar", "Rhaegal, Drogon, and Viserion", "Meraxes, Vhagar, and Balerion"],
    rightAnswer: "Meraxes, Vhagar, and Balerion",
    },
    {
    question: "Why was Jorah Mormont exiled from Westeros?",
    choices: ["For trading slaves", "For killing his wife", "For buying slaves", "For being a slave"],
    rightAnswer: "For trading slaves",
    }, 
    {
    question:"What did Tywin give his grandson Joffrey during the royal wedding?",
    choices: ["A book called 'The Lives of Four Kings'", "Seven gold bars", "A sword made out of Valyrian steel", "A crown made of bones"],
    rightAnswer: "A sword made out of Valyrian steel",
    },
    {
    question:"What was the name of Ned Stark's Valyrian steel sword?",
    choices: ["Ice", "Longclaw", "Hearteater", "Needle"],
    rightAnswer: "Ice",
    }, 
    {
    question:"Who does Dany name her dragons after?",
    choices: ["She made them up", "She named them after Aegon's dragons", "Her brother, father, and husband",  "Her husband and two brothers"],
    rightAnswer: "Her husband and two brothers",
    }, 
    {
    question:"Who returns Tyrion Lannister's purse of gold upon his release from Catelyn Stark?",
    choices: ["Lysa Stark", "Mord", "Ser Rodrik Cassel", "Bronn"],
    rightAnswer: "Ser Rodrik Cassel",
    }
];

function questionStuff() {
    
    $("#gameScreen").append("<p>" + 
        questions[numberQuestion].question + 
        "</p><p class='choices'>" + 
        questions[numberQuestion].choices[0] + 
        "</p><p class='choices'>" + 
        questions[numberQuestion].choices[1] + 
        "</p><p class='choices'>" + 
        questions[numberQuestion].choices[2] + 
        "</p><p class='choices'>" + 
        questions[numberQuestion].choices[3] + 
        "</p>");
};

function userWin() {
    $("#gameScreen").html("<p>You are correct.</p>");
    correctGuesses++;
    var rightAnswer = questions[numberQuestion].rightAnswer;
    $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
    rightAnswer +
    "</span></p>");
    setTimeout(nextQuestion, 4000);
    numberQuestion++;
};

//incorrect
function userLoss() {
    $("#gameScreen").html("<p>Incorrect...</p>");
    incorrectGuesses++;
    var rightAnswer = questions[numberQuestion].rightAnswer;
    $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
        rightAnswer + 
        "</span></p>");
    setTimeout(nextQuestion, 4000);
    numberQuestion++;
    };

function userTimeout() {
    if (time === 0) {
        $("#gameScreen").html("<p>Your time is up.</p>");
        incorrectGuesses++;
        var rightAnswer = questions[numberQuestion].rightAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" + 
            rightAnswer + 
            "</span></p>");
        setTimeout(nextQuestion, 4000);
        numberQuestion++;
    }
};

// screen that shows final score
function results() {
    if (correctGuesses === questions.length) {
        var endMessage = "There is only one god and his name is Death, and there is only one thing we say to Death: ‘Not today.’";
        var bottomMessage = "You got every question right."
    }
    else if (correctGuesses > incorrectGuesses) {
        var endMessage = "It’s easy to confuse what is with what ought to be, especially when what is has worked out in your favor.";
        var bottomMessage = "I think you can do better."
    }
    else {
        var endMessage = "You know nothing, Jon Snow.";
        var bottomMessage = "You need to sharpen your skills.";
    }
    $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
        correctGuesses + "</strong> right.</p>" + 
        "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
    $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
    $("#bottomMessage").html(bottomMessage);
    reset();
    $("#start").click(nextQuestion);
};

// game clock currently set to 15 seconds
function timer() {
    clock = setInterval(countDown, 1000);
    function countDown() {
        if (time < 1) {
            clearInterval(clock);
            userTimeout();
        }
        if (time > 0) {
            time--;
        }
        $("#timer").html("<strong>" + time + "</strong>");
    }
};

function nextQuestion() {
    if (numberQuestion < questions.length) {
        time = 15;
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        questionStuff();
        timer();
        userTimeout();
    }
    else {
        results();
    }
};

// reset game
function reset() {
    numberQuestion = 0;
    correctGuesses = 0;
    incorrectGuesses = 0;
};

function startGame() {
    $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    $("#start").hide();
    questionStuff();
    timer();
    userTimeout();
};

// this starts the game
$("#start").click(nextQuestion);

$("#gameScreen").on("click", ".choices", (function() {
    var userGuess = $(this).text();
    if (userGuess === questions[numberQuestion].rightAnswer) {
        clearInterval(clock);
        userWin();
    }
    else {
        clearInterval(clock);
        userLoss();
    }
}));

});