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
3. 