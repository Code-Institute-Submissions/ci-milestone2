# Build Notes
Whilst building this project I tested as I developed, below are the notes of the tests I performed and their results

1. Test if JQuery can work by referencing the element in the Object declarations
    1. Tested this with the Game Buttons, used the Chrome Dev Tools '$(btnYellow).addClass(btnYellow.litClass)'
        - This failed to apply the class to the target element
    2. Tested again with '$(btnYellow.element).addClass(btnYellow.litClass)' 
        - This successfully applied the class to the target element
2. Test clicking of Game Buttons
    1. At first I attached a click handler to the button's element with this code: '$(btnGreen.element).click(onClickGameButton(btnGreen));'
        - This caused an odd bug which caused the onClickGameButton function to fire off on all buttons as soon as the page loaded
        - After some reading I found this was due to calling the function with a parameter, this caused the code to call the function straight away when adding the event handler.
    2. I changed the function to be an annonymus function which would then call the wanted function: '$(btnBlue.element).click(function(){onClickGameButton(btnBlue)});'
        - This worked as expected; the function did not call until the button was clicked, and the test code in the function executed correctly upon clicking the button
3. Test Start button works
    1. It didn't do anything
        - This was because I had forgotten the () at the end of the function name in the button's onclick attribute.    
    2. Added the missing brackets and tried again. 
        - This fired off the JS onClickStartButton function as expected
4. onClickStartButton() - this should:
    1. Set the ready state to UNREADY
        - Pass 
    2. Set score, patPos to zero
        - Pass
    3. Set pattern to a blank list
        - Pass
    4. Change the start button's label to 'Restart'
        - Pass
    5. Call nextRound()
        - Pass
5. nextRound() - this should:
    1. Set ready state to UNREADY
        - Pass
    2. Add a random int between 1 and 4 to the pattern list
        1. FAIL - '+=' causes the returned value and pattern array to be converted to strings instead of added to the array
        2. Changed to use .push() function, now returns correctly as an array
    3. Set patPos to zero
        - Pass
    4. Call playPattern()
        - Calls correctly
    5. Set ready state to READY
        - Pass
6. playPattern()
    1. This will go through the pattern array
        - Pass
    2. A switch will check which button to playButton
        - Was checking the index value instead of the value of the item at the index, changed to pattern[i] and now checks correctly
    3. The play button function will be called with correct params
        - Pass
    4. The buttons should play 1 by 1 with a 500ms delay from the playing function
        1. This does not happen, all buttons play at once as playButton function is asynchronous, so the next iteration in the loop executes without delay
        2. Changed playPattern to async and added delay to its loop as well
        3. This would've caused the readyState to be set to ready whilst pattern was playing due to nextRound setting readyState, so moved that into this function to execute after the loop.
7. playButton()
    1. Checks successful parameter then calls playSound to play relevent beep
        - Pass
    2. Uses JQuery to add litClass to button
        - Pass
    3. Waits a delay interval
        - Forgot the await keyword at first, but otherwise Pass
    4. Removes litClass
        - Pass
8. gameButtonClick()
    1. Checks if game has started, starts if it hasn't
        - Pass
    2. Checks if game is unready, rejects click if so
        - Pass
    3. Checks if ready then does below
        - Pass
    4. Checks if correct button is pressed by comparing btnID with value of current position in pattern array
        - Pass 
    5. If successful, calls playButton, increments patPos up
        - Pass
    6. Checks if there are no more remaining items in pattern array. If there isn't, then score is increased, updateScores is called, nextRound is called
        - Pass
    7. If there are remaining items then function exits and waits for next button press
        - Pass
    8. If wrong button is pressed then calls playButton to play unsuccesful sound and sets readyState to Game Over
        - Pass

# Feature Complete: Playtesting
Now that the core functions of game have been written and tested I can begin testing the gameplay.

The first issue was that when the new round played its sequence the animation for the previous button press was still playing, this made it confusing as sometimes the first button of the pattern was the last button pressed, so they would overlap.
- To get around this I added async to nextRound() and used the sleep() function to add a delay before playing the pattern, to give the previous animation time to finish. 

The second issue is that Game Overs currently aren't very obvious if you have the game muted (or are deaf).
- So as part of the Game Over sequence I made the button go dark (switch off) to make it look more obvious.

Third issue is that the buttons can be clicked to start a new game, but during the game over state the buttons do nothing, which was counter intuitive and made it look like the game had froze
- Changed the onClickGameButton() function to also call the start function if the game was in an OVER state

Minor issues:
- Score showing previous game's score on new game
    - Added a call to updateScores() on start function
- The game rounds have a slight delay before playing for the first time, it would be good to add some preload method to the sounds
    - Switching to the [Tones.js framework](https://tonejs.github.io) could work for this
    - Switched to Tones.js. Had to change the Game Button object's chime properties to the specified audio format parameters instead of links to audio files, which is nice as the sounds can be tweaked much easier than the prerendered Audiacity ones. As the audio tones are produced via the browser itself this has eliminated all issues with the delay of downloading the sounds on first play.
    - Tone.js is unfortunetly not compatible with IE11 but that is an acceptable loss (it is an old out of date browser that people need to stop using)

# Defensive programming
There wasn't much the player could do that could break the game, aside from mashing the buttons at the wrong time.  
I had already factored this in to my logic design before coding the game by having a readyState variable that would be set at certain times to prevent the player input registering.

After coding the difficulty settings I realised the player could change the difficulty level midgame (as I'd done it myself a few times), but was able to prevent this by using the same readyState system from above.

# Responsiveness
By using the Bootstrap framework the UI is responsive. The layout of the site however is simple enough that I felt it was only suitable to make a difference between mobile screens and desktop.  

Initially I had only done a breakpoint between XS (less than 576px) and MD (768px or greater) screens, with the game's main buttons becoming vertically stacked on the XS size screens - the Start/Difficulty/Scores area ('Control Box') were kept below the game area.  
This looked fine when the phone was held vertically but when the phone was held horizontally the Control Box area barely fit on the screen and there was a lot of wasted space at the sides.  
To fix this I added another Row-Col pair and put the Game Window and Control Box elements as a child of this. Then I changed the breakpoints so that on mobile-horizontal screens the Game Window would be shifted left and the Control Box would be brought up and placed to the right of the Game Window to utilise space better.

In order to give the player a bit more space for their thumbs on mobile devices I had the game window morph from the classic Simon 'circle of four quarters' layout to a vertically stacked layout.  
Originally I was just going to make the buttons morph into plain rectangles, but as an interesting quirk I noticed that the four quarters when stacked and stretched formed the shape of an S. I decided to embrace this quirk as a feature and only changed the top and bottom buttons to be a bit more rounded and keep the 'S' for Simon. 


# Browser compatibility
- IE11 - not compatible due to using Tones.js
- Chrome - dev browser, works
- Firefox - works fine
- Safari - did not have access to a mac to test with myself, asked some fellow students to test it and they said it worked
- Edge - works fine
- Opera - works fine
