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
        2. 
    3. Set patPos to zero
        - Pass
    4. Call playPattern()
    5. Set ready state to READY
        - Pass