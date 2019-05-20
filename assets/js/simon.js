/* global $, Tone */ //Stops C9 flagging a warning for not defined'

// ######### Defines ##########
// Ready States
const OFF = 0; //       Game hasn't been started yet
const UNREADY = 1; //   Game has started but not ready for player input, e.g. currently playing pattern
const READY = 2; //     Game has started and ready for player input, e.g. players turn to repeat pattern
const OVER = 3; //      Game is finished

// Difficulty
const EASY = 1; // No time limits for clicks
const NORMAL = 2; // Adds time limit for clicks
const HARD = 3; // Has time limit, pattern playback does not light buttons - audio only


// ########## Global Vars ##########
var score = 0; // tracks the current score
var hiscore = 0; // tracks the current high score
var readyState = OFF; // tracks the game's status, see 'Ready States' in Defines
var pattern = []; // holds the pattern array
var patPos = 0; // which item of the pattern array player clicks are compared against
var gameMode = EASY; // tracks the current game mode
var timer; // holds the ID for the timeout function


// ########## Game Button Objects ##########
/*  btnId:      unique num, this is compared against the pattern array to check for player success
    element:    uses JQuery function to reference the gameplay button div element by HTML #id
    litClass:   the CSS class applied to light up the button
    chimeGood:  sound played on pattern playback or when player presses correct button
    chimeBad:   sound played when player presses wrong button (see playSound() for format)
*/

let btnYellow = {
    btnId: 1,
    element: $("#btn-yellow"),
    litClass: "button-yellow-lit",
    chimeGood: [82.407, "square", "+0.5"],
    chimeBad: [41.203, "sawtooth", "+1.0"]
};
let btnBlue = {
    btnId: 2,
    element: $("#btn-blue"),
    litClass: "button-blue-lit",
    chimeGood: [220, "square", "+0.5"],
    chimeBad: [110, "sawtooth", "+1.0"]
};
let btnGreen = {
    btnId: 3,
    element: $("#btn-green"),
    litClass: "button-green-lit",
    chimeGood: [138.591, "square", "+0.5"],
    chimeBad: [69.296, "sawtooth", "+1.0"]
};
let btnRed = {
    btnId: 4,
    element: $("#btn-red"),
    litClass: "button-red-lit",
    chimeGood: [164.814, "square", "+0.5"],
    chimeBad: [82.407, "sawtooth", "+1.0"]
};


// ########## Binding click events to elements ##########
// Adds a click function to the gameplay buttons
// This function calls onClickGameButton with reference to the relevant game button object
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
    // Check if the player has a new high score
    if (score > hiscore) {
        hiscore = score;
        $("#high-score").text(hiscore);
    }
}

// ---------- Audio/Visual ----------

// Uses Tone.js to generate sounds
// Pass array in as [freq, "wavetype", "duration"], e.g. [440,"sine","+0.5"]
function playSound(params) {
    // We must set some temp vars first as Tone.Oscillator plays nothing
    // if we try to pass the array items directly into the call
    let freq = params[0];
    let type = params[1];
    let duration = params[2];
    let osc = new Tone.Oscillator(freq, type);
    osc.volume.value = -22;     // Sets the volume in dB, otherwise it is really really loud 
    osc.toMaster().start().stop(duration);
}


// Lights the passed gameplay button up and plays good buzzer if successful param is true
// Otherwise dims the button and plays the bad buzzer
async function playButton(button, successful, playerClick = false) {
    if (successful === true) {
        playSound(button.chimeGood);
        // Does not light buttons on HARD mode, unless called as a player click
        if (gameMode != HARD || playerClick == true) {
            $(button.element).addClass(button.litClass);
            await sleep(500);
            $(button.element).removeClass(button.litClass);
        };
    }
    else {
        playSound(button.chimeBad);
        $(button.element).addClass("button-unlit");
        await sleep(500);
        $(button.element).removeClass("button-unlit");
    }
}

// ---------- Logic ----------

// For when the player takes too long to press a button on NORMAL or HARD modes
// Changes game state to Game Over and plays the bad buzzers, all of them at once
function timeout() {
    readyState = OVER;
    playButton(btnYellow, false);
    playButton(btnBlue, false);
    playButton(btnGreen, false);
    playButton(btnRed, false);
}

// Called at start of new game or when player has exhausted pattern array successfully
// Picks a random id num and adds to pattern array then plays pattern array
async function nextRound() {
    readyState = UNREADY; // Set game to Unready so player can't interact
    pattern.push(rand(1, 4)); // select random id num to add to pattern array
    patPos = 0;
    await sleep(2000); // Gives player a chance to get ready after starting, gives buttons time to turn back off
    // Plays pattern array
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
        await sleep(1000); // Stops buttons playing at the same time, including the same button over itself
    }
    readyState = READY; // Releases game into ready state so player can interact again
    // Only game difficulty modes other than EASY have a timeout
    if (gameMode != EASY) {
        timer = setTimeout(timeout, 4000);  // Gives a bit of extra time at new round compared between button clicks
    }
}

// ---------- onClick Funcs ----------

// Called when player clicks UI start button
// Inits the vars to get ready for a new game, then starts the first round
function onClickStartButton() {
    readyState = UNREADY;
    score = 0;
    updateScores(); // To clear the current displayed score
    pattern = [];
    patPos = 0;
    $("#btn-start").text("Restart"); // Changes label on UI start button
    nextRound(); // Starts the first round
}

// Called when player clicks UI difficulty selector button
// Sets the game's difficulty mode
function onClickDiffButton() {
    if (readyState == OFF || readyState == OVER) { // To prevent difficulty change mid-game
        switch (gameMode) { // Check which difficulty is current
            case EASY:
                gameMode = NORMAL; // Changes to next difficulty level
                $("#btn-diff").text("NORMAL"); // Changes label on UI difficulty selector button
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
}


// Called when the player clicks the gameplay buttons, attached button is passed as gb param
function onClickGameButton(gb) {
    // Starts new game if game is not running or over
    if (readyState == OFF || readyState == OVER) {
        return onClickStartButton();
    }
    // Ignores clicks if currently playing pattern, etc
    else if (readyState == UNREADY) {
        return;
    }
    else if (readyState == READY) {
        clearTimeout(timer); // Clears the timeout timer
        // Checks correct button is pressed compared to pattern array position
        if (gb.btnId == pattern[patPos]) {
            playButton(gb, true, true);
            patPos++;
            // Checks if pattern array has no remaining items
            if (patPos >= pattern.length) {
                score++; // Player gains a point after completing each round
                updateScores(); // Render score, and high score if appl, on UI fields
                nextRound(); // Starts next round
            }
            // If items in array remaining, set timeout timer
            // Only game difficulty modes other than EASY have a timeout
            else if (gameMode != EASY) {
                timer = setTimeout(timeout, 3000);
            }
        }
        // Handles player pressing the wrong button
        else {
            playButton(gb, false); // Dims button, plays bad buzzer
            readyState = OVER; // Ends the game
        }
    }
}
