let playerList = [];
let simonList = [];
let playerTurn = false;
let speed = 1000;
let gameNotStarted = true;
let restartPossible = true;

const $buttons = document.querySelectorAll(".button");
const $start = document.getElementById("start");
const $restart = document.getElementById("restart");
const $round = document.getElementById("round");
const $clicked = document.getElementById("clicked");
const $info = document.getElementById("info");
const $modal_info = document.getElementById("modal_info");
const $croix = document.getElementById("croix");

[...$buttons].map(ele => {
  ele.onclick = () => {
    if (playerTurn === true) {
      clickAnimation(ele);
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
          $clicked.innerHTML = playerList.length;
          break;
      }
    }
  };
});

const wait = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const speedUp = () => {
  if (simonList.length <= 8) {
    speed *= 0.8;
  }
};

const newSimonTurn = () => {
  let randomNumber = Math.floor(Math.random() * Math.floor(4));
  simonList.push(randomNumber);
  $round.innerHTML = simonList.length;
  speedUp();
};

const displaySimonTurn = async () => {
  restartPossible = false;
  for (const [simonIndex, simonValue] of simonList.entries()) {
    let tempoColor = "";
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
  $clicked.innerHTML = 0;
};

const restartGame = () => {
  if (restartPossible && !gameNotStarted) {
    simonList = [];
    speed = 1000;
    gameNotStarted = true;
    $round.innerHTML = 0;
    resetPlayer();
    startGame();
  }
};

const startGame = () => {
  if (gameNotStarted) {
    gameNotStarted = false;
    newSimonTurn();
    displaySimonTurn();
  }
};

$restart.onclick = () => restartGame();
$start.onclick = () => startGame();

$info.onclick = () => {
  if ($modal_info.style.display === "initial") {
    $modal_info.style.display = "none";
  } else {
    $modal_info.style.display = "initial";
  }
};
$croix.onclick = () => ($modal_info.style.display = "none");
