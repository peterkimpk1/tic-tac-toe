# Tic-Tac-Toe

### Abstract: 
This tic-tac-toe game was built by using HTML, CSS, and Javascript. Player 1 goes first, and if one of the players win, the other player goes first in the next game. In the chance that there is a tie, the game will briefly display that there's been a draw, and reset the board for the next game. This application also uses local storage to store your wins and allows for page refresh. 

### Installation Instructions: 
1. Fork the repository to your Github account https://github.com/peterkimpk1/tic-tac-toe
2. Clone the repository to your local machine using terminal
3. cd into the project
4. Open the project by running code .
5. Run the application by running index.html

### Preview of App: 
https://imgur.com/a/tDaD49u

### Context:
Final solo project for Module 1 and completed in 20 hours.

### Learning Goals:
* Write HTML and CSS to match the given comp
* Functions are pure whenever possible, DRY, and use SRP
* Implement local storage for player wins
* Separating data model and DOM functionality in functions and in different files

### Wins + Challenges: 
*Wins*
1. Implementing local storage with different event listeners
2. Changes to the DOM only occur after the data model has been updated
3. Able to use import/export to separate data model and DOM to different files

*Challenges*
1. Implementing initial load function to work with local storage
2. Moving player objects to necessary index positions
3. Integrating two different javascript files