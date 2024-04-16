var playerOneWins = document.querySelector('.player-one-wins');
var playerTwoWins = document.querySelector('.player-two-wins');
var playerOneToken = document.querySelector('.player-one-icon');
var playerTwoToken = document.querySelector('.player-two-icon');
var gameStatus = document.querySelector('.game-status');
var gameBoardContainer = document.querySelector('.grid-container');
var gameSquares = document.querySelectorAll('.grid-item');
var gameBoard = [];

gameBoardContainer.addEventListener('click',placeToken)
var playerOne = {
    id: 0,
    token: playerOneToken.innerText,
    wins: 0,
    turn: 0
};
var playerTwo = {
    id: 1,
    token: playerTwoToken.innerText,
    wins: 0,
    turn: 0
};
var players = [playerOne, playerTwo]
var playerTurn;
function increaseWins() {

}

function determineWin() {

}

function determineDraw() {

}
function determineTurn() {
    var numberOfPlacedPieces = gameBoard.length;
    if (!numberOfPlacedPieces || numberOfPlacedPieces % 2 === 0) {
        playerTurn = 1;
        gameStatus.innerText = `It's ${players[1].token}'s turn`
    }
    else if (!numberOfPlacedPieces % 2 === 0) {
        playerTurn = 0;
        gameStatus.innerText = `It's ${players[0].token}'s turn`
    }
}   

function placeToken(e) {
    e.preventDefault();
    if (e.target.className === 'grid-item' && !gameBoard.includes(e.target.id)) {
      determineTurn();
      gameBoard.push(e.target.id)
      e.target.innerText = players[playerTurn].token;
    }
}
determineTurn();