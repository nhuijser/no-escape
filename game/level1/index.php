<?php

session_start();


if(isset($_COOKIE['naam'])) {
    $name = $_COOKIE['naam'];
}

//maak een cookie genaamd level1 en zorg dat ie pas wordt gegeven als je op de button klikt met id okBtn klikt
if(isset($_POST['okBtn'])) {
    setcookie('level1', 'true', time() + 86400 * 30, '/');
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maze</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div id="page">
      <div id="Message-Container">
        <div id="message">
          <h1>Congratulations!</h1>
          <p>You have completed the maze...</p>
          <a href="../level2/"
            ><input
              id="okBtn"
              type="button"
              onclick="toggleVisablity('Message-Container')"
              value="Ok"
          /></a>
        </div>
      </div>
      <div id="startMessage-Container">
        <div id="message-start">
          <h1>Are you ready, <?php 

          echo $name;
          
          ?>?</h1>
          <p>Press any key to start...</p>
        </div>
      </div>

      <div id="view">
        <div id="mazeContainer">
          <canvas
            id="mazeCanvas"
            class="border"
            width="800"
            height="800"
          ></canvas>
        </div>
      </div>
    </div>

    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js"
    ></script>

    <script src="./script.js"></script>
  </body>
</html>
