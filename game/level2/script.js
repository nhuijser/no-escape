const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let hitModal = document.getElementById("hitModal");
let winModal = document.getElementById("winModal");
let jumpscareImg = document.getElementById("jumpscare");
let player = { speed: 5, score: 0 }; // Decrease this value to make the car move slower
let otherSpeed = 7.5;
let highest = 0;
let jumpscare = new Audio("../../assets/mp3/jumpscare.mp3");
jumpscare.currentTime = 0.5; // Start at 10 seconds
jumpscare.volume = 1;
let audio = new Audio("../../assets/mp3/selector.mp3");
audio.loop = true;
audio.currentTime = 10; // Start at 10 seconds
audio.volume = 0.2;

window.onload = function () {
  let modal = document.getElementById("startModal");
  let btn = document.getElementById("startButton");
  let restartBtn = document.getElementById("restartButton");
  // When the page loads, open the modal
  modal.style.display = "block";

  // When the user clicks on the button, close the modal
  btn.onclick = function () {
    audio.play();
    modal.style.display = "none";
    start();
  };

  restartBtn.onclick = function () {
    hitModal.style.display = "none";
    start();
  };
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(ev) {
  ev.preventDefault();
  keys[ev.key] = true;
}
function keyUp(ev) {
  ev.preventDefault();
  keys[ev.key] = false;
}
function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += otherSpeed; // Use the otherSpeed variable here
    item.style.top = item.y + "px";
  });
}
function endGame() {
  jumpscare.pause(); // Stop the audio
  jumpscare.currentTime = 0.5; // Reset the audio to the start
  jumpscare.volume = 1;
  player.start = false;
  document.getElementById("jumpscare").style.display = "none";
  hitModal.style.display = "block";
}

function moveCar(car) {
  let other = document.querySelectorAll(".other");
  other.forEach(function (item) {
    if (isCollide(car, item) && player.start) {
      // Add the condition here
      player.start = false; // Stop the game immediately
      document.getElementById("jumpscare").style.display = "block"; // Show the jumpscare image
      jumpscare.play();
      setTimeout(function () {
        endGame();
      }, 2000);
    }
    if (player.start) {
      // Only move the cars if the game is running
      if (item.y >= 750) {
        item.y = -300;
        item.style.left = Math.floor(Math.random() * 350) + "px";
      }
      item.y += otherSpeed; // Use the otherSpeed variable here
      item.style.top = item.y + "px";
    }
  });
}
function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveCar(car);
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    player.score++;
    if (player.score >= highest) {
      highest = player.score;
    }

    if (player.score >= 3000) {
      winModal.style.display = "block";
      player.start = false;
    }
    score.innerHTML =
      "Your score:" + player.score + "<br><br>" + "Highest score:" + highest;
  }
}
function reset() {
  highest = 0;
}
function start() {
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 5; x++) {
    let roadline = document.createElement("div");
    roadline.setAttribute("class", "lines");
    roadline.y = x * 150;
    roadline.style.top = roadline.y + "px";
    gameArea.appendChild(roadline);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (x = 0; x < 3; x++) {
    let other = document.createElement("div");
    other.setAttribute("class", "other");
    other.y = (x + 1) * 350 * -1;
    other.style.top = other.y + "px";
    other.style.left = Math.floor(Math.random() * 350) + "px";
    other.style.backgroundImage = "url('../../assets/skeleton.webp')"; // Add this line
    gameArea.appendChild(other);
  }
}
