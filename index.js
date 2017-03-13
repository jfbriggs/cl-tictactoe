var board = require('./board');
var prompt = require('prompt');

prompt.start();

var cells = {
  '1': ' ',
  '2': ' ',
  '3': ' ',
  '4': ' ',
  '5': ' ',
  '6': ' ',
  '7': ' ',
  '8': ' ',
  '9': ' '
};

var players = {
  'X': [],
  'O': []
};

var currentPlayer = 'X';

var beginTurn = function() {
  console.log('Player ' + currentPlayer + ', your turn.  Select a space (First row: 1-3, second row: 4-6, third row: 7-9).');
  console.log('=============\n| ' + cells['1'] + ' | ' + cells['2'] + ' | ' + cells['3'] + ' |\n=============\n| ' + cells['4'] + ' | ' + cells['5'] + ' | ' + cells['6'] + ' |\n=============\n| ' + cells['7'] + ' | ' + cells['8'] + ' | ' + cells['9'] + ' |\n=============');

  prompt.get(['Choose a space'], function(err, result) {
    var space = result['Choose a space'].toString();
    cells[space] = currentPlayer;

    players[currentPlayer].push(space);

    if (checkWin(currentPlayer)) {
      console.log('=============\n| ' + cells['1'] + ' | ' + cells['2'] + ' | ' + cells['3'] + ' |\n=============\n| ' + cells['4'] + ' | ' + cells['5'] + ' | ' + cells['6'] + ' |\n=============\n| ' + cells['7'] + ' | ' + cells['8'] + ' | ' + cells['9'] + ' |\n=============');
      console.log('Player ' + currentPlayer + ' wins!  Thanks for playing.');
      return;
    }

    if (players.X.length + players.O.length === 9) {
      console.log('This game is a draw!  Thanks for playing!');
      return;
    }

    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    beginTurn();
  });
  
};

beginTurn();

// ============= Check if the current player is a winner after each turn

var combos = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
];


var checkWin = function(player) {
  // check a player's accumulated cells array to see if they have a winning combination

  // if a player has placed at least 3 pieces
  if (players[player].length > 2) {
    // iterate through combos
    for (var i = 0; i < combos.length; i++) {
      // iterate through combo to see if elements exist in a player's pieces
      for (var j = 0; j < combos[i].length; j++) {
        if (!players[player].includes(combos[i][j])) {
          break;
        } else {
          if (j === 2) {
            return true;
          }
        }
      }
    }
    return false;
  }
}