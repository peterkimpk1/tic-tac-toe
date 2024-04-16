var playerOneWins = document.querySelector('.player-one-wins');
var playerTwoWins = document.querySelector('.player-two-wins');
var playerOneToken = document.querySelector('.player-one-icon');
var playerTwoToken = document.querySelector('.player-two-icon');
var gameStatus = document.querySelector('.game-status');
var gameBoardContainer = document.querySelector('.grid-container');
var gameSquares = document.querySelectorAll('.grid-item');
var gameBoard = [];
var playerOne = {
    id: 0,
    token: playerOneToken.innerText,
    wins: 0,
    placedPieces: []
};
var playerTwo = {
    id: 1,
    token: playerTwoToken.innerText,
    wins: 0,
    placedPieces: []
};
var players = [playerOne, playerTwo]
var playerTurn;

gameBoardContainer.addEventListener('click',placeToken)

function determineWin() {
    var playerPieces = players[playerTurn].placedPieces
    if((playerPieces.includes('one') && playerPieces.includes('two') && playerPieces.includes('three')) || (playerPieces.includes('four') && playerPieces.includes('five') && playerPieces.includes('six')) || (playerPieces.includes('seven') && playerPieces.includes('eight') && playerPieces.includes('nine')) || (playerPieces.includes('one') && playerPieces.includes('four') && playerPieces.includes('seven')) || (playerPieces.includes('two') && playerPieces.includes('five') && playerPieces.includes('eight')) || (playerPieces.includes('three') && playerPieces.includes('six') && playerPieces.includes('nine')) || (playerPieces.includes('one') && playerPieces.includes('five') && playerPieces.includes('nine')) || (playerPieces.includes('three') && playerPieces.includes('five') && playerPieces.includes('seven'))) {
        players[playerTurn].wins += 1;
        playerOneWins.innerText= `${playerOne.wins} wins`
        playerTwoWins.innerText = `${playerTwo.wins} wins`
        clearBoard();
    }
}

function clearBoard () {
    gameBoard = [];
    players[0].placedPieces = [];
    players[1].placedPieces = [];
    for (var i = 0; i < gameSquares.length; i++) {
        gameSquares[i].innerText = ""
    }
}

function determineDraw() {
    if (gameBoard.length === 9) {
        gameStatus.innerText = 'The game is a draw.'
        clearBoard()
    }
}

function determineTurn() {
    var numberOfPlacedPieces = gameBoard.length;
    if (numberOfPlacedPieces % 2 === 0) {
        playerTurn = 0;
        gameStatus.innerText = `It's ${players[1].token}'s turn`
    }
    else if (!numberOfPlacedPieces % 2 === 0) {
        playerTurn = 1;
        gameStatus.innerText = `It's ${players[0].token}'s turn`
    }
}   

function placeToken(e) {
    e.preventDefault();
    if (e.target.className === 'grid-item' && !gameBoard.includes(e.target.id)) {
      determineTurn();
      gameBoard.push(e.target.id)
      players[playerTurn].placedPieces.push(e.target.id)
      e.target.innerText = players[playerTurn].token;
    }
    determineWin();
    determineDraw();
}
