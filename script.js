let playerList = [];
let simonList = [];
let playerTurn = false;
const $buttons = document.querySelectorAll(".button");

[...$buttons].map(ele => {
  ele.onclick = () => {
    if (playerTurn === true) {
      newPlayerTurn(ele);
      switch (verifList()) {
        case 0:
          gameOver();
          break;
        case 1:
          playerList = [];
          playerTurn = false;
          newSimonTurn();
          break;
        case 2:
          console.log("click another");
          break;
      }
    }
  };
});

const newSimonTurn = () => {
  let randomNumber = Math.floor(Math.random() * Math.floor(4));
  simonList.push(randomNumber);
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

const startGame = () => {
  newSimonTurn();
};

startGame();
