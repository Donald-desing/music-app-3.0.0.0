document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.play();
});
