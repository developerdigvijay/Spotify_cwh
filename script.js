// Initialize the variables
let songIndex = 0;
const audioElement = new Audio("songs/1.mp3");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const songListContainer = document.getElementById("songList");
let songItems = [];

const songs = [
  { songName: "Hurt You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Dancing in the rain", filePath: "songs/2.mp3", coverPath: "covers/1.jpg" },
  { songName: "Moth to Flame", filePath: "songs/3.mp3", coverPath: "covers/1.jpg" },
  { songName: "After Hours", filePath: "songs/4.mp3", coverPath: "covers/1.jpg" },
  { songName: "Blinding lights", filePath: "songs/5.mp3", coverPath: "covers/1.jpg" },
];

// Generate song list dynamically
function initializeSongList() {
  songs.forEach((song, i) => {
    const songItem = document.createElement("div");
    songItem.className = "songItem";
    songItem.innerHTML = `
      <img src="${song.coverPath}" alt="${song.songName}" />
      <span class="songName">${song.songName}</span>
      <span class="SongListPlay"><span>04:20</span></span>
      <i id="${i}" class="far fa-play-circle songItemPlay"></i>
    `;
    songListContainer.appendChild(songItem);
  });
  songItems = Array.from(document.querySelectorAll(".songItem"));
}

initializeSongList();

// Helper function to update play button state
function updatePlayButton(isPlaying) {
  if (isPlaying) {
    masterPlay.classList.add("fa-pause-circle");
    masterPlay.classList.remove("fa-play-circle");
    gif.style.opacity = 1;
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
}

// Handle play/pause click for the master play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    updatePlayButton(true);
  } else {
    audioElement.pause();
    updatePlayButton(false);
  }
});

// Update the progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

// Seekbar control
myProgressBar.addEventListener("change", function () {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all song play buttons
function resetAllPlayButtons() {
  document.querySelectorAll(".songItemPlay").forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
}

// Function to play a song by index
function playSong(index) {
  songIndex = index;
  resetAllPlayButtons();
  const playButton = document.getElementById(index.toString());
  playButton.classList.remove("fa-play-circle");
  playButton.classList.add("fa-pause-circle");
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  updatePlayButton(true);
}

// Handle individual song play button click
songListContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("songItemPlay")) {
    playSong(parseInt(e.target.id));
  }
});

// Next button functionality
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

// Previous button functionality
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});
