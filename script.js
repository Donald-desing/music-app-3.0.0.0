const fileInput = document.getElementById('fileInput');
const addToPlaylistButton = document.getElementById('addToPlaylist');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const volumeControl = document.getElementById('volumeControl');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');

let playlistFiles = [];

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    playlistFiles.push(file);
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    playlist.appendChild(listItem);
});

addToPlaylistButton.addEventListener('click', function() {
    if (playlistFiles.length > 0) {
        playFile(playlistFiles.shift());
    }
});

audioPlayer.addEventListener('ended', function() {
    if (playlistFiles.length > 0) {
        playFile(playlistFiles.shift());
    }
});

volumeControl.addEventListener('input', function(event) {
    audioPlayer.volume = event.target.value;
});

toggleDarkModeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

function playFile(file) {
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.play();
}
