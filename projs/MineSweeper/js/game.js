'use-strict';
var gBoard;
var gLevel;
var gGame;
var gFlagMineCount;
var gMisFlagCount;
var gCurrAvatar;
var gDiff = 1;
var gInterval;
const AVATARS = {
  BOMB: '💣',
  FLAG: '🚩',
  EMPTY: '',
  HEART: '<img src="./img/heart-icon_34407.ico" alt="" />',
  NORMAL: '😀',
  LOSE: '🤯',
  COOL: '😎',
};
function initGame() {
  switch (gDiff) {
    case 1:
      gLevel = {
        SIZE: 4,
        MINES: 2,
        LivesCnt: 1,
      };
      break;
    case 2:
      gLevel = {
        SIZE: 8,
        MINES: 12,
        LivesCnt: 3,
      };
      break;
    case 3:
      gLevel = {
        SIZE: 12,
        MINES: 30,
        LivesCnt: 4,
      };
      break;
    case 4:
      gLevel = {
        SIZE: 20,
        MINES: 100,
        LivesCnt: 8,
      };
      break;

    default:
      break;
  }
  gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isMines: false,
    isHint: false,
    undos: [],
    isMinePlanning: false,
    userGenMines: 0,
    safeClicks: 3,
  };
  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE);
  console.log(gBoard);
  renderBoard(gBoard);
  renderLives(gLevel.LivesCnt);
  setAvatar('normal');
  clearInterval(gInterval);
}
function iniateInterval() {
  gInterval = setInterval(timer, 10);
}
function timer() {
  var elTimer = document.querySelector('.timer');
  elTimer.innerText = gGame.secsPassed.toFixed(3);
  gGame.secsPassed = gGame.secsPassed + 0.01;
}

function setMinesNegsCount(board, yIdx, xIdx) {
  for (var i = yIdx - 1; i <= yIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = xIdx - 1; j <= xIdx + 1; j++) {
      if (j < 0 || (i === yIdx && j === xIdx) || j >= board[0].length) continue;
      board[i][j].minesAroundCount++;
    }
  }
}

function cellMarked(elCell, i, j) {
  var cell = gBoard[i][j];
  if (!gGame.isOn || cell.isShown) return;
  cell.isMarked = !cell.isMarked;
  var cellValue = cell.isMarked ? AVATARS.FLAG : AVATARS.EMPTY;

  elCell.classList.toggle('clickable');
  elCell.innerHTML = cellValue;
  gGame.markedCount += cell.isMarked ? 1 : -1;
  checkGameOver(gBoard);
}
function addMines(board, mineCnt, yIdx, xIdx) {
  for (var i = 0; i < mineCnt; i++) {
    var rndY = getRandomIntegerInclusive(0, board.length - 1);
    var rndX = getRandomIntegerInclusive(0, board[0].length - 1);
    var cell = board[rndY][rndX];
    if ((rndY === yIdx && rndX === xIdx) || cell.isMine) {
      i--;
      continue;
    }
    cell.isMine = true;
    setMinesNegsCount(board, rndY, rndX);
  }
  iniateInterval();
}
function setMines(yIdx, xIdx) {
  var cell = gBoard[yIdx][xIdx];
  cell.isMine = true;
  gGame.userGenMines++;
}
function initiateMines(elBtn) {
  if (elBtn.classList.contains('toggle')) {
    elBtn.classList.remove('toggle');
  } else {
    elBtn.classList.add('toggle');
  }
  gGame.isMinePlanning = !gGame.isMinePlanning;
  if (!gGame.isMinePlanning) {
    gGame.isMines = true;
  }
}

function cellClicked(elCell, i, j) {
  var copyBoard = copyMat(gBoard);
  gGame.undos.push(copyBoard);
  var cell = gBoard[i][j];
  if (!gGame.isOn || cell.isShown || cell.isMarked) return;
  if (gGame.isMinePlanning) {
    setMines(i, j);
    return;
  }
  if (!gGame.isMines) {
    addMines(gBoard, gLevel.MINES, i, j);
    gGame.isMines = true;
  }
  if (gGame.isHint) {
    getHintElements(gBoard, i, j);
    return;
  }
  cell.isShown = true;
  gGame.shownCount++;
  var cellValue = cell.isMine
    ? AVATARS.BOMB
    : cell.minesAroundCount > 0
    ? cell.minesAroundCount
    : AVATARS.EMPTY;
  elCell.innerHTML = cellValue;
  elCell.classList.remove('clickable');
  elCell.classList.add('clicked', 'val-' + cell.minesAroundCount);
  cellValue === AVATARS.EMPTY ? expandShown(gBoard, i, j) : gGame.shownCount;
  var liveCnt = checkGameOver(gBoard);
  if (cell.isMine && liveCnt > 0) {
    renderLives(liveCnt);
    setTimeout(function () {
      setAvatar('normal');
    }, 1000);
    setAvatar('lose');
  } else {
    renderLives(liveCnt);
  }
}

function safeClick(elBtn) {
  var emptyIndcies = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j];
      var elCell = document.querySelector(`.cell-${i}-${j}`);
      if (!cell.isShown && !cell.isMine) {
        emptyIndcies.push({ elCell, i, j });
      } else {
        continue;
      }
    }
  }
  var randInt = getRandomIntegerInclusive(0, emptyIndcies.length);
  var idx = emptyIndcies[randInt];
  if (idx && gGame.safeClicks > 0) {
    cellClicked(idx.elCell, idx.i, idx.j);
    gGame.safeClicks--;
    elBtn.innerHTML = gGame.safeClicks + '-Remaining';
  }
}
function checkGameOver(board) {
  var liveCnt = gLevel.LivesCnt;
  var mineCnt = gGame.userGenMines ? gGame.userGenMines : gLevel.MINES;
  gFlagMineCount = 0;
  gMisFlagCount = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      currCell = board[i][j];
      if (currCell === undefined) return;
      if (currCell.isShown && currCell.isMine) {
        if (liveCnt <= 1) {
          // alert('You Lost');
          setAvatar('lose');
          gGame.isOn = false;
          liveCnt--;
          getGameElements(gBoard, AVATARS.BOMB);
          clearInterval(gInterval);
        } else {
          mineCnt--;
          liveCnt--;
        }
      }
      if (currCell.isMarked && !currCell.isMine) gMisFlagCount++;
      if (currCell.isMarked && currCell.isMine) gFlagMineCount++;
    }
  }
  if (gFlagMineCount === mineCnt && !gMisFlagCount) {
    setTimeout(function () {
      // alert('You Won');
      setAvatar('cool');
      gGame.isOn = false;
      clearInterval(gInterval);
    }, 300);
  }
  return liveCnt;
}

function expandShown(board, yIdx, xIdx) {
  for (var i = yIdx - 1; i <= yIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = xIdx - 1; j <= xIdx + 1; j++) {
      var cell = board[i][j];
      if (
        j < 0 ||
        (i === yIdx && j === xIdx) ||
        j >= board[0].length ||
        cell.isMine
      )
        continue;
      var elCell = document.querySelector(`.cell-${i}-${j}`);
      cellClicked(elCell, i, j);
    }
  }
}

function setAvatar(avatarKind) {
  var elAvatar = document.querySelector('.smiley');
  switch (avatarKind) {
    case 'normal':
      elAvatar.innerHTML = AVATARS.NORMAL;
      gCurrAvatar = AVATARS.NORMAL;
      break;
    case 'lose':
      elAvatar.innerHTML = AVATARS.LOSE;
      gCurrAvatar = AVATARS.LOSE;
      break;
    case 'cool':
      elAvatar.innerHTML = AVATARS.COOL;
      gCurrAvatar = AVATARS.COOL;
      break;

    default:
      break;
  }
}

function changeDiff(diff) {
  gDiff = diff;
  initGame();
}
function getGameElements(board, element) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      var currElCell = document.querySelector(`.cell-${i}-${j}`);
      if (currCell.isMine) {
        currCell.isShown = true;
        currElCell.innerHTML = element;
        currElCell.style.backgroundColor = 'red';
      }
    }
  }
}

function toggleIsHint(elBulb) {
  if (!gGame.shownCount) {
    alert('Hints can be taken only when first clicked on the board');
    return;
  } else if (!elBulb.classList.contains('glow')) {
    if (!gGame.isOn) return;
  }
  gGame.isHint = !gGame.isHint;
  if (!gGame.isHint) {
    elBulb.classList.remove('glow');
  } else {
    elBulb.classList.add('glow');
  }
}

function getHintElements(board, yIdx, xIdx) {
  var peekCells = [];
  for (var i = yIdx - 1; i <= yIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = xIdx - 1; j <= xIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      var currCell = board[i][j];
      var currElCell = document.querySelector(`.cell-${i}-${j}`);
      if (currCell.isShown) continue;
      peekCells.push({ i, j });
      var cellValue = currCell.isMine
        ? AVATARS.BOMB
        : currCell.minesAroundCount > 0
        ? currCell.minesAroundCount
        : AVATARS.EMPTY;
      currElCell.innerHTML = cellValue;
      currElCell.classList.remove('clickable');
      currElCell.classList.add('clicked', `num${currCell.minesAroundCount}`);
    }
  }
  setTimeout(function () {
    for (var k = 0; k < peekCells.length; k++) {
      i = peekCells[k].i;
      j = peekCells[k].j;
      var currElPeekCell = document.querySelector(`.cell-${i}-${j}`);
      currElPeekCell.innerHTML = AVATARS.EMPTY;
      currElPeekCell.classList.add('clickable');
      currElPeekCell.classList.remove('clicked');
    }
    var elBulb = document.querySelector('.bulb');
    toggleIsHint(elBulb);
  }, 1000);
}
