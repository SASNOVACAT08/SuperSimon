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
  switchAnimationPlay();
  restartPossible = false;
  await wait(300);
  for (const [simonIndex, simonValue] of simonList.entries()) {
    $buttons[simonValue].style.backgroundColor = "black";
    await wait(speed);
    $buttons[simonValue].style.backgroundColor = "";
    if (simonIndex !== simonList.length - 1) {
      await wait(speed);
    }
  }
  restartPossible = true;
  playerTurn = true;
  switchAnimationPlay();
};

const clickAnimation = async ele => {
  ele.style.backgroundColor = "black";
  await wait(100);
  ele.style.backgroundColor = "";
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
  $gameOverRound.innerHTML = "Round : " + simonList.length;
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
