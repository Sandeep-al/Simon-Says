const body = document.querySelector("body");
const button = document.querySelector("button");
const high = document.querySelector(".high");
const h2 = document.querySelector("h2");
let highestscore = 0;
let gameseq = [];
let userseq = [];
const allclass = [".green", ".red", ".yellow", ".purple"];
let level = 0;
let istarted = false;
let isflash=false;
function changecolor(randomColor) {
  randomColor = document.querySelector(randomColor);
  randomColor.classList.add("flash");

  setTimeout(() => {
    randomColor.classList.remove("flash");
  }, 800);
}
function changecoloruser(randomColor) {
  randomColor = document.querySelector(randomColor);
  randomColor.classList.add("userflash");

  setTimeout(() => {
    randomColor.classList.remove("userflash");
  }, 500);
}

function levelup() {
  userseq = [];
  if (istarted) {
    isflash=false;
    level++;
    h2.textContent = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);

    let randomColor = allclass[randomNumber];
    gameseq.push(randomColor);
    for (let i = 0; i < gameseq.length; i++) {
      setTimeout(() => {
        changecolor(gameseq[i]);
      }, i * 1000);
    }
    setTimeout(() => {
      isflash = true;
    }, gameseq.length * 1000);
  }
}

function startGame() {
  istarted = true;
  gameseq = [];
  userseq = [];
  level = 0;

  levelup();
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !istarted) {
    h2.textContent = "Game Started!";
    setTimeout(() => {
      startGame();
    }, 2000);
  }
});

function btnPress() {
  if (istarted && isflash) {
    if (userseq.length >= gameseq.length) {return;}
    let btn = "." + this.classList[1];
    userseq.push(btn);
    changecoloruser(btn);
    if (gameseq.length === userseq.length) {
      iscontinue = true;
      for (let i = 0; i < gameseq.length; i++) {
        if (gameseq[i] !== userseq[i]) {
          iscontinue = false;
        }
      }

      if (!iscontinue) {
        highestscore = Math.max(highestscore, level);
        h2.innerHTML = `Game over Buddy!<br/><b>Ur score is:${level}</b><br/>Press Enter to play again`;
        high.textContent = `HIGHEST SCORE: ${highestscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
          document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        istarted = false;
      } else {
        h2.textContent = "Wait 2s, U pressed correct";
        setTimeout(() => {
          levelup();
        }, 2000);
      }
    }
  }
}

let allbtn = document.querySelectorAll(".btn");
for (const btn of allbtn) {
  btn.addEventListener("click", btnPress);
}
