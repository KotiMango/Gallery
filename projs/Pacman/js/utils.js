var gDeadGhostsCnt = 0;
function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createModal(val) {
  strHTML = `<h1>${val} Click on the box in order to restart</h1>`;
  var elModal = document.querySelector('.modal');
  elModal.innerHTML = strHTML;
  elModal.style.display = 'block';
}
function dropModal() {
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
}
function countFood() {
  var currCell;
  var foodCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      currCell = gBoard[i][j];
      if (currCell === FOOD) foodCount++;
    }
  }
  return foodCount;
}
function getEmptySlots() {
  var currCell;
  var slots = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      currCell = gBoard[i][j];
      if (currCell === EMPTY) slots.push({ i, j });
    }
  }
  return slots;
}
function popGhost(loc, ghosts) {
  var currGhost;
  var idx = 0;
  for (var i = 0; i < ghosts.length; i++) {
    currGhost = ghosts[i];
    if (JSON.stringify(currGhost.location) === JSON.stringify(loc)) idx = i;
  }
  ghosts.splice(idx, 1);
  gDeadGhostsCnt++;
  return ghosts;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
