const fileInput = document.getElementById('fileInput');
const addToPlaylistButton = document.getElementById('addToPlaylist');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const volumeControl = document.getElementById('volumeControl');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const skipBackButton = document.getElementById('skipBack');
const skipForwardButton = document.getElementById('skipForward');
const previousTrackButton = document.getElementById('previousTrack');
const nextTrackButton = document.getElementById('nextTrack');
const progressBar = document.getElementById('progressBar');
const currentTrack = document.getElementById('currentTrack');
const allSongsList = document.getElementById('allSongsList') || {};

// Mocking the File object as localStorage cannot store it directly
class File {
    constructor(name) {
        this.name = name;
    }
}

let allSongs = [];
let playlistFiles = [];
let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    allSongs.push(new File(file.name));
    updateAllSongsUI();
});

addToPlaylistButton.addEventListener('click', function() {
    if (allSongs.length > 0) {
        const selectedSong = allSongs[currentIndex];
        playlistFiles.push(new File(selectedSong.name));
        updatePlaylistUI();
    }
});

audioPlayer.addEventListener('ended', function() {
    if (isRepeat) {
        audioPlayer.play();
    } else if (playlistFiles.length > 0) {
        if (isShuffle) {
            currentIndex = Math.floor(Math.random() * playlistFiles.length);
        } else {
            currentIndex = (currentIndex + 1) % playlistFiles.length;
        }
        playFile(playlistFiles[currentIndex]);
    }
});

audioPlayer.addEventListener('timeupdate', function() {
    progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
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

skipBackButton.addEventListener('click', function() {
    audioPlayer.currentTime -= 10;
});

skipForwardButton.addEventListener('click', function() {
    audioPlayer.currentTime += 10;
});

previousTrackButton.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        playFile(playlistFiles[currentIndex]);
    }
});

nextTrackButton.addEventListener('click', function() {
    if (currentIndex < playlistFiles.length - 1) {
        currentIndex++;
        playFile(playlistFiles[currentIndex]);
    }
});

function playFile(file) {
    audioPlayer.src = URL.createObjectURL(new Blob([], { type: 'audio/*' })); // Mocking URL for demo
    audioPlayer.play();
    currentTrack.textContent = `Now Playing: ${file.name}`;
}

function updatePlaylistUI() {
    playlist.innerHTML = '';
    playlistFiles.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            playlistFiles.splice(index, 1);
            updatePlaylistUI();
        });

        listItem.appendChild(removeButton);
        playlist.appendChild(listItem);
    });
}

function updateAllSongsUI() {
    if (allSongsList) {
        allSongsList.innerHTML = '';
        allSongs.forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;

            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Playlist';
            addButton.addEventListener('click', function() {
                playlistFiles.push(new File(file.name));
                updatePlaylistUI();
            });

            listItem.appendChild(addButton);
            allSongsList.appendChild(listItem);
        });
    }
}

function savePlaylist() {
    const playlistData = playlistFiles.map(file => file.name);
    localStorage.setItem('playlist', JSON.stringify(playlistData));
}

function loadPlaylist() {
    const playlistData = JSON.parse(localStorage.getItem('playlist') || '[]');
    playlistFiles = playlistData.map(fileName => new File(fileName));
    updatePlaylistUI();
}

window.addEventListener('load', loadPlaylist);
window.addEventListener('beforeunload', savePlaylist[_{{{CITATION{{{_1{](https://github.com/bgoonz/web-dev-utils-package/tree/65a7b21c0444f4cbeb3c313a750fb43560047e77/personal-utilities%2Fcopy-2-clip%2FREADME.md)[_{{{CITATION{{{_2{](https://github.com/buribalazs/smooth-drag-order/tree/7b40d21d076c3e31765f61481f537beaf4c5ec9f/README.md)[_{{{CITATION{{{_3{](https://github.com/aaditya110raj/Banking-system-spark-foundation/tree/df8c5c0e0c501c05c924fa00c7654bcf47e6a894/moneytranc.php)
