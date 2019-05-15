/* global $ */          //Stops C9 flagging a warning for '$ not defined'
// ######### Defines ##########
const OFF = 0;          // Game hasn't been started yet
const UNREADY = 1;      // Game has started but not ready for player input, e.g. currently playing pattern
const READY = 2;        // Game has started and ready for player input, e.g. players turn to repeat pattern
const OVER = 3;         // Game is finished


// ########## Global Vars ##########
var score = 0;
var hiscore = 0;
var readyState = OFF;
var pattern = [];
var patPos = 0


// ########## Game Button Objects ##########
let btnYellow = {
    btnId: 1, 
    element: $("#btn-yellow"),
    litClass: "button-yellow-lit",
    chimeGood: "1a.ogg",
    chimeBad: "1b.ogg"
};
let btnBlue = {
    btnId: 2, 
    element: $("#btn-blue"),
    litClass: "button-blue-lit",
    chimeGood: "2a.ogg",
    chimeBad: "2b.ogg"
};
let btnGreen = {
    btnId: 3, 
    element: $("#btn-green"),
    litClass: "button-green-lit",
    chimeGood: "3a.ogg",
    chimeBad: "3b.ogg"
};
let btnRed = {
    btnId: 4, 
    element: $("#btn-red"),
    litClass: "button-red-lit",
    chimeGood: "4a.ogg",
    chimeBad: "4b.ogg"
};


// ########## Binding click events to elements ##########

$(btnYellow.element).click(function(){onClickGameButton(btnYellow)});
$(btnBlue.element).click(function(){onClickGameButton(btnBlue)});
$(btnGreen.element).click(function(){onClickGameButton(btnGreen)});
$(btnRed.element).click(function(){onClickGameButton(btnRed)});


// ########## Functions ##########
// Returns random whole number between min and max params, inclusive of those numbers
// Taken from w3schools (https://www.w3schools.com/js/js_random.asp)
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound(file){
    let speaker = new Audio();
//    speaker.src = "../sounds/" + file;
//    speaker.play();
}

function onClickStartButton(){
    readyState = UNREADY;
    score = 0 ;
    pattern = [];
    patPos = 0;
    $("#btn-start").text("Restart");
    nextRound();
}

async function nextRound(){
    readyState = UNREADY;
    pattern.push(rand(1,4));
    patPos = 0;
    await sleep(2500)
    playPattern()
}

async function playPattern(){
    for (let i in pattern) {
        switch(pattern[i]){
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
    readyState = READY
}

async function playButton(button, successful){
    if(successful === true){
        playSound(button.chimeGood);
    } else {
        playSound(button.chimeBad);
    }
    $(button.element).addClass(button.litClass);
    await sleep(1000);
    $(button.element).removeClass(button.litClass);
}

function updateScores(){
    $("#curr-score").text(score);
    if(score > hiscore){
        hiscore = score;
        $("#high-score").text(hiscore);
    }
}

function onClickGameButton(gb){
    if (readyState == OFF) {
        return onClickStartButton();
    } else if (readyState == UNREADY) {
        return;
    } else if (readyState == READY){
        if (gb.btnId == pattern[patPos]) {
            playButton(gb, true);
            patPos++;
            if (patPos >= pattern.length){
                score++;
                updateScores();
                nextRound()
            }
        } else {
            playButton(gb, false);
            readyState = OVER;
        }
    }
}