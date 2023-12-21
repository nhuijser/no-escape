<?php

session_start();


if(isset($_COOKIE['naam'])) {
    $name = $_COOKIE['naam'];
}

if(isset($_POST['go'])) {
  setcookie('level2', 'true', time() + 86400 * 30, '/');
}

//zorg dat php kijkt of er een cookie is genaamd level1 en anders redirect terug naar homepage
if(!isset($_COOKIE['level1'])) {
    header('Location: ../level1');
}
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>asmdaodskook</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
    <img
      id="jumpscare"
      src="../../assets/jumpscare.jpg"
      style="display: none"
    />
    <div class="carGame">
      <div class="score" style="display: none"></div>
      <div id="startModal" class="modal">
        <div class="modal-content">
          <h2>Welcome to the race ⚠️</h2>
          <p>Don't hit any dead bodies to win...</p>
          <button id="startButton">Start</button>
        </div>
      </div>
      <div id="winModal" class="modal">
        <div class="modal-content">
          <h2>You won.</h2>
          <p>Continue to next level. Be careful, <?php
          
          echo $name;
          ?></p>
          <a href="../level3/"><button id="go">Go!</button></a>
        </div>
      </div>
      <div id="hitModal" class="modal">
        <div class="modal-content">
          <h2>You hit a body!</h2>
          <p>Game Over. Try again?</p>
          <button id="restartButton">Restart</button>
        </div>
      </div>
      <div class="gameArea"></div>
    </div>
    <script src="script.js"></script>
  </body>
</html>