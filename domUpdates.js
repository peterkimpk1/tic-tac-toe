import { gameData } from "./main.js"

var playerOneWins = document.querySelector('.player-one-wins');
var playerTwoWins = document.querySelector('.player-two-wins');
var gameStatus = document.querySelector('.game-status');
var gameSquares = document.querySelectorAll('.grid-item');

export function placeToken() {
    for (var i = 0; i < gameSquares.length; i++) {
        if (gameData.gameBoard[gameData.gameBoard.length-1] === gameSquares[i].id) {
            gameSquares[i].innerText = gameData.players[(gameData.players[0])].token;
        }
    }
}

export function displayGameStatus() {
    gameStatus.innerText = `It's ${gameData.players[(gameData.players[0])].token}'s turn`
    playerOneWins.innerText= `${gameData.players[1].wins} wins`
    playerTwoWins.innerText = `${gameData.players[2].wins} wins`
}

export function displayWinStatus() {
    gameStatus.innerText = `${gameData.players[(gameData.players[0])].token} wins!`
    addDelayedMessage();
}
export function displayDrawStatus() {
    gameStatus.innerText = 'The game is a draw.'
    addDelayedMessage();
}

function addDelayedMessage() {
    setTimeout(function() {
        gameStatus.innerText = `It's ${gameData.players[(gameData.players[0])].token}'s turn`}, 2000)
}

export function clearGameSquares() {
    for (var i = 0; i < gameSquares.length; i++) {
        gameSquares[i].innerText = "";
    }
}
