let video = document.getElementById('video');
let controls = document.getElementById('controls');

// Hide the default controls (on by default for no-javascript fallback).
video.controls = false;

// Set controls equal to video width.
video.addEventListener('loadedmetadata', function() {
  controls.style.width = video.scrollWidth.toString() + "px";
})

// Play and pause the video.
let playPause = document.getElementById('playPause');
playPause.addEventListener('click', function() {
  if (video.paused || video.ended) myPlay()
  else myPause();
});

// Play and pause the video on video click.
video.addEventListener('click', function() {
  if (video.paused || video.ended) myPlay()
  else myPause();
});

function myPlay() {
  video.play();
  playPause.innerText = "Pause"
}

function myPause() {
  video.pause();
  playPause.innerText = "Play"
}

// Update a progress bar and time text based on current video time.
let progress = document.getElementById('progress');
let time = document.getElementById('time');
video.addEventListener('timeupdate', function() {
  if (!progress.getAttribute('max')) progress.max = video.duration;
  let currentTime = video.currentTime;
  progress.value = currentTime;

  // Update time.
  let currentTimeString = secondsToTimeString(currentTime)
  let durationTimeString = secondsToTimeString(video.duration)
  time.innerText = currentTimeString + "/" + durationTimeString;
});

function secondsToTimeString(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  let hoursString = "00:";
  if (hours > 0 && hours < 10) hoursString = "0" + hours + ":";
  if (hours >= 10) hoursString = hours.toString() + ":";

  let minutesString = "00:";
  if (minutes > 0 && minutes < 10) minutesString = "0" + minutes + ":";
  if (minutes >= 10) minutesString = minutes.toString() + ":";

  let secondsString = "00";
  if (remainingSeconds > 0 && remainingSeconds < 10) secondsString = "0" + remainingSeconds;
  if (remainingSeconds >= 10) secondsString = remainingSeconds.toString();

  return hoursString + minutesString + secondsString;
}

// Set video time for progress bar click.
progress.addEventListener('click', function(e) {
  let progressPercent = (e.pageX - this.offsetLeft) / this.offsetWidth;
  video.currentTime = video.duration * progressPercent;
});

// Skip video backwards 5 seconds.
let skipBackward = document.getElementById('skipBackward');
skipBackward.addEventListener('click', function() {
  video.currentTime = video.currentTime - 5;
});

// Skip video backwards 5 seconds.
let skipForward = document.getElementById('skipForward');
skipForward.addEventListener('click', function() {
  video.currentTime = video.currentTime + 5;
});

// Mute/unmute the video (and update button text).
let mute = document.getElementById('mute');
mute.addEventListener('click', function() {
  video.muted = !video.muted;
  mute.innerText = (video.muted) ? "Unmute" : "Mute";
});

// Update mute button if volume is changed manually
video.addEventListener('volumechange', function() {
  mute.innerText = (video.volume > 0) ? "Mute" : "Unmute";
});
