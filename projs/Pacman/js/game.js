'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
var gIntervalCherry;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
function init() {
  console.log('hello');
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard, 3);
  createSuperfoods();
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gIntervalCherry = setInterval(injectCherry, 10000);
}

function buildBoard() {
  var SIZE = 10;
  var gBoard = [];
  for (var i = 0; i < SIZE; i++) {
    gBoard.push([]);
    for (var j = 0; j < SIZE; j++) {
      gBoard[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        gBoard[i][j] = WALL;
      }
    }
  }
  return gBoard;
}

function updateScore(diff) {
  gGame.score += diff;
  if (gGame.score >= 100) {
    document.querySelector('h2 span').innerText = 'WINNER';
    gameOver(true);
    return;
  }
  document.querySelector('h2 span').innerText = gGame.score;
}
function restartGame() {
  //update the model
  gGame.score = 0;
  //update score value in dom
  updateScore(0);
  //remove popup
  dropModal();
  //inilitaze new game with 0 score
  init();
}
function gameOver(isWon) {
  var msg = isWon ? 'You Win!' : 'You Lose!';
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  createModal(msg);
}
