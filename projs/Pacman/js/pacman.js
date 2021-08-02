'use strict';
const PACMAN = '😷';
var gNextCell;
var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function setSuper() {
  gPacman.isSuper = true;
  setTimeout(function () {
    gPacman.isSuper = false;
    for (var i = 0; i < gDeadGhostsCnt; i++) {
      createGhost(gBoard);
    }
    gDeadGhostsCnt = 0;
  }, 5000);
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  // console.log('ev', ev);
  var nextLocation = getNextLocation(ev);
  gNextCell = gBoard[nextLocation.i][nextLocation.j];

  if (!nextLocation) return;
  // console.log('nextLocation', nextLocation);

  // console.log('NEXT CELL', nextCell);

  if (gNextCell === WALL) return;
  if (gNextCell === FOOD) updateScore(1);
  if (gNextCell === CHERRY) updateScore(10);
  if (gNextCell === SUPERFOOD) {
    if (gPacman.isSuper) return;
    setSuper();
  } else if (gNextCell === GHOST) {
    if (!gPacman.isSuper) {
      renderCell(nextLocation, EMPTY);
      gameOver(false);
      renderCell(gPacman.location, EMPTY);
      return;
    } else {
      gGhosts = popGhost(nextLocation, gGhosts);
    }
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
