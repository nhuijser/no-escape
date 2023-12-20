<?php
session_start();

// Check if the user is not logged in, then redirect to the login page
if (!isset($_SESSION["level4"]) || $_SESSION["level4"] !== true) {
    header("location: /no-escape/game/level4/");
    exit;
}
?>

<script>

console.log("<?php echo $_SESSION['name']; ?>");
</script>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>congratulations!</title>
    <link rel="stylesheet" href="style.css" />
    <script
      src="https://kit.fontawesome.com/dd721b7d9f.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="overlay" id="overlay">
      <button type="button" onclick="playAudio();">claim prize</button>
    </div>
    <header>
      <h1 id="title-header">Congratulations</h1>
    </header>
    <audio id="myAudio">
      <source src="../../assets/mp3/congratulations.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <section>
      <div class="congrats">
        <p>
          "Congratulations, brave soul. You've navigated the treacherous depths
          of fear and emerged victorious. The nightmares that once haunted these
          halls are now vanquished, thanks to your courage and resilience. As
          the darkness recedes, remember your triumph over terror, for you have
          conquered the shadows and claimed victory in this harrowing journey."
        </p>
      </div>
      <img src="../../assets/nicole.png" alt="" />
      <form id="form">
        <h1>Geef feedback over de game</h1>
        <label for="graphics">Grafische kwaliteit:</label><br />
        <input required type="text" id="graphics" name="graphics" /><br /><br />

        <label for="gameplay">Gameplay-ervaring:</label><br />
        <input required type="text" id="gameplay" name="gameplay" /><br /><br />
        <label for="improvements">Verbeterpunten:</label><br />
        <input required type="text" id="extra" name="extra" /><br /><br />
        <label for="extra">Extra toevoegingen:</label><br />
        <input required type="text" id="improvements" name="improvements"/><br /><br />

        <input type="submit" class="submit" value="Verstuur feedback" />
      </form>
      <script>
        document
          .getElementById("form")
          .addEventListener("submit", function (event) {
            event.preventDefault();

            // Get form data
            let graphics = document.getElementById("graphics").value;
            let gameplay = document.getElementById("gameplay").value;
            let improvements = document.getElementById("improvements").value;
            let extra = document.getElementById("extra").value;

            // Get browser information
            let browserName = navigator.appName;
            let browserVersion = navigator.appVersion;

            fetch("../../config.json")
              .then((response) => response.json())
              .then((config) => {
                const webhook = config.webhook;

                const request = new XMLHttpRequest();
                request.open("POST", webhook);

                request.setRequestHeader("Content-type", "application/json");

                const params = {
                  embeds: [
                    {
                      title: "Game Feedback",
                      color: 0xff0000,
                      fields: [
                        {
                          name: "Graphics Quality",
                          value: graphics,
                          inline: false,
                        },
                        {
                          name: "Gameplay Experience",
                          value: gameplay,
                          inline: false,
                        },
                        {
                          name: "Improvements",
                          value: improvements,
                          inline: false,
                        },
                        {
                          name: "Extra",
                          value: extra,
                          inline: false,
                        },
                        {
                          name: "Browser Name",
                          value: browserName,
                          inline: true,
                        },
                        {
                          name: "Browser Version",
                          value: browserVersion,
                          inline: true,
                        },
                        {
                          name: "Name",
                          value: "<?php echo $_SESSION["naam"]; ?>",
                          inline: false,
                        },
                      ],
                    },
                  ],
                };

                request.send(JSON.stringify(params));
              });
          });
      </script>
    </section>
    <footer>
      <div id="made-by-name">
        <h2 id="title-made-by-name">Made by:</h2>
        <ul>
          <li>Rida</li>
          <li>Hidde</li>
          <li>Nathan</li>
          <li>Nicole</li>
          <li>Delano</li>
          <li>Marnix</li>
        </ul>
      </div>
      <div id="socials">
        <h2 id="socials-title">Socials:</h2>
        <a href="https://instagram.com" target="_blank"
          ><i class="fa-brands fa-instagram"></i
        ></a>
        <a href="https://outlook.live.com/" target="_blank"
          ><i class="fa-solid fa-envelope"></i
        ></a>
        <a href="https://tiktok.com/" target="_blank"
          ><i class="fa-brands fa-tiktok"></i
        ></a>
        <a href="https://nl-nl.facebook.com/login.php/" target="_blank"
          ><i class="fa-brands fa-facebook"></i
        ></a>
        <p id="knolpower">© knolPOWER</p>
      </div>
      <div id="info-page">
        <h2 id="bron-title">Bron</h2>
        chatGPT3.5
      </div>
    </footer>
    <script src="index.js"></script>
  </body>
</html>
