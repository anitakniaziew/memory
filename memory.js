const board = document.getElementById("board");
const boardLength = board.childElementCount;
const timer = document.getElementById("time");
const field = null;

window.onload = function() {
  createFronts();
  createBacks();
  timer.innerHTML += " 00:00";
};
const usedColors = [];
let color1 = null;
let color2 = null;
let isField1Clicked = false;
let isField2Clicked = false;
let count = 0;

let colors = [
  "cyan",
  "crimson",
  "rebeccapurple",
  "yellowgreen",
  "orange",
  "sienna",
  "darkblue",
  "forestgreen",
  "cyan",
  "crimson",
  "rebeccapurple",
  "yellowgreen",
  "orange",
  "sienna",
  "darkblue",
  "forestgreen"
];

function createFronts() {
  for (let i = 0; i < boardLength; i++) {
    board.children[i].onclick = showColor;
    front = document.createElement("div");
    front.classList.add("front");
    front.id = "front" + i;
    board.children[i].appendChild(front);
  }
}

function createBacks() {
  for (let i = 0; i < boardLength; i++) {
    back = document.createElement("div");
    back.classList.add("back");
    back.classList.add(pickColor());
    back.id = "back" + i;
    board.children[i].appendChild(back);
  }
}

function pickColor() {
  let index = Math.floor(Math.random() * colors.length);
  let color = colors[index];
  colors.splice(index, 1);
  return color;
}

function showColor() {
  if ((!isField1Clicked, !isField2Clicked)) {
    const clickedField = event.target;
    const clickedFieldColor = clickedField.classList[1];
    clickedField.style = "background-color: " + clickedFieldColor;
    if (color1) {
      color2 = clickedFieldColor;
      field2 = clickedField;
      isField2Clicked = true;
      compareColor(color1, color2);
    } else {
      color1 = clickedFieldColor;
      field1 = clickedField;
      isField1Clicked = true;
    }
  }
}

function compareColor() {
  if (color1 === color2) {
    color1 = null;
    color2 = null;
    isField1Clicked = false;
    isField2Clicked = false;
    checkIfWin();
  } else {
    setTimeout(hideColor, 1000);
  }
}

function hideColor() {
  color1 = null;
  color2 = null;
  isField1Clicked = false;
  isField2Clicked = false;
  field1.style = "background-color: transparent";
  field2.style = "background-color: transparent";
}

function checkIfWin() {
  count = 0;
  for (let i = 0; i < boardLength; i++) {
    if (
      board.children[i].lastElementChild.style.backgroundColor !==
        "transparent" &&
      board.children[i].lastElementChild.style.backgroundColor !== ""
    )
      count += 1;
  }
  if (count === 16) setTimeout(endGame, 500);
}

function endGame() {
  alert("BRAWO!");
}
