"use strict";

// Pieces Types
const PAWN_BLACK = "♟";
const ROOK_BLACK = "♜";
const KNIGHT_BLACK = "♞";
const BISHOP_BLACK = "♝";
const QUEEN_BLACK = "♛";
const KING_BLACK = "♚";
const PAWN_WHITE = "♙";
const ROOK_WHITE = "♖";
const KNIGHT_WHITE = "♘";
const BISHOP_WHITE = "♗";
const QUEEN_WHITE = "♕";
const KING_WHITE = "♔";

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
  gBoard = buildBoard();
  // console.table(gBoard);
  renderBoard(gBoard);
}

function buildBoard() {
  var board = [];
  // build the board 8 * 8
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      var piece = "";
      if (i === 1) piece = PAWN_BLACK;
      if (i === 6) piece = PAWN_WHITE;
      board[i][j] = piece;
    }
  }

  board[0][0] = board[0][7] = ROOK_BLACK;
  board[0][1] = board[0][6] = KNIGHT_BLACK;
  board[0][2] = board[0][5] = BISHOP_BLACK;
  board[0][3] = QUEEN_BLACK;
  board[0][4] = KING_BLACK;

  board[7][0] = board[7][7] = ROOK_WHITE;
  board[7][1] = board[7][6] = KNIGHT_WHITE;
  board[7][2] = board[7][5] = BISHOP_WHITE;
  board[7][3] = QUEEN_WHITE;
  board[7][4] = KING_WHITE;

  // console.table(board);
  return board;
}

function renderBoard(board) {
  var strHtml = "";
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    strHtml += "<tr>";
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      // figure class name
      var className = (i + j) % 2 === 0 ? "white" : "black";
      var tdId = "cell-" + i + "-" + j;
      strHtml +=
        '<td id="' +
        tdId +
        '" onclick="cellClicked(this)" ' +
        'class="' +
        className +
        '">' +
        cell +
        "</td>";
    }
    strHtml += "</tr>";
  }
  var elMat = document.querySelector(".game-board");
  elMat.innerHTML = strHtml;
}

function cellClicked(elCell) {
  // TODO: if the target is marked - move the piece!
  if (elCell.classList.contains("mark")) {
    // console.log('move!');
    // console.log('gSelectedElCell', gSelectedElCell)
    // console.log('elCell', elCell);
    movePiece(gSelectedElCell, elCell);
    cleanBoard();
    return;
  }
  cleanBoard();

  elCell.classList.add("selected");
  gSelectedElCell = elCell;

  // console.log('elCell.id: ', elCell.id);
  var cellCoord = getCellCoord(elCell.id);
  // console.log('cellCoord', cellCoord);
  var piece = gBoard[cellCoord.i][cellCoord.j];
  // console.log('piece', piece);
  var possibleCoords = [];
  switch (piece) {
    case ROOK_BLACK:
    case ROOK_WHITE:
      possibleCoords = getAllPossibleCoordsRook(cellCoord);
      console.log(possibleCoords);
      break;
    case BISHOP_BLACK:
    case BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(cellCoord);
      break;
    case KNIGHT_BLACK:
    case KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(cellCoord);
      break;
    case PAWN_BLACK:
    case PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(
        cellCoord,
        piece === PAWN_WHITE
      );
      break;
    case QUEEN_BLACK:
    case QUEEN_WHITE:
      possibleCoords = getAllPossibleCoordsQueen(cellCoord);
      break;
  }
  markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
  // use: getCellCoord to get the coords, move the piece
  var fromCoord = getCellCoord(elFromCell.id);
  var toCoord = getCellCoord(elToCell.id);
  // update the MODEl
  var piece = gBoard[fromCoord.i][fromCoord.j];
  gBoard[fromCoord.i][fromCoord.j] = "";
  gBoard[toCoord.i][toCoord.j] = piece;

  // update the DOM
  elFromCell.innerText = "";
  elToCell.innerText = piece;
}

function markCells(coords) {
  // console.log('coords', coords);
  // query select them one by one and add mark
  for (var i = 0; i < coords.length; i++) {
    var coord = coords[i];
    // console.log('coord', coord)
    var selector = getSelector(coord);
    // console.log('selector', selector)
    var elCell = document.querySelector(selector);
    // console.log('elCell', elCell)
    elCell.classList.add("mark");
  }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
  var coord = {};
  var parts = strCellId.split("-");
  coord.i = +parts[1];
  coord.j = +parts[2];
  return coord;
}

function cleanBoard() {
  var elTds = document.querySelectorAll(".mark, .selected");
  for (var i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove("mark", "selected");
  }
}

function getSelector(coord) {
  // {i:3 , j:5}
  return "#cell-" + coord.i + "-" + coord.j; // #cell-3-5
}

function isEmptyCell(coord) {
  return gBoard[coord.i][coord.j] === "";
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
  var res = [];
  // handle PAWN use isEmptyCell()
  var diff = isWhite ? -1 : 1;
  var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
  if (isEmptyCell(nextCoord)) res.push(nextCoord);
  else return res;

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
  }

  return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
  var res = [];
  var x = pieceCoord.j;
  var y = pieceCoord.i;
  var nextCoord;
  for (var vertical = 0; vertical <= 7; vertical++) {
    nextCoord = { i: vertical, j: x };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
  }
  for (var horizontal = 0; horizontal <= 7; horizontal++) {
    nextCoord = { i: y, j: horizontal };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
  }
  return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
  var res = [];
  var i = pieceCoord.i - 1;
  for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
    var coord = { i: i--, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  return res;
}
function getAllPossibleCoordsQueen(pieceCoord) {
  var res = [];
  var i = pieceCoord.i - 1;
  var coord;
  for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
    coord = { i: i--, j: idx };
    if (isEmptyCell(coord)) res.push(coord);
  }
  for (var idx = pieceCoord.j - 1; i >= 0 && idx < 8; idx--) {
    coord = { i: i--, j: idx };
    if (isEmptyCell(coord)) res.push(coord);
  }
  var y = pieceCoord.i;
  var x = pieceCoord.j;
  for (var vertical = 0; vertical <= 7; vertical++) {
    coord = { i: vertical, j: x };
    if (isEmptyCell(coord)) res.push(coord);
  }
  for (var horizontal = 0; horizontal <= 7; horizontal++) {
    coord = { i: y, j: horizontal };
    if (isEmptyCell(coord)) res.push(coord);
  }

  return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
  var res = [];
  var x = pieceCoord.j;
  var y = pieceCoord.i;
  var knightMoves = [
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
  ];
  var currMove;
  var row;
  var column;
  var nextCoord;
  for (var m = 0; m < knightMoves.length; m++) {
    currMove = knightMoves[m];
    row = currMove.y + y;
    column = currMove.x + x;
    if (row > 7 || row < 0 || column > 7 || column < 0) {
      continue;
    }
    nextCoord = { i: row, j: column };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
  }
  return res;
}
