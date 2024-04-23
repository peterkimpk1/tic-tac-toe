import { placeToken, displayGameStatus, displayWinStatus, displayDrawStatus, clearGameSquares} from './domUpdates.js'
export { gameData }

var playerOneToken = document.querySelector('.player-one-icon');
var playerTwoToken = document.querySelector('.player-two-icon');
var gameBoardContainer = document.querySelector('.grid-container');
var gameBoard = [];
var players = [];
var gameData = {
    players: players,
    gameBoard: gameBoard
}
var winningCombinations = [
    {pieces:['one','two','three'],1:[],2:[]}, 
    {pieces:['four','five','six'],1:[],2:[]}, 
    {pieces:['seven','eight','nine'],1:[],2:[]}, 
    {pieces:['one','four','seven'],1:[],2:[]}, 
    {pieces:['two','five','eight'],1:[],2:[]},
    {pieces:['three','six','nine'],1:[],2:[]},
    {pieces:['one','five','nine'],1:[],2:[]},
    {pieces:['three','five','seven'],1:[],2:[]}];

gameBoardContainer.addEventListener('click', updateGameBoard)
window.addEventListener('load', initialLoad)
window.addEventListener('DOMContentLoaded', (event) => {
    if ((localStorage.getItem('playerOneData')) && (localStorage.getItem('playerOneData').wins !== 0 && localStorage.getItem('playerTwoData').wins !== 0)) {
        retrievePlayersData();
        displayGameStatus();
        window.removeEventListener('load',initialLoad)
    }   
})

function createPlayer(id,token) {
    return {
        id: id,
        token: token,
        wins: 0,
    };
}

function loadPlayers() {
    for (var i = players.length; i > 0; i--) {
        [players[i],players[i-1]] = [players[i-1],[players[i]]]
    }
    players[0] = 1;
}

function initialLoad() {
    players.push(createPlayer(0,playerOneToken.innerText));
    players.push(createPlayer(1,playerTwoToken.innerText));
    loadPlayers();
    storePlayersData();
    updateGameData(players);
    displayGameStatus();
}

function storePlayersData() {
    localStorage.setItem('playerTurnData', `${JSON.stringify(players[0])}`)
    localStorage.setItem('playerOneData',`${JSON.stringify(players[1])}`)   
    localStorage.setItem('playerTwoData', `${JSON.stringify(players[2])}`)
}

function retrievePlayersData() {
    var parsedPlayerTurn = JSON.parse(localStorage.getItem('playerTurnData'))
    var parsedPlayerOne = JSON.parse(localStorage.getItem('playerOneData'))
    var parsedPlayerTwo = JSON.parse(localStorage.getItem('playerTwoData'))
    return players[0] = parsedPlayerTurn, players[1] = parsedPlayerOne, players[2] = parsedPlayerTwo;
}

function playerWinCheck() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if(winningCombinations[i][['1']].length === 3 || winningCombinations[i]['2'].length === 3 ) {
            return true;
        }
    }
    return false;
}

function determineWin() {
    if (playerWinCheck()) {
        players[(players[0])].wins += 1;
        passTurn();
        storePlayersData();
        updateGameData(players);
        passTurn();
    }
}

function storePlayerPieces() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].pieces.includes(gameBoard[gameBoard.length-1])) {
            winningCombinations[i][(players[0])].push(players[0])
        }
    }
}

function updateGameBoard(e) {
    e.preventDefault();
    if (e.target.className === 'grid-item' && !gameBoard.includes(e.target.id)) {
      gameBoard.push(e.target.id)
      updateGameData(players,gameBoard)
      storePlayerPieces();
      placeToken();
      determineWin();
      passTurn();
    }
    displayGameStatus();
    if (playerWinCheck()) {
        passTurn();
        displayWinStatus();
        passTurn();
        clearBoard();
    }
    else if (gameBoard.length === 9) {
        displayDrawStatus();
        clearBoard();
    } 
}

function clearBoard() { 
    gameBoard = [];
    for (var i = 0; i < winningCombinations.length; i++) {
        winningCombinations[i]['1'] = [];
        winningCombinations[i]['2'] = [];
    }
    clearGameSquares();
}

function passTurn() {
    if (players[0] % 2 === 0) {
        players[0] = 1;
    }
    else if (!players[0] % 2 === 0) {
        players[0] = 2;
    }
}   

function updateGameData(playerData,gameBoard) {
    gameData.players = playerData;
    gameData.gameBoard = gameBoard;
}


