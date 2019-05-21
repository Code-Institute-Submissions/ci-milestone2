# Your Project's Name

This project is a recreation of the MB's game ['Simon'](https://en.wikipedia.org/wiki/Simon_(game)).   

Simon is a simple memory game: the computer plays (with lit buttons and sounds) a sequence (starting at one) of four buttons, 
then the player takes a turn and attempts to press the same buttons in the same order.  
If the player is successful the computer plays the same sequence and appends another random button onto the end, 
and the player again attempts to follow the increased sequence.

The project will be built in HTML and CSS with Bootstrap 4, using Javascript with JQuery for the logic. 
 
## UX
 
This project is intended for people who want to play Simon, they could have played Simon before or they could be new to the game.
- As a new player, I want to be able to read instructions for the game, so I can know how to play it
- As an existing player, I want to be able to play the game, so I can play the game

To facilitate these requirements the application will be laid out as per [this wireframe](docs/wireframes.jpg)

The logic of the application will be along the lines of:
1. User presses any of the four buttons to start
2. App checks ready state
    1. If game hasn't started, do initial things
        1. Play start up sequence
        2. Set pattern array blank, pick random button, append to array
        2. Set current score to zero
        3. Play pattern
    2. Else, check if playing pattern
        1. Ignore button presses whilst pattern playing
    3. Else, check button is correct button at current position in pattern array
        1. If correct, play happy chime and check if more elements in array or go to next stage
            1. More elements
                1. Move position in pattern array up one
                2. Wait for user to press another button
            2. Next stage
                1. Pick random button, append to pattern array
                2. Play pattern
                3. Wait for player to press a button
        2. If incorrect
            1. Play unhappy chime
            2. Set high score if current score higher than previous high score
            3. Set ready state to pregame 



## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.
 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- A warning about the site not being compatible with IE11. Due to using Tones.js the game doesn't work at all on IE11, as IE11 is no longer being updated by Microsoft. Currently the game simply does not work at all, this is poor UX as the user may think the game itself is broke. It would be much better to have a warning pop up saying the game is not compatible with IE11 and that they should switch to a modern supported browser.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.


## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X