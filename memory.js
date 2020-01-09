const board = document.getElementById("board");
const boardLength = board.childElementCount;
const timer = document.getElementById("time");

window.onload = function() {
  createFronts();
  createBacks();
  timer.innerHTML += " 00:00";
};

let field1 = null;
let field2 = null;
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
    const front = document.createElement("div");
    front.classList.add("front");
    front.id = "front" + i;
    board.children[i].appendChild(front);
  }
}

function createBacks() {
  for (let i = 0; i < boardLength; i++) {
    const back = document.createElement("div");
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

function showColor(event) {
  if (field2 && field2) return;
  const clickedField = event.target;
  const color = clickedField.classList[1];
  clickedField.style = "background-color: " + color;
  if (field1) {
    field2 = clickedField;
    compareColor(field1, field2);
  } else {
    field1 = clickedField;
  }
}

function compareColor() {
  let color1 = field1.style.backgroundColor;
  let color2 = field2.style.backgroundColor;
  if (color1 === color2) {
    field1 = null;
    field2 = null;
    checkIfWin();
  } else {
    setTimeout(hideColor, 1000);
  }
}

function hideColor() {
  field1.style = "background-color: transparent";
  field2.style = "background-color: transparent";
  field1 = null;
  field2 = null;
}

function checkIfWin() {
  count = 0;
  const fields = Array.from(board.children);
  fields.forEach(child => {
    let backColor = child.lastElementChild.style.backgroundColor;
    if (backColor !== "transparent" && backColor !== "") count += 1;
  });
  if (count === 16) setTimeout(endGame, 500);
}

function endGame() {
  alert("BRAWO!");
}
