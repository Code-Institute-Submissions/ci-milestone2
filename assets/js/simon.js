/* global $ */  //Stops C9 flagging a warning for '$ not defined'

// ########## Button Objects ##########
let btnYellow = {
    id: 1, 
    element: $("#btn-yellow"),
    litClass: "button-yellow-lit",
    chimeGood: "1a.ogg",
    chimeBad: "1b.ogg"
};
let btnBlue = {
    id: 2, 
    element: $("#btn-blue"),
    litClass: "button-blue-lit",
    chimeGood: "2a.ogg",
    chimeBad: "2b.ogg"
};
let btnGreen = {
    id: 3, 
    element: $("#btn-green"),
    litClass: "button-green-lit",
    chimeGood: "3a.ogg",
    chimeBad: "3b.ogg"
};
let btnRed = {
    id: 4, 
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

function onClickGameButton(gb){
    $(gb.element).toggleClass(gb.litClass)
}