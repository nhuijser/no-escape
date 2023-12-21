<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <title>Level Selection</title>
    <meta content="n0 esc4p3" property="og:title" />
    <meta content="A web horror game..." property="og:description" />
    <meta content="https://thuis.wierper.net/no-escape" property="og:url" />
    <meta content="#43B581" data-react-helmet="true" name="theme-color" />
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
    <div id="disclaimerModal" class="modal">
      <div class="modal-content">
        <h2>DISCLAIMER ⚠️</h2>
        <p>THIS WEBSITE MAY BE DISRUPTIVE.</p>
        <p>PROCEED WITH CAUTION!</p>
        <p>Please fill in your name for gameplay purposes.</p>
        <input type="text" name="name" id="name" placeholder="put your name here" required>
        <button id="acceptButton">I understand</button>
      </div>
    </div>
    <?php
    session_start();
    ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
    $(document).ready(function(){
      $("#acceptButton").click(function(){
        var name = $("#name").val();
        $.post("save_name.php", {name: name}, function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
        });
      });
    });
    </script>

    <script>
      document.getElementById('acceptButton').addEventListener('click', function() {
        var name = document.getElementById('name').value;
        console.log("<?php echo $_SESSION['naam']; ?>");
        document.cookie = 'naam=' + name + '; expires=' + new Date(new Date().getTime() + 86400 * 30).toUTCString() + '; path=/';
      });
    </script>



    <div id="particles-js" style="display: none"></div>

    <audio id="audio" loop style="display: none">
      <source src="./assets/mp3/audio2.mp3" type="audio/mpeg" />
    </audio>

    <div class="header" style="display: none">
      <img src="./assets/eye.png" />
    </div>

    <div class="container" style="display: none">
      <a href="./game/level1">
        <div class="level-box" data-text="Level 1">
          <h1 class="message">Level 1</h1>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
        </div>
      </a>

      <a href="./game/level2">
        <div class="level-box" data-text="Level 2">
          <h1 class="message">Level 2</h1>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
        </div>
      </a>
      <a href="./game/level3">
        <div class="level-box" data-text="Level 3">
          <h1 class="message">Level 3</h1>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
        </div>
      </a>

      <a href="./game/level4">
        <div class="level-box" data-text="Level 4">
          <h1 class="message">Level 4</h1>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
        </div>
      </a>
    </div>

    <script>
      window.onload = function () {
        var audio = document.getElementById("audio");
        audio.volume = 0.1; // Change to desired volume, range is 0.0 to 1.0
      };

      document
        .getElementById("acceptButton")
        .addEventListener("click", function () {
          document.documentElement.requestFullscreen();
          document.getElementById("acceptButton").style.display = "none";
          document.getElementById("disclaimerModal").style.display = "none";
          document.getElementById("particles-js").style.display = "block";
          document.getElementById("audio").style.display = "block";
          document.querySelector(".header").style.display = "flex";
          document.querySelector(".container").style.display = "flex";
          document.querySelector(".lower-text").style.display = "flex";

          particlesJS.load(
            "particles-js",
            "./particles/particles.json",
            function () {
              console.log("particles.json loaded...");
            }
          );

          document.getElementById("audio").play();

          fetch("./config.json")
            .then((response) => response.json())
            .then((config) => {
              const webhook = config.webhook;

              const request = new XMLHttpRequest();
              request.open("POST", webhook);

              request.setRequestHeader("Content-type", "application/json");

              const params = {
                embeds: [
  {
    color: 0x00ff00,
    title: "User has clicked the agreement button",
    fields: [
      {
        name: "Name",
        value: document.getElementById("name").value,
        inline: false,
      },
      {
        name: "Browser",
        value: navigator.appName,
        inline: false,
      },
      {
        name: "Browser Version",
        value: navigator.appVersion,
        inline: false,
      },
      {
        name: "User Agent",
        value: navigator.userAgent,
        inline: false,
      },
      {
        name: "Platform",
        value: navigator.platform,
        inline: false,
      },
      {
  name: "Screen Resolution",
  value: `${window.screen.width} x ${window.screen.height}`,
  inline: false,
},
{
  name: "Cookies Enabled",
  value: navigator.cookieEnabled ? "Yes" : "No",
  inline: false,
},
{
  name: "Java Enabled",
  value: navigator.javaEnabled() ? "Yes" : "No",
  inline: false,
},
{
  name: "Timezone",
  value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  inline: false,
},
{
  name: "Current URL",
  value: window.location.href,
  inline: false,
},
{
  name: "Logical Processors",
  value: navigator.hardwareConcurrency,
  inline: false,
},
{
  name: "Memory Status",
  value: navigator.deviceMemory + " GB",
  inline: false,
},
{
  name: "Connection Type",
  value: navigator.connection ? navigator.connection.effectiveType : "Unknown",
  inline: false,
},
{
  name: "Preferred Languages",
  value: navigator.languages.join(", "),
  inline: false,
},
{
  name: "Browser Vendor",
  value: navigator.vendor,
  inline: false,
},
{
  name: "Browser Product",
  value: navigator.product,
  inline: false,  
},
    ],
  },
],
              };

              request.send(JSON.stringify(params));

              console.log("Sent request to Discord");
            });
        });
    </script>
    <div class="lower-text" style="display: none">
      <p>tHerE is n0 esc4p3</p>
    </div>
  </body>
</html>
