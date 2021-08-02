const SUPERFOOD = '°';
var gSuperFood;
const CHERRY = '🍒';
function createSuperfood(board, i, j) {
  gSuperFood = {
    location: {
      i,
      j,
    },
  };
  board[gSuperFood.location.i][gSuperFood.location.j] = SUPERFOOD;
}

function createSuperfoods() {
  createSuperfood(gBoard, 1, 1);
  createSuperfood(gBoard, 8, 1);
  createSuperfood(gBoard, 1, 8);
  createSuperfood(gBoard, 8, 8);
}
function createCherry(board, i, j) {
  gSuperFood = {
    location: {
      i,
      j,
    },
  };
  board[gSuperFood.location.i][gSuperFood.location.j] = CHERRY;
}

function injectCherry() {
  var slots = getEmptySlots();
  if (slots[0]) {
    var randSlot = slots[getRandomIntInt(0, slots.length)];
    console.log(randSlot);
    //updating model
    createCherry(gBoard, randSlot.i, randSlot.j);
    //update DOM
    renderCell(randSlot, CHERRY);
  } else return;
}
