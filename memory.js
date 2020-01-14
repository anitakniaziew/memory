const board = document.getElementById("board");
const boardLength = board.childElementCount;
const timer = document.getElementById("time");

let field1 = null;
let field2 = null;
let secondsCounter = 0;
let minutesCounter = 0;

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

let usedColors = [];

window.onload = setBoard;
let timeInterval = setInterval(countTime, 1000);

function setBoard() {
  createFronts();
  createBacks();
  timer.innerHTML = "00:00";
}

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
  let randomColor = colors[index];
  colors.splice(index, 1);
  usedColors.push(randomColor);
  return randomColor;
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
  let count = 0;
  const fields = Array.from(board.children);
  fields.forEach(child => {
    let backColor = child.lastElementChild.style.backgroundColor;
    if (backColor !== "transparent" && backColor !== "") count += 1;
  });
  if (count === 16) setTimeout(endGame, 500);
}

function countTime() {
  let lineLength = timer.innerText.length;
  let minutes = timer.innerText.substr(0, lineLength - 3);
  let seconds = timer.innerText.substr(3, lineLength - 1);
  secondsCounter += 1;
  if (secondsCounter < 10) {
    seconds = "0" + secondsCounter;
    timer.innerText = minutes + ":" + seconds;
  } else if (secondsCounter >= 10 && secondsCounter < 60) {
    seconds = secondsCounter;
    timer.innerText = minutes + ":" + seconds;
  } else if (secondsCounter === 60) {
    secondsCounter = 0;
    minutesCounter += 1;
    if (parseInt(minutes) < 4) {
      console.log(parseInt(minutes));
      minutes = "0" + minutesCounter;
      timer.innerText = minutes + ":00";
    } else {
      alert("Are you still there??? Let's just try again!");
      restartGame();
    }
  }
}

function endGame() {
  alert("BRAWO!");
  restartGame();
}

function restartGame() {
  clearInterval(timeInterval);
  field1 = null;
  field2 = null;
  minutesCounter = 0;
  secondsCounter = 0;
  colors = usedColors;
  usedColors = [];
  for (let index in board.children) {
    board.children[index].innerHTML = "";
  }
  setBoard();
  timeInterval = setInterval(countTime, 1000);
}
