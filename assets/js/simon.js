/* global $, Tone */ //Stops C9 flagging a warning for '$ not defined'

// ######### Defines ##########
// Ready States
const OFF = 0; // Game hasn't been started yet
const UNREADY = 1; // Game has started but not ready for player input, e.g. currently playing pattern
const READY = 2; // Game has started and ready for player input, e.g. players turn to repeat pattern
const OVER = 3; // Game is finished

// Difficulty
const EASY = 1;
const NORMAL = 2;
const HARD = 3;


// ########## Global Vars ##########
var score = 0;
var hiscore = 0;
var readyState = OFF;
var pattern = [];
var patPos = 0;
var gameMode = EASY; 
var timer;


// ########## Game Button Objects ##########
let btnYellow = {
    btnId: 1,
    element: $("#btn-yellow"),
    litClass: "button-yellow-lit",
    chimeGood: [138.591, "square", "+0.5"],
    chimeBad: [69.296, "sawtooth", "+1.0"]
};
let btnBlue = {
    btnId: 2,
    element: $("#btn-blue"),
    litClass: "button-blue-lit",
    chimeGood: [164.814, "square", "+0.5"],
    chimeBad: [82.407, "sawtooth", "+1.0"]
};
let btnGreen = {
    btnId: 3,
    element: $("#btn-green"),
    litClass: "button-green-lit",
    chimeGood: [82.407, "square", "+0.5"],
    chimeBad: [41.203, "sawtooth", "+1.0"]
};
let btnRed = {
    btnId: 4,
    element: $("#btn-red"),
    litClass: "button-red-lit",
    chimeGood: [220, "square", "+0.5"],
    chimeBad: [110, "sawtooth", "+1.0"]
};


// ########## Binding click events to elements ##########

$(btnYellow.element).click(function() { onClickGameButton(btnYellow) });
$(btnBlue.element).click(function() { onClickGameButton(btnBlue) });
$(btnGreen.element).click(function() { onClickGameButton(btnGreen) });
$(btnRed.element).click(function() { onClickGameButton(btnRed) });


// ########## Functions ##########
// ---------- Helpers ----------

// Returns random whole number between min and max params, inclusive of those numbers
// Taken from w3schools (https://www.w3schools.com/js/js_random.asp)
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Used in a function to delay the next line calling. 
// Calling function needs to be async, sleep needs to be called with 'await'
// Taken from Stack Overflow (https://stackoverflow.com/a/39914235)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Updates the scores displayed on the UI
function updateScores() {
    $("#curr-score").text(score);
    if (score > hiscore) {
        hiscore = score;
        $("#high-score").text(hiscore);
    }
}

// ---------- Audio/Visual ----------

// Uses Tone.js to generate sounds
// Pass array in as [freq, "wavetype", "duration"], e.g. [440,"sine","+0.5"]
function playSound(params) {
    var freq = params[0];
    var type = params[1];
    var duration = params[2];
    var osc = new Tone.Oscillator(freq, type).toMaster().start().stop(duration);
}


// Lights the passed gameplay button up and plays good buzzer if successful param is true
// Otherwise dims the button and plays the bad buzzer
async function playButton(button, successful) {
    if (successful === true) {
        playSound(button.chimeGood);
        $(button.element).addClass(button.litClass);
        await sleep(1000);
        $(button.element).removeClass(button.litClass);
    }
    else {
        playSound(button.chimeBad);
        $(button.element).addClass("button-unlit");
        await sleep(1000);
        $(button.element).removeClass("button-unlit");
    }
}

// ---------- Logic ----------

function timeout() {
    readyState = OVER;
    playButton(btnYellow, false);
    playButton(btnBlue, false);
    playButton(btnGreen, false);
    playButton(btnRed, false);
}

async function nextRound() {
    readyState = UNREADY;
    pattern.push(rand(1, 4));
    patPos = 0;
    await sleep(2500);
    for (let i in pattern) {
        switch (pattern[i]) {
            case 1:
                playButton(btnYellow, true);
                break;
            case 2:
                playButton(btnBlue, true);
                break;
            case 3:
                playButton(btnGreen, true);
                break;
            case 4:
                playButton(btnRed, true);
                break;
        }
        await sleep(1500);
    }
    readyState = READY;
}

// ---------- onClick Funcs ----------

function onClickStartButton() {
    readyState = UNREADY;
    score = 0;
    updateScores();
    pattern = [];
    patPos = 0;
    $("#btn-start").text("Restart");
    nextRound();
}

function onClickDiffButton() {
    switch (gameMode) {
        case EASY:
            gameMode = NORMAL;
            $("#btn-diff").text("NORMAL");
            break;
        case NORMAL:
            gameMode = HARD;
            $("#btn-diff").text("HARD");
            break;
        case HARD:
            gameMode = EASY;
            $("#btn-diff").text("EASY");
    }
    
}

function onClickGameButton(gb) {
    if (readyState == OFF || readyState == OVER) {
        return onClickStartButton();
    }
    else if (readyState == UNREADY) {
        return;
    }
    else if (readyState == READY) {
        if (gb.btnId == pattern[patPos]) {
            playButton(gb, true);
            patPos++;
            if (patPos >= pattern.length) {
                score++;
                updateScores();
                nextRound();
            }
        }
        else {
            playButton(gb, false);
            readyState = OVER;
        }
    }
}
