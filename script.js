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
const $modalInfo = document.getElementById("modal_info");
const $croix = document.getElementById("croix");
const $gameOver = document.getElementById("game_over");
const $gameOverRound = document.getElementById("game_over_round");
const $restartOver = document.getElementById("restart_over");
const $turn = document.getElementById("turn_div");
const $turnDisplay = document.getElementsByClassName("turn");

const sDo = new Audio("./sounds/T0.wav");
const sRe = new Audio("./sounds/T1.wav");
const sMi = new Audio("./sounds/T2.wav");
const sFa = new Audio("./sounds/T3.wav");

[...$buttons].map(ele => {
  ele.onclick = () => {
    if (playerTurn === true) {
      clickAnimation(ele, 300, Number(ele.id[ele.id.length - 1]));
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
  switchAnimationPlay();
  restartPossible = false;
  await wait(500);
  for (const [simonIndex, simonValue] of simonList.entries()) {
    clickAnimation($buttons[simonValue], speed, simonValue);
    if (simonIndex !== simonList.length - 1) {
      await wait(speed);
    }
  }
  restartPossible = true;
  playerTurn = true;
  switchAnimationPlay();
};

const clickAnimation = async (ele, speed, value) => {
  switch (value) {
    case 0:
      sDo.play();
      break;
    case 1:
      sRe.play();
      break;
    case 2:
      sMi.play();
      break;
    case 3:
      sFa.play();
      break;
  }
  ele.style.opacity = 0.5;
  await wait(speed);
  ele.style.opacity = 1;
};

const switchAnimationPlay = () => {
  switch ($turnDisplay[1].style.backgroundColor) {
    case "green":
      $turnDisplay[1].style.backgroundColor = "";
      $turnDisplay[0].style.backgroundColor = "green";
      break;
    case "":
      $turnDisplay[1].style.backgroundColor = "green";
      $turnDisplay[0].style.backgroundColor = "";
      break;
  }
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
  $gameOver.style.display = "initial";
  $gameOverRound.innerHTML =
    "Round : " +
    simonList.length +
    " Nombre de touches ce tour : " +
    (playerList.length - 1);
};

const resetPlayer = () => {
  playerList = [];
  playerTurn = false;
  $clicked.innerHTML = 0;
};

const restartGame = () => {
  if (restartPossible && !gameNotStarted) {
    $gameOver.style.display = "";
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
$restartOver.onclick = () => restartGame();
$start.onclick = () => startGame();

$info.onclick = () => {
  if ($modalInfo.style.display === "initial") {
    $modalInfo.style.display = "none";
  } else {
    $modalInfo.style.display = "initial";
  }
};
$croix.onclick = () => ($modalInfo.style.display = "none");
