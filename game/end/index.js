function playAudio() {
  var audio = document.getElementById("myAudio");
  document.getElementById("overlay").style.display = "none";
  audio.play().catch(function (error) {
    console.log("Autoplay prevented: ", error);
  });
}
