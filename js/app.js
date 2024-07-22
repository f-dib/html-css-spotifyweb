// Select all the elements in the HTML page
// and assign them to a variable
let track_art = document.querySelectorAll(".track-art");
let track_name = document.querySelectorAll(".track-name");
let track_artist = document.querySelectorAll(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffle_btn = document.querySelector(".fa-shuffle");
let rotate_btn = document.querySelector(".fa-arrow-rotate-right");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let volume_slider_mobile = document.querySelector(".volume_slider_mobile");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let isShuffle = false; 
let updateTimer;
 
// Create the audio element for the player
let curr_track = document.createElement('audio');

let track_list = [
  {
      name : "IO, ME ED ALTRI GUAI",
      artist : "Rose Villain",
      image : "img/RadioSakura.jpg",
      path : "music/IO_ME_ED_ALTRI_GUAI.mp3"
  },
  {
      name : "Sunflower",
      artist : "Post Malone & Swae Lee",
      image : "img/sunflower-spider-man-into-the-spider-verse.jpg",
      path : "music/Sunflower.mp3"
  },
  {
      name : "IDGAF",
      artist : "Dua Lipa",
      image : "img/dua.webp",
      path : "music/IDGAF.mp3"
  },
  {
      name : "QUALCOSA IN CUI CREDERE",
      artist : "Marracash",
      image : "img/marra.jpg",
      path : "music/QUALCOSA_IN_CUI_CREDERE.mp3"
  },
  {
      name : "Con il nastro rosa",
      artist : "Lucio Battisti",
      image : "img/battisti.webp",
      path : "music/Con_il_nastro_rosa.mp3"
  }
]

const trackContainer = document.getElementById('track-list');

track_list.forEach((track, index) => {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album', 'column');

    const albumCoverDiv = document.createElement('div');
    albumCoverDiv.classList.add('album-cover');

    const img = document.createElement('img');
    img.classList.add('rounded');
    img.src = track.image;
    img.alt = track.name;

    const playOverlayDiv = document.createElement('div');
    playOverlayDiv.classList.add('play-overlay');
    const playIcon = document.createElement('i');
    playIcon.classList.add('fa-solid', 'fa-circle-play');
    playIcon.setAttribute('data-index', index);
    playOverlayDiv.appendChild(playIcon);

    albumCoverDiv.appendChild(img);
    albumCoverDiv.appendChild(playOverlayDiv);

    const trackNameH2 = document.createElement('h2');
    trackNameH2.classList.add('track-name');
    trackNameH2.textContent = track.name;

    const trackArtistDiv = document.createElement('div');
    trackArtistDiv.classList.add('author', 'track-artist');
    trackArtistDiv.textContent = track.artist;

    albumDiv.appendChild(albumCoverDiv);
    albumDiv.appendChild(trackNameH2);
    albumDiv.appendChild(trackArtistDiv);

    trackContainer.appendChild(albumDiv);
});

// Add event listeners to play icons
document.querySelectorAll('.fa-circle-play').forEach(playIcon => {
  playIcon.addEventListener('click', (event) => {
      const trackIndex = event.target.getAttribute('data-index');
      loadTrack(trackIndex);
      playTrack();
      updatePlayIcons(trackIndex);
  });
});

function loadTrack(index) {
  track_index = parseInt(index);

  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
  
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  
  // Update details of the track
  track_art.forEach(art => art.style.backgroundImage = `url("${track_list[track_index].image}")`);
  track_name.forEach(name => name.textContent = track_list[track_index].name);
  track_artist.forEach(artist => artist.textContent = track_list[track_index].artist);
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}
  
// Function to reset all values to their default
function resetValues() {
curr_time.textContent = "00:00";
total_duration.textContent = "00:00";
seek_slider.value = 0;
}
  
function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}
 
function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
 
  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-2xl"></i>';
}
 
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
 
  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-2xl"></i>';
}
 
function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (isShuffle) {
    let randomIndex = Math.floor(Math.random() * track_list.length);
    loadTrack(randomIndex);
  } else {
      if (track_index < track_list.length - 1)
          track_index += 1;
      else 
          track_index = 0;
      loadTrack(track_index);
  }

  playTrack();
}
 
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
   
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

// Funzione per riprodurre una traccia casuale
function shuffleTrack() {
    isShuffle = !isShuffle; // Toggle shuffle
    shuffle_btn.classList.toggle('active', isShuffle); // Optional: Add a class to indicate shuffle is active
}

// Funzione per ricominciare la traccia corrente dall'inizio
function rotateTrack() {
  curr_track.currentTime = 0;
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider 
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
 
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
 
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function setVolumeMobile() {
  // Set the volume according to the
  // percentage of the volume slider for mobile set
  curr_track.volume = volume_slider_mobile.value / 100;
}
 
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function updatePlayIcons(trackIndex) {
  // Reset all play icons to the initial state
  document.querySelectorAll('.fa-circle-play, .fa-circle-pause').forEach(icon => {
    // Update the main play button to pause
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-2xl"></i>';
  });

  // Set the play icon of the current track to pause
  const currentIcon = document.querySelector(`.fa-circle-play[data-index="${trackIndex}"]`);
  if (currentIcon) {
    // Update the main play button to pause
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-pause fa-2xl"></i>';
  }
}

// Load the first track in the tracklist
loadTrack(track_index);