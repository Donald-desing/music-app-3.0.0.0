const audioPlayer = document.getElementById('audioPlayer');  
const currentSong = document.getElementById('currentSong');  
const trackList = document.getElementById('trackList');  
const playlistDropdown = document.getElementById('playlistDropdown');  

let playlists = {};  
let currentPlaylist = [];  
let currentIndex = 0;  

document.getElementById('fileInput').addEventListener('change', handleFileSelect);  

function handleFileSelect(event) {  
    const files = event.target.files;  
    for (let file of files) {  
        const url = URL.createObjectURL(file);  
        addSongToCurrentPlaylist(file.name, url);  
    }  
}  

function addSongToCurrentPlaylist(name, url) {  
    currentPlaylist.push(url);  
    const li = document.createElement('li');  
    li.textContent = name;  
    li.onclick = () => playSong(currentPlaylist.indexOf(url));  
    trackList.appendChild(li);  
}  

function playSong(index) {  
    if (currentPlaylist.length > 0 && index < currentPlaylist.length) {  
        audioPlayer.src = currentPlaylist[index];  
        audioPlayer.play();  
        currentSong.textContent = `Now Playing: ${currentPlaylist[index].split('/').pop()}`;  
    }  
}  

function createPlaylist() {  
    const playlistName = prompt("Enter Playlist Name");  
    if (playlistName) {  
        playlists[playlistName] = [...currentPlaylist];  
        updatePlaylistDropdown(playlistName);  
    }  
}  

function updatePlaylistDropdown(playlistName) {  
    const a = document.createElement('a');  
    a.href = "#";  
    a.textContent = playlistName;  
    a.onclick = () => loadPlaylist(playlistName);  
    playlistDropdown.appendChild(a);  
}  

function loadPlaylist(playlistName) {  
    if (playlists[playlistName]) {  
        currentPlaylist = playlists[playlistName];  
        trackList.innerHTML = '';  
        currentPlaylist.forEach((songUrl, index) => {  
            const li = document.createElement('li');  
            li.textContent = `Song ${index + 1}`; // Display generic name or implement better naming logic  
            li.onclick = () => playSong(index);  
            trackList.appendChild(li);  
        });  
    }  
}  

// Event listeners for when a song ends to automatically play the next one  
audioPlayer.addEventListener('ended', () => {  
    currentIndex++;  
    if (currentIndex < currentPlaylist.length) {  
        playSong(currentIndex);  
    } else {  
        currentSong.textContent = "Playlist ended.";  
    }  
});
