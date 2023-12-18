let jumpscareActive = false;

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function changeBrightness(factor, sprite) {
  let virtCanvas = document.createElement("canvas");
  virtCanvas.width = 500;
  virtCanvas.height = 500;
  let context = virtCanvas.getContext("2d");
  context.drawImage(sprite, 0, 0, 500, 500);

  let imgData = context.getImageData(0, 0, 500, 500);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = imgData.data[i] * factor;
    imgData.data[i + 1] = imgData.data[i + 1] * factor;
    imgData.data[i + 2] = imgData.data[i + 2] * factor;
  }
  context.putImageData(imgData, 0, 0);

  let spriteOutput = new Image();
  spriteOutput.src = virtCanvas.toDataURL();
  virtCanvas.remove();
  return spriteOutput;
}

function displayVictoryMess() {
  toggleVisibility("Message-Container");
}

function toggleVisibility(id) {
  var element = document.getElementById(id);
  element.style.display = "block";
  element.style.visibility = "visible";
}
function Maze(Width, Height) {
  let mazeMap;
  let width = Width;
  let height = Height;
  let startCoord, endCoord;
  let dirs = ["n", "s", "e", "w"];
  let modDir = {
    n: {
      y: -1,
      x: 0,
      o: "s",
    },
    s: {
      y: 1,
      x: 0,
      o: "n",
    },
    e: {
      y: 0,
      x: 1,
      o: "w",
    },
    w: {
      y: 0,
      x: -1,
      o: "e",
    },
  };

  this.map = function () {
    return mazeMap;
  };
  this.startCoord = function () {
    return startCoord;
  };
  this.endCoord = function () {
    return endCoord;
  };

  function genMap() {
    mazeMap = new Array(height);
    for (y = 0; y < height; y++) {
      mazeMap[y] = new Array(width);
      for (x = 0; x < width; ++x) {
        mazeMap[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null,
        };
      }
    }
  }

  function defineMaze() {
    let isComp = false;
    let move = false;
    let cellsVisited = 1;
    let numLoops = 0;
    let maxLoops = 0;
    let pos = {
      x: 0,
      y: 0,
    };
    let numCells = width * height;
    while (!isComp) {
      move = false;
      mazeMap[pos.x][pos.y].visited = true;

      if (numLoops >= maxLoops) {
        shuffle(dirs);
        maxLoops = Math.round(rand(height / 8));
        numLoops = 0;
      }
      numLoops++;
      for (index = 0; index < dirs.length; index++) {
        let direction = dirs[index];
        let nx = pos.x + modDir[direction].x;
        let ny = pos.y + modDir[direction].y;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (!mazeMap[nx][ny].visited) {
            mazeMap[pos.x][pos.y][direction] = true;
            mazeMap[nx][ny][modDir[direction].o] = true;

            mazeMap[nx][ny].priorPos = pos;
            pos = {
              x: nx,
              y: ny,
            };
            cellsVisited++;
            move = true;
            break;
          }
        }
      }

      if (!move) {
        pos = mazeMap[pos.x][pos.y].priorPos;
      }
      if (numCells == cellsVisited) {
        isComp = true;
      }
    }
  }

  function defineStartEnd() {
    switch (rand(4)) {
      case 0:
        startCoord = {
          x: 0,
          y: 0,
        };
        endCoord = {
          x: height - 1,
          y: width - 1,
        };
        break;
      case 1:
        startCoord = {
          x: 0,
          y: width - 1,
        };
        endCoord = {
          x: height - 1,
          y: 0,
        };
        break;
      case 2:
        startCoord = {
          x: height - 1,
          y: 0,
        };
        endCoord = {
          x: 0,
          y: width - 1,
        };
        break;
      case 3:
        startCoord = {
          x: height - 1,
          y: width - 1,
        };
        endCoord = {
          x: 0,
          y: 0,
        };
        break;
    }
  }

  genMap();
  defineStartEnd();
  defineMaze();
}

function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
  let map = Maze.map();
  let cellSize = cellsize;

  function drawCell(xCord, yCord, cell) {
    let x = xCord * cellSize;
    let y = yCord * cellSize;

    if (cell.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y);
      ctx.stroke();
    }
    if (cell.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.w === false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + cellSize);
      ctx.stroke();
    }
  }

  function drawMap() {
    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        drawCell(x, y, map[x][y]);
      }
    }
  }

  function drawEndFlag() {
    let coord = Maze.endCoord();
    let gridSize = 4;
    let fraction = cellSize / gridSize - 2;
    let colorSwap = true;
    for (let y = 0; y < gridSize; y++) {
      if (gridSize % 2 == 0) {
        colorSwap = !colorSwap;
      }
      for (let x = 0; x < gridSize; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * cellSize + x * fraction + 4.5,
          coord.y * cellSize + y * fraction + 4.5,
          fraction,
          fraction
        );
        if (colorSwap) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        colorSwap = !colorSwap;
      }
    }
  }

  function drawEndSprite() {
    let offsetLeft = cellSize / 50;
    let offsetRight = cellSize / 25;
    let coord = Maze.endCoord();
    ctx.drawImage(
      endSprite,
      2,
      2,
      endSprite.width,
      endSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }

  function clear() {
    let canvasSize = cellSize * map.length;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  }

  let drawEndMethod;

  if (endSprite != null) {
    drawEndMethod = drawEndSprite;
  } else {
    drawEndMethod = drawEndFlag;
  }

  let halfCellSize = cellSize / 2;

  function drawFlashlight(coord, jumpscare) {
    if (!jumpscareActive) {
      ctx.save();

      let flashlightRadius = jumpscare
        ? Math.max(ctx.canvas.width, ctx.canvas.height)
        : cellSize * 3;
      let gradient = ctx.createRadialGradient(
        (coord.x + 1) * cellSize - halfCellSize,
        (coord.y + 1) * cellSize - halfCellSize,
        0,
        (coord.x + 1) * cellSize - halfCellSize,
        (coord.y + 1) * cellSize - halfCellSize,
        flashlightRadius
      );

      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.3)  ");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.restore();
    } else {
      // if jumpscare active, bigger flashlight
      ctx.save();

      let flashlightRadius = Math.max(
        ctx.canvas.width - 100,
        ctx.canvas.height - 100
      );

      let gradient = ctx.createRadialGradient(
        (coord.x + 1) * cellSize - halfCellSize,
        (coord.y + 1) * cellSize - halfCellSize,
        0,
        (coord.x + 1) * cellSize - halfCellSize,
        (coord.y + 1) * cellSize - halfCellSize,
        flashlightRadius
      );

      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.restore();
    }
  }

  return {
    redrawMaze: function (size, playerCoord, jumpscare = false) {
      cellSize = size;
      ctx.lineWidth = cellSize / 50;
      clear();
      drawMap();
      drawEndMethod();
      drawFlashlight(playerCoord, jumpscare);
    },
  };
}

function Player(maze, c, _cellsize, onComplete, sprite = null) {
  let ctx = c.getContext("2d");
  let drawSprite;
  let moves = 0;
  drawSprite = drawSpriteCircle;
  if (sprite != null) {
    drawSprite = drawSpriteImg;
  }
  let player = this;
  let map = maze.map();
  let cellCoords = {
    x: maze.startCoord().x,
    y: maze.startCoord().y,
  };
  let cellSize = _cellsize;
  let halfCellSize = cellSize / 2;

  this.getPlayerCoords = function () {
    return cellCoords;
  };

  this.redrawPlayer = function (_cellsize, playerCoord) {
    cellSize = _cellsize;
    drawSpriteImg(playerCoord);
  };

  function drawSpriteCircle(coord) {
    drawMap();

    let gradient = ctx.createRadialGradient(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      0,
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      cellSize * 3
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the player
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Check if the player is at the maze's end
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      displayVictoryMess();
      player.unbindKeyDown();
    }
  }

  function drawSpriteImg(coord) {
    let offsetLeft = cellSize / 50;
    let offsetRight = cellSize / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      displayVictoryMess();
      player.unbindKeyDown();
    }
  }

  function check(e) {
    let cell = map[cellCoords.x][cellCoords.y];
    moves++;

    // Store the current player coordinates before the move
    let oldCoords = { x: cellCoords.x, y: cellCoords.y };

    // random chance to open a random window

    let videoArray = [
      "https://www.youtube.com/watch?v=nrsnN23tmUA",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=2ZIpFytCSVc",
      "https://www.youtube.com/watch?v=ZnHmskwqCCQ",
      "https://www.youtube.com/watch?v=CBEvfZu4HE4",
      "https://www.youtube.com/watch?v=13pgxOCHKh0",
      "https://www.youtube.com/watch?v=nC-bVtpIMd4",
      "https://www.youtube.com/watch?v=9C_HReR_McQ",
      "https://www.youtube.com/watch?v=OSihZ2zChIA",
      "https://www.youtube.com/watch?v=U_QuqTIXpFg",
      "https://www.youtube.com/watch?v=oFL3tA3Yvo8",
      "https://www.youtube.com/watch?v=JrRFB_YBM-M",
      "https://www.youtube.com/watch?v=2v54v3aeVGs",
      "https://www.youtube.com/watch?v=SfT4FMkh1-w",
      "https://www.youtube.com/watch?v=PLb720ZPcQI",
    ];
    if (rand(1000) < 20) {
      let video = videoArray[rand(videoArray.length)];

      window.open(video);
    }

    switch (e.keyCode) {
      case 65:
      case 37: // west
        if (cell.w == true) {
          cellCoords = {
            x: cellCoords.x - 1,
            y: cellCoords.y,
          };
        }
        break;
      case 87:
      case 38: // north
        if (cell.n == true) {
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y - 1,
          };
        }
        break;
      case 68:
      case 39: // east
        if (cell.e == true) {
          cellCoords = {
            x: cellCoords.x + 1,
            y: cellCoords.y,
          };
        }
        break;
      case 83:
      case 40: // south
        if (cell.s == true) {
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y + 1,
          };
        }

        break;
    }

    // Draw the maze and player with updated coordinates

    draw.redrawMaze(cellSize, player.getPlayerCoords());
    player.redrawPlayer(cellSize, player.getPlayerCoords());
    document.getElementById("startMessage-Container").style.display = "none";
    document.documentElement.requestFullscreen();
  }

  this.bindKeyDown = function () {
    window.addEventListener("keydown", check, false);

    $("#view").swipe({
      swipe: function (
        event,
        direction,
        distance,
        duration,
        fingerCount,
        fingerData
      ) {
        console.log(direction);
        switch (direction) {
          case "up":
            check({
              keyCode: 38,
            });
            break;
          case "down":
            check({
              keyCode: 40,
            });
            break;
          case "left":
            check({
              keyCode: 37,
            });
            break;
          case "right":
            check({
              keyCode: 39,
            });
            break;
        }
      },
      threshold: 0,
    });
  };

  this.unbindKeyDown = function () {
    window.removeEventListener("keydown", check, false);
    $("#view").swipe("destroy");
  };

  drawSprite(maze.startCoord());

  this.bindKeyDown();
}

let mazeCanvas = document.getElementById("mazeCanvas");
let ctx = mazeCanvas.getContext("2d");
let sprite;
let finishSprite;
let maze, draw, player;
let cellSize;
let difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function () {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }

  //Load and edit sprites
  let completeOne = false;
  let completeTwo = false;
  let isComplete = () => {
    if (completeOne === true && completeTwo === true) {
      console.log("Runs");
      setTimeout(function () {
        makeMaze();
      }, 500);
    }
  };
  sprite = new Image();
  sprite.src = "../../assets/stick.png" + "?" + new Date().getTime();
  sprite.setAttribute("crossOrigin", " ");
  sprite.onload = function () {
    sprite = changeBrightness(1.2, sprite);
    completeOne = true;
    console.log(completeOne);
    isComplete();
  };

  finishSprite = new Image();
  finishSprite.src = "../../assets/key.png" + "?" + new Date().getTime();
  finishSprite.setAttribute("crossOrigin", " ");
  finishSprite.onload = function () {
    finishSprite = changeBrightness(1.1, finishSprite);
    completeTwo = true;
    console.log(completeTwo);
    isComplete();
  };
};

window.onresize = function () {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / size;
  if (player != null) {
    draw.redrawMaze(cellSize, player.getPlayerCoords());
    player.redrawPlayer(cellSize, player.getPlayerCoords());
  }
};

function makeMaze() {
  if (player != undefined) {
    player.unbindKeyDown();
    player = null;
  }
  size = 22;
  cellSize = mazeCanvas.width / size;
  console.log(mazeCanvas.width, difficulty, cellSize);
  maze = new Maze(size, size);
  draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
  player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }

  let audio = new Audio("../../assets/mp3/help.mp3");
  audio.loop = true;
  audio.volume = 0.2;

  let keyPressed = false;

  function playAudioAndRemoveListener() {
    audio.play();
    // Remove the event listener after the first interaction
    document.removeEventListener("keydown", playAudioAndRemoveListener);

    // Set the keyPressed flag to true
    keyPressed = true;

    // Stop the audio after a maximum play time
    let maxPlayTime = 78000; // Maximum play time in milliseconds (e.g., 60000ms = 60 seconds)
    setInterval(function () {
      audio.pause(); // Stop the audio
      audio.currentTime = 0; // Reset the audio to the start
      audio.volume = 0.5;
      audio.play();
    }, maxPlayTime);

    // Schedule the first jumpscare after a key has been pressed
    let initialDelay = 15000; // 30 seconds, adjust as needed
    console.log(
      "Next jumpscare in " + Math.floor(initialDelay / 1000) + " seconds"
    );
    setTimeout(playJumpscare, initialDelay);
  }

  document.addEventListener("keydown", playAudioAndRemoveListener);

  function playJumpscare() {
    if (keyPressed) {
      // Set the jumpscareActive flag to true
      jumpscareActive = true;

      // Generate a random number between 1 and 50
      let jumpscareNumber = Math.floor(Math.random() * 50) + 1;

      // Construct the filename of the jumpscare
      let jumpscareFilename = `./jumpscares/jumpscare${jumpscareNumber}.wav`;

      // Create a new Audio object
      let jumpscareAudio = new Audio(jumpscareFilename);
      jumpscareAudio.volume = 1;
      jumpscareAudio.play();

      // Get the maze canvas
      let mazeCanvas = document.getElementById("mazeCanvas");

      // Flicker the maze canvas
      let flickerInterval = setInterval(function () {
        mazeCanvas.style.opacity =
          mazeCanvas.style.opacity === "1" ? "0.1" : "1";
        draw.redrawMaze(cellSize, player.getPlayerCoords(), true);
        player.redrawPlayer(cellSize, player.getPlayerCoords());
        document.getElementById("mazeCanvas").style.backgroundColor = "red";
      }, 100);

      // Stop flickering after 1 second
      setTimeout(function () {
        clearInterval(flickerInterval);
        mazeCanvas.style.opacity = "1";
        jumpscareActive = false;
        draw.redrawMaze(cellSize, player.getPlayerCoords());
        player.redrawPlayer(cellSize, player.getPlayerCoords());
        document.getElementById("mazeCanvas").style.backgroundColor = "";

        // Call redrawMaze and redrawPlayer after the jumpscare
      }, 3000);

      // Set a random delay between 30 and 20 seconds (10000-20000 milliseconds)
      let delay = Math.random() * 10000 + 20000;
      console.log("Next jumpscare in " + Math.floor(delay / 1000) + " seconds");

      // Schedule the next jumpscare
      setTimeout(function () {
        // Reset the jumpscareActive flag to false before the next jumpscare
        jumpscareActive = false;
        playJumpscare();
      }, delay);
    }
  }
}
