const container = document.querySelector('.container');
const mainVideo = document.querySelector('video');
const videoTimeline = document.querySelector('.video-timeline');
const progressTime = document.querySelector('.video-timeline span');
const progressBar = document.querySelector('.progress-bar');
const volumeBtn = document.querySelector('.volume i');
const volumeSlider = document.querySelector('.left input');
const currentVidTime = document.querySelector('.current-time');
const videoDuration = document.querySelector('.video-duration');
const skipBackward = document.querySelector('.skip-backward i');
const skipForward = document.querySelector('.skip-forward i');
const videoDurationText = document.querySelector('.video-duration');
const playPauseBtn = document.querySelector('.play-pause i');
const speedBtn = document.querySelector('.playback-speed span');
const speedOptions = document.querySelector('.speed-options');
const picInPicBtn = document.querySelector('.pic-in-pic span');
const fullscreenBtn = document.querySelector('.fullscreen i');

let timer;

function hideControls() {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    container.classList.remove('show-controls');
  }, 3000);
}

container.addEventListener('mousemove', () => {
  container.classList.add('show-controls');
  clearTimeout(timer);
  hideControls();
});

function formatTime(time) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

function dragProgressBar(e) {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

mainVideo.addEventListener('timeupdate', (e) => {
  const { currentTime, duration } = e.target;
  const percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener('loadeddata', (e) => {
  videoDuration.innerText = formatTime(e.target.duration);
});

videoTimeline.addEventListener('click', (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

videoTimeline.addEventListener('mousedown', () => {
  videoTimeline.addEventListener('mousemove', dragProgressBar);
});

document.addEventListener('mouseup', () => {
  videoTimeline.removeEventListener('mousemove', dragProgressBar);
});

videoTimeline.addEventListener('mousemove', (e) => {
  const offsetX = e.offsetX;
  progressTime.style.left = `${offsetX}px`;
  let timelineWidth = videoTimeline.clientWidth;
  let percent = (offsetX / timelineWidth) * mainVideo.duration;
  progressTime.innerText = formatTime(percent);
});

volumeBtn.addEventListener('click', () => {
  if (!volumeBtn.classList.contains('fa-volume-high')) {
    mainVideo.volume = 0.5;
    volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
  }
  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener('input', (e) => {
  mainVideo.volume = e.target.value;
  if (e.target.value == 0) {
    volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
  } else {
    volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
  }
});

skipBackward.addEventListener('click', () => {
  mainVideo.currentTime -= 5;
});

skipForward.addEventListener('click', () => {
  mainVideo.currentTime += 5;
});

playPauseBtn.addEventListener('click', () => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

speedBtn.addEventListener('click', () => {
  speedOptions.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (
    e.target.tagName !== 'SPAN' ||
    e.target.className !== 'material-symbols-rounded'
  ) {
    speedOptions.classList.remove('show');
  }
});

speedOptions.querySelectorAll('li').forEach((option) => {
  option.addEventListener('click', (e) => {
    let speed = parseFloat(e.target.innerText);
    if (!speed) {
      speed = 1;
    }
    mainVideo.playbackRate = speed;
    speedOptions.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
  });
});

picInPicBtn.addEventListener('click', () => {
  mainVideo.requestPictureInPicture();
});

fullscreenBtn.addEventListener('click', () => {
  container.classList.toggle('fullscreen');
  if (document.fullscreenElement) {
    fullscreenBtn.classList.replace('fa-compress', 'fa-expand');
    return document.exitFullscreen();
  }
  fullscreenBtn.classList.replace('fa-expand', 'fa-compress');
  container.requestFullscreen();
});

mainVideo.addEventListener('play', () => {
  playPauseBtn.classList.replace('fa-play', 'fa-pause');
});

mainVideo.addEventListener('pause', () => {
  playPauseBtn.classList.replace('fa-pause', 'fa-play');
});
