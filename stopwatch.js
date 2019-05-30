var startButton = document.querySelector('.startTimer');
var pauseButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = false;
function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);

    paused = 0;
    running = true;
    timerDisplay.style.background = '#FF0000';
    timerDisplay.style.cursor = 'auto';
    timerDisplay.style.color = 'yellow';
    startButton.classList.add('lighter');
    pauseButton.classList.remove('lighter');
    startButton.style.cursor = 'auto';
    pauseButton.style.cursor = 'pointer';
  }
}
function pauseTimer() {
  if (!difference) {
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = false;
    timerDisplay.style.background = '#A90000';
    timerDisplay.style.color = '#690000';
    timerDisplay.style.cursor = 'pointer';
    startButton.classList.remove('lighter');
    pauseButton.classList.add('lighter');
    startButton.style.cursor = 'pointer';
    pauseButton.style.cursor = 'auto';
  } else {
    // if the timer was already paused, when they click pause again, start the timer again
    startTimer();
  }
}
function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = false;
  timerDisplay.innerHTML = 'START';
  timerDisplay.style.background = '#A90000';
  timerDisplay.style.color = '#fff';
  timerDisplay.style.cursor = 'pointer';
  startButton.classList.remove('lighter');
  pauseButton.classList.remove('lighter');
  startButton.style.cursor = 'pointer';
  pauseButton.style.cursor = 'auto';
}
function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = updatedTime - startTime + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = difference % 1000;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds =
    milliseconds < 100
      ? milliseconds < 10
        ? '00' + milliseconds
        : '0' + milliseconds
      : milliseconds;
  timerDisplay.innerHTML =
    hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

// My goal is to improve the code from this article.
// https://medium.com/@olinations/an-accurate-vanilla-js-stopwatch-script-56ceb5c6f45b