<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InlogPage || CanYOuSee</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
<main>
  <div class="title-screen">
      <img id="eye" src="../../assets/eye.png"><h1>CAn YOu SeE?</h1>

  </div>

  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <div class="Inlog">
      <p id="user">PaSsWoRd</p>
      <label for="Password">
      <input type="password" id="Password" name="password" placeholder="EnTeR PaSs!!"><br><br>
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
  // when on server remove //
  $host = 'thuis.wierper.net';
  $pass = 'Wierper1411';


  // $pass = 'root';
  // $host = 'localhost';
  $port='3306';
  $user = 'root';
  
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
                header("location: /no-escape");
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
        echo "Please enter a username and password";
    }
}
?>

<script src="index.js"></script>
</body>

</html>