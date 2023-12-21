<?php
session_start();



if(isset($_POST['bring-me-back-button'])) {
  setcookie('level3', 'true', time() + 86400 * 30, '/');
}

if(!isset($_COOKIE['level2'])) {
  header('Location: ../level2');
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Dino Game</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <div id="game" class="game">
        <div id="score" class="score">0</div>
        <div id="start-message" class="start-message">Press space to start</div>
        <img src="../../assets/ground.png" class="ground" />
        <img src="../../assets/ground.png" class="ground" />
        <img src="../../assets/dino-stationary.png" id="dino" class="dino" />
        <div id="gameover-message" class="gameover-message hide">
          <p>Game over</p>
          <span>Press space to restart</span>
        </div>
        <div id="gamewin-message" class="gamewin-message hide">
          <p>Game won</p>
          <span>Press button below to continue</span>
          <button
            onclick="window.open(`https://cat-bounce.com/`)"
            id="bring-me-back-button"
          >
            <a href="../level4/">Bring Me Back</a>
          </button>
        </div>
      </div>
    </div>
    <div class="no-connection">
      <h1>No internet</h1>
      <p>Try:</p>
      <ul>
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
        <li>Running Windows Network Diagnostics</li>
      </ul>

      <p2>ERR_INTERNET_DISCONNECTED</p2>
    </div>
    <script src="script.js"></script>
  </body>
</html>