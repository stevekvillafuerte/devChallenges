// script.js

const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "../resources/lost-in-city-lights-145038.mp3",
    img: "../resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "../resources/forest-lullaby-110624.mp3",
    img: "../resources/cover-2.jpg",
  },
];

let currentSongIndex = 0;

const audio = document.querySelector("audio");
let song_title = document.getElementById("song_title");
let authorr = document.getElementById("author");
let cover = document.getElementById("cover");
const seekbar = document.getElementById("seekbar");

document.getElementById("play").addEventListener("click", playPause);
document.getElementById("nextButton").addEventListener("click", nextSong);
document.getElementById("prevButton").addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgressBar);

function playPause() {
  // Add pause button implementation
  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }

}



function nextSong() {
  // Add next button implementation
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();

}
function prevSong() {
  // Add previous button implementation
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();

  
}

function loadSong(index) {
  song_title.textContent = songs[index].title
  authorr.textContent =songs[index].author
  audio.src = songs[index].src
  cover.src = songs[index].img
  seekbar.value = 0;
  document.getElementById("res").textContent = audio.duration
}

function updateProgressBar() {
  // Handle when progress bar is updated
  seekbar.max = audio.duration;
  seekbar.value = audio.currentTime;
  document.getElementById("curr").textContent = formatTime(audio.currentTime)
}


function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
seekbar.addEventListener("input", function () {
  audio.currentTime = this.value;
});

audio.addEventListener("loadedmetadata", () => {
  console.log("Song duration:", audio.duration); // in seconds
  document.getElementById("res").textContent = formatTime(audio.duration);
});

// Initial load
loadSong(currentSongIndex);