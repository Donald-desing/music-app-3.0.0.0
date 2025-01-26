const fileInput = document.getElementById('fileInput');
const addToPlaylistButton = document.getElementById('addToPlaylist');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const volumeControl = document.getElementById('volumeControl');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const currentTrack = document.getElementById('currentTrack');

let playlistFiles = [];
let isShuffle = false;
let isRepeat = false;

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
    if (isRepeat) {
        audioPlayer.play();
    } else if (playlistFiles.length > 0) {
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlistFiles.length);
            playFile(playlistFiles.splice(randomIndex, 1)[0]);
        } else {
            playFile(playlistFiles.shift());
        }
    }
});

volumeControl.addEventListener('input', function(event) {
    audioPlayer.volume = event.target.value;
});

toggleDarkModeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

shuffleButton.addEventListener('click', function() {
    isShuffle = !isShuffle;
    shuffleButton.textContent = isShuffle ? 'Shuffle On' : 'Shuffle';
});

repeatButton.addEventListener('click', function() {
    isRepeat = !isRepeat;
    repeatButton.textContent = isRepeat ? 'Repeat On' : 'Repeat';
});

function playFile(file) {
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.play();
    currentTrack.textContent = `Now Playing: ${file.name}`;
}
