const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector("#score");
const startButton = document.querySelector("#startButton");
const smashSound = document.querySelector("#smashSound");
const hammer = document.querySelector("#hammer");

let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(document.querySelectorAll(".mole-hole"));
  const mole = hole.querySelector(".mole");
  mole.style.bottom = "10%"; // Make mole pop out more
  setTimeout(() => {
    mole.style.bottom = "-100%";
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 30000); // Game lasts for 30 seconds
}

function whack(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  const mole = e.target;
  mole.src = "assets/whacked-mole.png";
  this.classList.add("whacked");
  smashSound.currentTime = 0;
  smashSound.play();
  scoreBoard.textContent = score;
  setTimeout(() => {
    this.classList.remove("whacked");
    mole.src = "assets/mole.png";
  }, 200);
}

moles.forEach((mole) => mole.addEventListener("click", whack));
startButton.addEventListener("click", startGame);

document.addEventListener("mousemove", (e) => {
  hammer.style.left = `${e.pageX - 25}px`;
  hammer.style.top = `${e.pageY - 25}px`;
});

document.addEventListener("click", () => {
  hammer.style.transform = "rotate(-70deg)";
  setTimeout(() => {
    hammer.style.transform = "rotate(0deg)";
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  if (mediaQuery.matches) {
    hammer.classList.remove("hidden");
  } else {
    hammer.classList.add("hidden");
  }
});
