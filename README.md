# Your Project's Name

This project is a recreation of the MB's game ['Simon'](https://en.wikipedia.org/wiki/Simon_(game)).   

Simon is a simple memory game: the computer plays (with lit buttons and sounds) a sequence (starting at one) of four buttons, 
then the player takes a turn and attempts to press the same buttons in the same order.  
If the player is successful the computer plays the same sequence and appends another random button onto the end, 
and the player again attempts to follow the increased sequence.

The project will be built in HTML and CSS with Bootstrap 4, using JavaScript with JQuery for the logic. 


## UX
 
This project is intended for people who want to play Simon, they could have played Simon before or they could be new to the game.
- As a new player, I want to be able to read instructions for the game, so I can know how to play it
- As an existing player, I want to be able to play the game, so I can play the game

To facilitate these requirements the application will be laid out as per [this wireframe](docs/wireframe.jpg)

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

The above logic, before developed fully, was expanded into psuedocode which can be found [here](docs/psuedo.txt)

Additionally I have a included a [file](docs/sounds-info.txt) with a specification of the sounds to be used in this projects.

## Features

### Existing Features

- Responsive design 
    - Using Bootstrap the website fits comfortably on screens of all sizes. The page dynamically adjusts to fit: mobiles, tablets, laptops, and desktops.
- Low load times 
    - By utilising the WebAudioAPI to generate the game sounds on the fly this ensures that users on even the slowest of connections can play the game practically immediately. 
- A recreation of a classic
    - It has the look
    - It has the sounds
    - It has the gameplay you remember
- Multiple game mods
    - For players wanting an added challenge to the memory game they can play with a timelimit
    - For players wanting an even bigger challenge and something a bit different they can play completely by ear. In hard mode the computer will only play the sounds of the pattern, not the lights.
- Informative
    - There is a 'How To Play' section that explains the game to visitors who are unfamiliar with the game
    - There is an 'About Simon' section to tell the visitor a little about the history of Simon

### Features Left to Implement

- A warning about the site not being compatible with IE11 (and other old browsers). Due to using Tones.js the game doesn't work at all on IE11, as IE11 is no longer being updated by Microsoft. Currently the game simply does not work at all, this is poor UX as the user may think the game itself is broke. It would be much better to have a warning pop up saying the game is not compatible with IE11 and that they should switch to a modern supported browser.
- There's an issue with Safari that causes it to not play the first sound of the first round, according to my fellow students this behaviour also occurs when using sound files instead of WebAudioAPI. As I lack access to a Mac it would be difficult for me to diagnose and fix, so I will leave this as a Known Issue for now. 
- Tweak game sounds - I'm still not sure the instrument and octave used for the sounds are quite right, something like this would be best to have a peer group review and provide feedback
- Adjust game timings - Again this is something for a peer review group, to decide if the duration of buzzers, button lights, playback speed, and timeouts for medium/hard difficulty are right


## Technologies Used

###### Languages

- [HTML5](https://www.w3.org/standards/webdesign/htmlcss)
	- Latest version of the Hyper Text Markup Language, used to write the markup language the browser interprets to display the webpage elements 
- [CSS 4](https://www.w3.org/standards/webdesign/htmlcss)
	- Used to create style sheets to adjust the styles of HTML elements

###### Frameworks & Libraries

- [Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
	- CSS framework that provides a collection of prebuilt styles. The main use of this framework is the grid system it provides, as this allowed me to quickly develop the structure of the project's pages.
- [Google Fonts](https://fonts.google.com/)
	- A large repository of free fonts. A nice feature of this site is that it recommends fonts that complement each other. This projects uses the font 'VT323' from here to give the headings a retro feel.
- [JQuery](https://jquery.com)
    - A JavaScript framework to simplify DOM manipulation.
- [Popper.js](https://popper.js.org/)
    - A JS library to manage poppers in web applications. Required by the JavaScript components of Bootstrap
- [Tones.js](https://tonejs.github.io/)
    - A JS framework built on the Web Audio API. Used to make the various buzzers used in the game. 

###### Tools

- [MarkdownPad 2](http://markdownpad.com/)
	- A text editor specifically designed for editing Markdown documents, provides a preview pane and syntax highlighting to make writing .md files easier. Used to produce this README.md and TESTING.md
- [MS Paint](https://en.wikipedia.org/wiki/Microsoft_Paint)
    - A bare bones drawing program. Used to produce the wireframe.
- [Audacity](https://www.audacityteam.org/)
    - Audio producing software that was used to produce the game buzzers, before I switched to using the Tones.js framework 
- [Cloud9](https://c9.io/)
	- Provides Linux workspaces which include an IDE for developing web based software, file hosting, git SVN, and basic web server services
- [Google Chrome](https://www.google.com/chrome/)
	- Web browser. Includes Dev Tools which provide information on how the elements are rendered, what style rules are applied, and allows editing of the HTML and CSS to see their effects live in the view pane. 
- [Github](https://github.com/)
	- Hosting service for Git Software Version Controlled repositories. Also has a service called Github Pages, which provides web hosting to the repos. 
- [W3C Validator](https://validator.w3.org/)
	- Validates HTML markup files. Checks for errors in syntax such as unclosed tags or unneeded close tags.
- [W3C Jigsaw](https://jigsaw.w3.org/css-validator/)
	- Validates CSS files for syntax errors.
- [JSHint](https://jshint.com/)
    - A JavaScript linter for checking errors in the syntax, etc. 


## Testing

Testing documentation is located in a separate [TESTING.md document](docs/TESTING.md) located in the docs folder.


## Deployment

###### Run Local

Download & unzip or Git Clone to a directory of your choice.  
Open index.html in a supported browser of your choice.

###### Git Hub Pages

To deploy the website to Github pages I did the following:

- Created a new Github repo
- Pushed to the Github repo from my C9 workspace's local git repo
- On Github, created a new branch called 'gh-pages'
	- At certain points in the dev process, pulled main branch to the gh-pages branch, this was to keep the Deployment Version stable from the Development version, which would likely contain WIP content
- In the Github repo settings, went to the GitHub Pages section and set the source branch to the 'gh-pages' branch
	- This gives a hyper link to the hosted version of the project

There are no differences between the development version (aside from the deployed version running from a separate git directory, which was largely for house keeping and not necessary to run the site).


## Credits

### Content
- The text for section 'About Simon' was copied from the [Wikipedia article 'Simon(game)'](https://en.wikipedia.org/wiki/Simon_(game))

### Media
- n/a

### Acknowledgements

- I received inspiration for this project from the electronic memory 'Simon' produced by Milton Bradley
- I received advice from my mentor, Chris Zielinski