//player  vs player
const inputElement = document.querySelector("#input");
const formElement = document.querySelector("form");
const winscoreElement = document.querySelector(".winScore");

const p1BtnElm = document.querySelector(".p1btn");
const p2BtnElm = document.querySelector(".p2btn");
const p1ScoreElm = document.querySelector(".p1Score");
const p2ScoreElm = document.querySelector(".p2Score");
const resetElm = document.querySelector(".resetbtn");

// console.log(formElement);

//data layer (DOM)
let winScore = 10;
let p1Score = 0;
let p2Score = 0;
let turn = "player1";

winscoreElement.textContent = winScore;
p1ScoreElm.textContent = p1Score;
p2ScoreElm.textContent = p2Score;

function generateRandomNum(max) {
  return Math.floor(Math.random() * max + 1);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  //validation of input number
  const inputValue = Number(inputElement.value);
  if (inputValue === "" || inputValue < 1) {
    if (!document.querySelector(".invalid-input")) {
      formElement.insertAdjacentHTML(
        "beforebegin",
        '<p class="invalid-input">Please input valid number </p>'
      );
      p1BtnElm.setAttribute("disabled", "disabled");
      p2BtnElm.setAttribute("disabled", "disabled");
    }
  } else {
    if (document.querySelector(".invalid-input")) {
      document.querySelector(".invalid-input").remove();
    }
    //   setting data layer
    winScore = Number(inputElement.value);

    // setting view layer
    winscoreElement.textContent = winScore;

    //clear input field
    inputElement.value = "";

    //change to all default
    initialPlayState();
  }
});

//player -1 button
p1BtnElm.addEventListener("click", (e) => {
  if (turn === "player1") {
    p1Score = generateRandomNum(winScore);
    p1ScoreElm.textContent = p1Score;
    turn = "player2";
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.removeAttribute("disabled");

    //check winning score
    checkWinner();
  }
});

function checkWinner() {
  const isP1Winner = winScore === p1Score;
  const isP2Winner = winScore === p2Score;
  if (isP1Winner || isP2Winner) {
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  }

  displayWinner(isP1Winner, isP2Winner);
}

function displayWinner(p1WinState, p2WinState) {
  if (p1WinState) {
    formElement.insertAdjacentHTML(
      "beforebegin",
      "<p class='winnerMes'>Player-1 is Winner</p>"
    );
  } else if (p2WinState) {
    formElement.insertAdjacentHTML(
      "beforebegin",

      "<p class='winnerMes'>Player-2 is Winner</p>"
    );
  }
}

//palayer -2 button
p2BtnElm.addEventListener("click", (e) => {
  if (turn === "player2") {
    p2Score = generateRandomNum(winScore);
    p2ScoreElm.textContent = p2Score;
    turn = "player1";
    p2BtnElm.setAttribute("disabled", "disabled");
    p1BtnElm.removeAttribute("disabled");
  }
});

resetElm.addEventListener("click", (e) => {
  winScore = 10;
  initialPlayState();
});

function initialPlayState() {
  p1Score = 0;
  p2Score = 0;
  winscoreElement.textContent = winScore;
  p1ScoreElm.textContent = p1Score;
  p2ScoreElm.textContent = p2Score;
  p1BtnElm.removeAttribute("disabled");
  p2BtnElm.removeAttribute("disabled");
  //reset winning tag
  if (document.querySelector(".winnerMes")) {
    document.querySelector(".winnerMes").remove();
  }
}















