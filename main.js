var playerOneWins = document.querySelector('.player-one-wins');
var playerTwoWins = document.querySelector('.player-two-wins');
var playerOneToken = document.querySelector('.player-one-icon');
var playerTwoToken = document.querySelector('.player-two-icon');
var gameStatus = document.querySelector('.game-status');
var gameBoardContainer = document.querySelector('.grid-container');
var gameSquares = document.querySelectorAll('.grid-item');
var gameBoard = [];
var players = [];
var playerTurn = 1;
var currentPiece = '';
var winningCombinations = [
    {pieces:['one','two','three'],1:[],2:[]}, 
    {pieces:['four','five','six'],1:[],2:[]}, 
    {pieces:['seven','eight','nine'],1:[],2:[]}, 
    {pieces:['one','four','seven'],1:[],2:[]}, 
    {pieces:['two','five','eight'],1:[],2:[]},
    {pieces:['three','six','nine'],1:[],2:[]},
    {pieces:['one','five','nine'],1:[],2:[]},
    {pieces:['three','five','seven'],1:[],2:[]}];

gameBoardContainer.addEventListener('click', placeToken)
window.addEventListener('load', initialLoad)
window.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('playerOneData').wins !== 0 && localStorage.getItem('playerTwoData').wins !== 0) {
        retrievePlayersData();
        displayGameStatus();
        window.removeEventListener('load',initialLoad)
    }
})

function createPlayer(id,token) {
    return {
        id: id,
        token: token,
        wins: 0
    };
}

function loadPlayers() {
    for (var i = players.length; i > 0; i--) {
        [players[i],players[i-1]] = [players[i-1],[players[i]]]
    }
}

function initialLoad() {
    players.push(createPlayer(0,playerOneToken.innerText));
    players.push(createPlayer(1,playerTwoToken.innerText));
    loadPlayers();
    storePlayersData();
    displayGameStatus();
}

function storePlayersData() {
    localStorage.setItem('playerOneData',`${JSON.stringify(players[1])}`)
    localStorage.setItem('playerTwoData', `${JSON.stringify(players[2])}`)
}

function retrievePlayersData() {
    var retrievedPlayerOne = localStorage.getItem('playerOneData');
    var parsedPlayerOne = JSON.parse(retrievedPlayerOne)
    var retrievedPlayerTwo = localStorage.getItem('playerTwoData');
    var parsedPlayerTwo = JSON.parse(retrievedPlayerTwo)
    return players[1] = parsedPlayerOne, players[2] = parsedPlayerTwo;
}

function playerWinCheck() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if(winningCombinations[i]['1'].length === 3 || winningCombinations[i]['2'].length === 3 ) {
            return true;
        }
    }
    return false;
}

function determineWin() {
    if (playerWinCheck()) {
        players[playerTurn].wins += 1;
        storePlayersData();
        clearBoard();
    }
}

function placePlayerPieces() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].pieces.includes(currentPiece)) {
            winningCombinations[i][playerTurn].push(playerTurn)
        }
    }
}

function placeToken(e) {
    e.preventDefault();
    if (e.target.className === 'grid-item' && !gameBoard.includes(e.target.id)) {
      currentPiece = e.target.id;
      placePlayerPieces();
      gameBoard.push(e.target.id)
      e.target.innerText = players[playerTurn].token;
      determineWin();
      passTurn();
    }
    displayGameStatus();
    determineDraw();
}

function clearBoard () { 
    gameBoard = [];
    currentPiece = undefined;
    for (var i = 0; i < winningCombinations.length; i++) {
        winningCombinations[i]['1'] = [];
        winningCombinations[i]['2'] = [];
    }
    for (var i = 0; i < gameSquares.length; i++) {
        gameSquares[i].innerText = ""
    }
}

function determineDraw() {
    if (gameBoard.length === 9) {
        gameStatus.innerText = 'The game is a draw.'
        addDelayedMessage();
        clearBoard()
    }
}

function passTurn() {
    if (playerTurn % 2 === 0) {
        playerTurn = 1;
    }
    else if (!playerTurn % 2 === 0) {
        playerTurn = 2;
    }
}   

function displayGameStatus() {
    gameStatus.innerText = `It's ${players[playerTurn].token}'s turn`
    playerOneWins.innerText= `${players[1].wins} wins`
    playerTwoWins.innerText = `${players[2].wins} wins`
    if (currentPiece === undefined) {
        showWin();
    }
}

function addDelayedMessage() {
    setTimeout(function() {
        gameStatus.innerText = `It's ${players[playerTurn].token}'s turn`}, 2000)
}

function showWin() {
    passTurn();
    gameStatus.innerText = `${players[playerTurn].token} wins!`
    addDelayedMessage();
    passTurn();
}


