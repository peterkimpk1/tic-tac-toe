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
};

var playerTwo = {
    id: 1,
    token: playerTwoToken.innerText,
    wins: 0,
};

var players = [playerOne, playerTwo]
var playerTurn = 1;
var currentPiece;
var winningCombinations = [{pieces:['one','two','three'],1:[],2:[]},{pieces:['four','five','six'],1:[],2:[]},{pieces:['seven','eight','nine'],1:[],2:[]},{pieces:['one','four','seven'],1:[],2:[]},{pieces:['two','five','eight'],1:[],2:[]},{pieces:['three','six','nine'],1:[],2:[]},{pieces:['one','five','nine'],1:[],2:[]},{pieces:['three','five','seven'],1:[],2:[]}]
gameBoardContainer.addEventListener('click', placeToken)

function playerOneWinCheck() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if(winningCombinations[i]['1'].length === 3) {
            return true;
        }
    }
    return false;
}

function playerTwoWinCheck() {
    for (var i = 0; i < winningCombinations.length; i++) {
        if(winningCombinations[i]['2'].length === 3) {
            return true;
        }
    }
    return false;
}

function determineWin() {
    if (playerOneWinCheck() || playerTwoWinCheck()) {
        players[playerTurn-1].wins += 1;
        playerOneWins.innerText= `${playerOne.wins} wins`
        playerTwoWins.innerText = `${playerTwo.wins} wins`
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
      e.target.innerText = players[playerTurn-1].token;
      determineWin();
      determineTurn();
      displayGameStatus();
      determineDraw();
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
    if (playerTurn % 2 === 0) {
        playerTurn = 1;
    }
    else if (!playerTurn % 2 === 0) {
        playerTurn = 2;
    }
}   

function displayGameStatus() {
    gameStatus.innerText = `It's ${players[playerTurn-1].token}'s turn`
}

displayGameStatus();

// function determineWin() {
//     var playerPieces = players[playerTurn-1].placedPieces
//     if((playerPieces.includes('one') && playerPieces.includes('two') && playerPieces.includes('three')) || (playerPieces.includes('four') && playerPieces.includes('five') && playerPieces.includes('six')) || (playerPieces.includes('seven') && playerPieces.includes('eight') && playerPieces.includes('nine')) || (playerPieces.includes('one') && playerPieces.includes('four') && playerPieces.includes('seven')) || (playerPieces.includes('two') && playerPieces.includes('five') && playerPieces.includes('eight')) || (playerPieces.includes('three') && playerPieces.includes('six') && playerPieces.includes('nine')) || (playerPieces.includes('one') && playerPieces.includes('five') && playerPieces.includes('nine')) || (playerPieces.includes('three') && playerPieces.includes('five') && playerPieces.includes('seven'))) {
//         players[playerTurn-1].wins += 1;
        // playerOneWins.innerText= `${playerOne.wins} wins`
        // playerTwoWins.innerText = `${playerTwo.wins} wins`
        // clearBoard();
//     }
// }
