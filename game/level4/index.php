<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InlogPage || tHerE is n0 esc4p3</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://kit.fontawesome.com/c6d023de9c.js" crossorigin="anonymous"></script> 
</head>

<body>
<div id="fietsband">
  <video id='video' width="100%" height="100%" autoplay="autoplay" onended="hideVideo()">
  <source src="../../assets/fietsband.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>
</div>
<button class="pause" onclick="pauseVideo()" id="pause" type="button"><i class="fa-solid fa-pause"></i></button>
<button class="play" onclick="playVideo()" id="play" type="button"><i class="fa-solid fa-play"></i></button>
<button class="skip" onclick="hideVideo()" id="skip" type="button">Skip <i class="fa-solid fa-forward-step"></i></button>
<main>


<form class="questions" action="">
  <h3>kies de juiste antwoorden<br> en kraak de code om het meisje te bevrijden</h3>
  <label for="ananas">Wat had de man op het begin vast?</label>
    <select name="ananas" id="ananas">
    <option value="-">Select</option>
    <option value="8">Appel</option>
    <option value="4">Sinaasappel</option>
    <option value="7">Ananas</option>
    <option value="2">Paard</option>
 </select>
 <label for="nodig" class="hide">hoeveel  producten heb je nodig?</label>
  <select name="nodig" id="nodig">
    <option value="-">Select</option>
    <option value="8">2</option>
    <option value="7">5</option>
    <option value="9">8</option>
    <option value="5">11</option> correct
    <option value="2">7</option>
 </select>
 <label for="band">Hoe heet het ijzeren ding<br> dat hij tussen de band steekt?</label>
    <select name="band" id="band">
      <option value="-">Select</option>
      <option value="4">bandelichter</option>
      <option value="2">bandenlichter</option>
      <option value="0">velglichter</option>
      <option value="6">zo'n ding</option>
</select>
  <label for="kleur">Welke kleur is de velg?</label>
    <select name="kleur" id="kleur">
      <option value="-">Select</option>
      <option value="4">geel</option>
      <option value="1">Sinaasappel paars</option>
      <option value="0">blauw</option>
      <option value="6">wit</option>
</select>
 <p>code komt hieronder</p>
 <input type="text" readonly="readonly" id="code" name="code" value="----">
 </form>

 <section>
  
 <div class="title-screen">
      <img id="eye" src="../../assets/eye.png"><h1>tHerE is n0 esc4p3</h1>
  </div>
  <button type="buttom" onclick="showVideo()" class="show" id="show"><i class="fa-solid fa-backward-step"></i> Back</button>

  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <div class="inlog">
      <p id="pass">PaSsWoRd</p>
      <label for="Password">
      <input type="password" id="Password" name="password" placeholder="EnTeR PaSs!!"><br>
      <input id="enter" type="submit" value="Enter">
    </div>
  </form>
</main>

<?php

session_start();
// if ($_SESSION["loggedin"] === true) {
//     header("location: /");
//     exit;
// }

try {   
  $port='3306';

  if($_SERVER['SERVER_NAME'] == 'localhost') {
    $host = 'localhost';
    $pass = 'root';
    $user = 'root';
  }else if($_SERVER['SERVER_NAME'] == 'thuis.wierper.net') {
    $host = 'thuis.wierper.net';
    $pass = 'NOescape!';
    $user = 'gamer';
  }

  $db= 'no-escape';
  $dbh = new PDO('mysql: host=' . $host.'; dbname='.$db
                .'; port=' . $port, $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Database Connection failed: " . $e->getMessage() . "<br><br>";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (!empty($_POST["password"])) {
        $password = $_POST["password"];

        // Use prepared statements to prevent SQL injection
        $sql = "SELECT * FROM loginpass WHERE password = :password AND id = 789";
        $stmt = $dbh->prepare($sql);
        $stmt->bindParam(':password', $password);

        try {
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if (count($result) > 0) {
                $_SESSION["level4"] = true;
                echo "<script>alert('Congrats!')</script>";
                header("location: /no-escape/game/end");
                exit;
            } else {
                echo '<div id="video-container">
                <video width="100%" height="100%" autoplay="autoplay" onended="redirectToIndex()">
                <source src="../../assets/rickroll.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                </div>';
                echo "<script>document.getElementById('video').pause();</script>";
                echo "<script>alert('Congrats!')</script>";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "servers down...";
    }
}
?>

<script src="index.js"></script>
</body>

</html>