function redirectToIndex() {
  window.location.href = 'index.php';

  alert('YoU hAvE bEeN rIcK rOlLeD...')
  alert('tRy AgAiN')


  
}

function hideVideo() {
  document.getElementById('fietsband').style.display = 'none';
  document.getElementById('video').pause();
  document.getElementById('skip').style.display = 'none';
  document.getElementById('show').style.display = 'block';
}

function showVideo() {
  document.getElementById('fietsband').style.display = 'block';
  document.getElementById('video').play();
  document.getElementById('skip').style.display = 'block';
  document.getElementById('show').style.display = 'none';

}