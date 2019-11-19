let playerList = [];
let simonList = [];
let playerTurn = false;
let speed = 1000;
let restartPossible = true;

const $buttons = document.querySelectorAll(".button");
const $start = document.getElementById("start");
const $restart = document.getElementById("restart");

[...$buttons].map(ele => {
  ele.onclick = () => {
    if (playerTurn === true) {
      newPlayerTurn(ele);
      switch (verifList()) {
        case 0:
          gameOver();
          break;
        case 1:
          resetPlayer();
          newSimonTurn();
          displaySimonTurn();
          break;
        case 2:
          console.log("click another");
          break;
      }
    }
  };
});

const wait = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const newSimonTurn = () => {
  let randomNumber = Math.floor(Math.random() * Math.floor(4));
  simonList.push(randomNumber);
};

const displaySimonTurn = async () => {
  restartPossible = false;
  for (const [simonIndex, simonValue] of simonList.entries()) {
    let tempoColor = $buttons[simonValue].style.backgroundColor;
    $buttons[simonValue].style.backgroundColor = "black";
    await wait(speed);
    $buttons[simonValue].style.backgroundColor = tempoColor;
    if (simonIndex !== simonList.length - 1) {
      await wait(speed);
    }
  }
  restartPossible = true;
  playerTurn = true;
};

const newPlayerTurn = ele => {
  playerList.push(Number(ele.id[ele.id.length - 1]));
};

const verifList = () => {
  if (playerList[playerList.length - 1] === simonList[playerList.length - 1]) {
    return playerList.length === simonList.length ? 1 : 2;
  } else {
    return 0;
  }
};

const gameOver = () => {
  console.log("Game Over");
};

const resetPlayer = () => {
  playerList = [];
  playerTurn = false;
};

const restartGame = () => {
  if (restartPossible) {
    simonList = [];
    speed = 1000;
    resetPlayer();
    startGame();
  }
};

const startGame = () => {
  newSimonTurn();
  displaySimonTurn();
};

$restart.onclick = () => restartGame();
$start.onclick = () => startGame();
