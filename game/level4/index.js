function redirectToIndex() {
  window.location.href = 'index.php';

  alert('YoU hAvE bEeN rIcK rOlLeD...')
  alert('tRy AgAiN')


  
}

function hideVideo() {
  document.getElementById('fietsband').style.display = 'none';
  pauseVideo();
  document.getElementById('play').style.display = 'none';
  document.getElementById('pause').style.display = 'none';
  document.getElementById('skip').style.display = 'none';
  document.getElementById('show').style.display = 'block';


}

function showVideo() {
  document.getElementById('fietsband').style.display = 'block';
  playVideo();
  document.getElementById('skip').style.display = 'block';
  document.getElementById('show').style.display = 'none';
}

function pauseVideo(){
  document.getElementById('video').pause();
  document.getElementById('play').style.display = 'block';
  document.getElementById('pause').style.display = 'none';
}

function playVideo(){
  document.getElementById('video').play();
  document.getElementById('play').style.display = 'none';
  document.getElementById('pause').style.display = 'block';
}


var ananasSelect = document.getElementById('ananas');
var nodigSelect = document.getElementById('nodig');
var bandSelect = document.getElementById('band');
var kleurSelect = document.getElementById('kleur');
var codeInput = document.getElementById('code');

// Define the correct answers

// Function to check the answers and update the code input
// Function to check the answers and update the code input
function checkAnswers() {
  codeInput.value = ananasSelect.value + nodigSelect.value + bandSelect.value + kleurSelect.value;
}


// Add event listeners to the select elements
ananasSelect.addEventListener('change', checkAnswers);
nodigSelect.addEventListener('change', checkAnswers);
bandSelect.addEventListener('change', checkAnswers);
kleurSelect.addEventListener('change', checkAnswers);


function update(e){
  var x = e.clientX || e.touches[0].clientX
  var y = e.clientY || e.touches[0].clientY

  document.documentElement.style.setProperty('--cursorX', x + 'px')
  document.documentElement.style.setProperty('--cursorY', y + 'px')
}



// Path: game/level5/index.js