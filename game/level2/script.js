const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let hitModal = document.getElementById("hitModal");
let winModal = document.getElementById("winModal");
let jumpscareImg = document.getElementById("jumpscare");
let player = { speed: 5, score: 0 };
let otherSpeed = 6.5;
let highest = 0;
let jumpscare = new Audio("../../assets/mp3/jumpscarenew.mp3");
jumpscare.currentTime = 0.5;
jumpscare.volume = 1;
let audio = new Audio("../../assets/mp3/selector.mp3");
audio.loop = true;
audio.currentTime = 10;
audio.volume = 0.1;
let carAudio = new Audio("../../assets/mp3/car.mp3");
carAudio.loop = true;
carAudio.volume = 0.01;

window.onload = function () {
  let modal = document.getElementById("startModal");
  let btn = document.getElementById("startButton");
  let restartBtn = document.getElementById("restartButton");
  modal.style.display = "block";

  btn.onclick = function () {
    document.documentElement.requestFullscreen();
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
  w: false,
  s: false,
  a: false,
  d: false,
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
  lines.forEach(function (item, index, arr) {
    item.y += otherSpeed;
    item.style.top = item.y + "px";
    if (item.y >= gameArea.offsetHeight) {
      item.y = item.y - arr.length * 150;
    }
  });
}
function endGame() {
  jumpscare.pause();
  jumpscare.currentTime = 0.5;
  jumpscare.volume = 1;
  player.start = false;

  let video =
    "https://www.youtube-nocookie.com/embed/HqGsT6VM8Vg" +
    "?autoplay=1&modestbranding=1&showinfo=0&rel=0&controls=0";
  let wrapper = document.createElement("div");
  wrapper.style.position = "absolute";
  wrapper.style.zIndex = "1000";
  wrapper.style.top = Math.random() * (window.innerHeight - 315) + "px";
  wrapper.style.left = Math.random() * (window.innerWidth - 560) + "px";

  let iframe = document.createElement("iframe");
  iframe.src = video;
  iframe.width = 560;
  iframe.height = 315;
  iframe.allow =
    'title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  let closeButton = document.createElement("div");
  closeButton.innerHTML = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "0";
  closeButton.style.right = "0";
  closeButton.style.padding = "10px";
  closeButton.style.background = "red";
  closeButton.style.color = "white";
  closeButton.style.cursor = "pointer";

  closeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    document.body.removeChild(wrapper);
  });

  wrapper.appendChild(iframe);
  wrapper.appendChild(closeButton);
  document.body.appendChild(wrapper);

  document.getElementById("jumpscare").style.display = "none";
  hitModal.style.display = "block";
}

function moveCar(car) {
  let other = document.querySelectorAll(".other");
  other.forEach(function (item) {
    if (isCollide(car, item) && player.start) {
      player.start = false;
      document.getElementById("jumpscare").style.display = "block";
      carAudio.pause();
      carAudio.currentTime = 0.5;
      jumpscare.play();
      setTimeout(function () {
        endGame();
      }, 2000);
    }
    if (player.start) {
      if (item.y >= gameArea.offsetHeight) {
        item.y = -300;
        item.style.left = Math.floor(Math.random() * 350) + "px";
      }
      item.y += otherSpeed;
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
    if ((keys.ArrowUp || keys.w) && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if ((keys.ArrowDown || keys.s) && player.y < road.bottom - 70) {
      player.y += player.speed;
    }
    if ((keys.ArrowLeft || keys.a) && player.x > 0) {
      player.x -= player.speed;
    }
    if ((keys.ArrowRight || keys.d) && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    player.score++;
    if (player.speed <= 9) {
      player.speed = 3.5 + player.score * 0.004;
    }
    if (otherSpeed <= 20) {
      otherSpeed = 4.5 + player.score * 0.004;
    }

    if (player.score >= 3000) {
      winModal.style.display = "block";
      player.start = false;
    }
    score.innerText = "Your score: " + player.score;
  }
}
function reset() {
  highest = 0;
}
function start() {
  player.speed = 5;
  otherSpeed = 6.5;
  document.documentElement.requestFullscreen();
  carAudio.play();
  gameArea.innerHTML = "";

  score.style.display = "block";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 20; x++) {
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
    other.style.backgroundImage = "url('../../assets/skeleton.webp')";
    gameArea.appendChild(other);
  }
}
