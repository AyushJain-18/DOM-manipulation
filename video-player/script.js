const player        = document.querySelector('.player');
const video         = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar   = document.querySelector('.progress-bar');
const playBtn       = document.getElementById('play-btn');
const volumeIcon    = document.getElementById('volume-icon');
const volumeRange   = document.querySelector('.volume-range');
const volumeBar     = document.querySelector('.volume-bar');
const speed         = document.querySelector('.player-speed');
const currentTime   = document.querySelector('.time-elapsed');
const duration      = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Format current time, duration
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds   = Math.floor(time % 60) 
  seconds        = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${formatTime(video.currentTime)} /`;
  duration.textContent = `${formatTime(video.duration)}`;
}

// Click to seek within the video
function setProgressOnSeek(e) {
  const seekProgressFraction = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width    = `${seekProgressFraction * 100}%`;
  video.currentTime          = seekProgressFraction * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    volumeBar.style.width = 0;
    lastVolume            = video.volume;
    video.volume          = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    lastVolume > 0.8?volumeIcon.classList.add('fas', 'fa-volume-up'  ):
                     volumeIcon.classList.add('fas', 'fa-volume-down');
    volumeIcon.setAttribute('title', 'Mute');
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;  
  }
}


// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) { volume = 0;}
  if (volume > 0.9) { volume = 1;}
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let isfullscreen = false;
let canExitFullScreen  = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!isfullscreen) {  openFullscreen(player); canExitFullScreen= true;} 
  else { closeFullscreen(); }
  isfullscreen = !isfullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgressOnSeek);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
player.addEventListener('fullscreenchange',()=> {
  if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
    closeFullscreen();
    isfullscreen = !isfullscreen
  }});
