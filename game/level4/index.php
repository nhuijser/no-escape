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
<button class="skip" onclick="hideVideo()" id="skip" type="button">Skip <i class="fa-solid fa-forward-step"></i></button>

<main>
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
                header("location: /game/end");
                exit;
            } else {
                echo '<div id="video-container">
                <video width="100%" height="100%" autoplay="autoplay" onended="redirectToIndex()">
                <source src="../../assets/rickroll.mp4" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                </div>';
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