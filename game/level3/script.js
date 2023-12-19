const SPEED_SCALE = 0.00001;
let jumpscarePlayed = false;
const game = document.querySelector("#game");
const scoreDisplay = document.querySelector("#score");
const startMessage = document.querySelector("#start-message");
const gameoverMessage = document.querySelector("#gameover-message");
const noConnectionMessage = document.querySelector(".no-connection h1");
const tryMessage = document.querySelectorAll(".no-connection li");
document.addEventListener("keydown", startGame, { once: true });
let audio = new Audio("../../assets/mp3/talking.mp3");
audio.loop = true;
audio.volume = 0.8;

let jumpscare = new Audio("../../assets/mp3/jumpscare.mp3");
jumpscare.currentTime = 0.5; // Start at 10 seconds
jumpscare.volume = 1;

let die = new Audio("../../assets/mp3/pig.mp3");
die.volume = 1;
die.currentTime = 0.2;
/* general variables */
let lastTime;
let speedScale;
let score;

/* frame update */
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkGameOver()) return handleGameOver();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function startGame(event) {
  if (!event.keyCode) return;
  document.documentElement.requestFullscreen();
  if (!jumpscarePlayed) {
    jumpscarePlayed = true;
    jumpscare.play();

    setTimeout(() => {
      audio.play();
    }, 2000);
  }

  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startMessage.classList.add("hide");
  gameoverMessage.classList.add("hide");
  document.body.style.backgroundColor = "#000";
  noConnectionMessage.innerText = "You thought?";
  tryMessage[0].innerText = "Beating this game.";
  tryMessage[1].innerText = "You won't beat it.";
  tryMessage[2].innerText = "Goodluck";

  // Add these lines
  var imageNames = [
    "cactus",
    "dino-lose",
    "dino-run-0",
    "dino-run-1",
    "dino-stationary",
  ];
  imageNames.forEach(function (name) {
    var image = document.querySelector(`img[src$="${name}.png"]`);
    if (image) {
      var oldSrc = image.src;
      var base = oldSrc.substring(0, oldSrc.lastIndexOf("."));
      var extension = oldSrc.substring(oldSrc.lastIndexOf("."));
      image.src = "../../assets/" + name + "-dark" + extension;
      console.log(`Changed src of ${name} from ${oldSrc} to ${image.src}`);
    } else {
      console.log(`Image ${name} not found`);
    }
  });

  window.requestAnimationFrame(update);
}

/* speeds up the game over time */
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreDisplay.textContent = Math.floor(score);
}

/* collision conditions */
function checkCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function checkGameOver() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) =>
    checkCollision(rect, dinoRect)
  ); /* check collision with any of the cactus */
}

function handleGameOver() {
  setDinoLose();
  die.play();
  setTimeout(() => {
    document.addEventListener("keydown", startGame, {
      once: true,
    }); /* prevents accidental click */
    gameoverMessage.classList.remove("hide");
  }, 100);
}

/* HANDLING CSS PROPERTIES */

/* get property value */
function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

/* set property value */
function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

/* increment the property value */
function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}

/* GROUND MOVEMENT */

const GROUND_SPEED = 0.05;
const grounds = document.querySelectorAll(".ground");

function setupGround() {
  setCustomProperty(grounds[0], "--left", 0);
  setCustomProperty(grounds[1], "--left", 300);
}

function updateGround(delta, speedScale) {
  grounds.forEach((ground) => {
    incrementCustomProperty(
      ground,
      "--left",
      delta * speedScale * GROUND_SPEED * -1
    ); /* moves the ground according to game speed */

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600); /* loop the elements */
    }
  });
}

/* DINOSAUR MOVEMENT */

const dino = document.querySelector("#dino");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;

  setCustomProperty(dino, "--bottom", 0);
  document.removeEventListener(
    "keydown",
    onJump
  ); /* reset the dinosaur if the player dies while jumping */
  document.addEventListener("keydown", onJump);
}

function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function getDinoRect() {
  return dino.getBoundingClientRect(); /* get the dinosaur hitbox */
}

function setDinoLose() {
  dino.src = "../../assets/dino-lose-dark.png";
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dino.src = `../../assets/dino-stationary-dark.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dino.src = `../../assets/dino-run-${dinoFrame}-dark.png`; /* switch between images to simulate movement */
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(dino, "--bottom", yVelocity * delta);

  if (getCustomProperty(dino, "--bottom") <= 0) {
    setCustomProperty(dino, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}

/* ADD CACTUS */

const CACTUS_SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;

let nextCactusTime;

function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll(".cactus").forEach((cactus) => {
    cactus.remove(); /* remove cactus when game restart */
  });
}

function updateCactus(delta, speedScale) {
  document.querySelectorAll(".cactus").forEach((cactus) => {
    incrementCustomProperty(
      cactus,
      "--left",
      delta * speedScale * CACTUS_SPEED * -1
    );
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove(); /* remove cactus off screen so it doesn't impair game performance */
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomizer(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
  }
  nextCactusTime -= delta;
}

function getCactusRects() {
  return [...document.querySelectorAll(".cactus")].map((cactus) => {
    return cactus.getBoundingClientRect(); /* get the hitbox of all the cactus on the screen */
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.src = "../../assets/cactus-dark.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  game.append(cactus);
}

function randomizer(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  ); /* choose a number between minimum and maximum */
}
