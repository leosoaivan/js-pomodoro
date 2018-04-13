// Body elements
const body = document.body
const arrowToAddTime = document.getElementById('add-arrow')
const arrowToRemoveTime = document.getElementById('remove-arrow')
const startButton = document.getElementById('startButton')
const pauseButton = document.getElementById('pauseButton')
const resetButton = document.getElementById('resetButton')
const arrowsToChangeTimer = document.querySelectorAll('.changetime')
const currentProgress = document.getElementById('currentProgress')
let runningClock = null

// Event listeners
startButton.addEventListener("click", function() {
  toggleButton(this.id)
  runClock();
  hideArrows();

  body.style.backgroundColor = 'LightGreen';
});

pauseButton.addEventListener("click", function() {
  if (runningClock) {
    toggleButton(this.id)
    pauseClock();
    showArrows();

    body.style.backgroundColor = 'LightSalmon';
  }
});

resetButton.addEventListener("click", function() {
  toggleButton(this.id)
  pauseClock();
  showArrows();
  updateTimeDisplayed(25 * 60)

  body.style.backgroundColor = 'White'
  currentProgress.style.width = 0
})

arrowsToChangeTimer.forEach(elem => {
  const listener = () => changeTimer(elem)
  elem.addEventListener("click", listener)
})

function hideArrows() {
  arrowsToChangeTimer.forEach(elem => {
    elem.style.visibility = "hidden";
  })
}

function showArrows() {
  arrowsToChangeTimer.forEach(elem => {
    elem.style.visibility = "visible";
  })
}

function toggleButton(buttonID) {
  switch (buttonID) {
    case 'startButton':
      startButton.disabled = true;
      pauseButton.disabled = false;
      break;
    case 'pauseButton':
      startButton.disabled = false;
      pauseButton.disabled = true;
      break;
    case 'resetButton':
      startButton.disabled = false;
      pauseButton.disabled = false;
      break;
  }
}

// Timer clock functions
function countDown(){
  let currentSeconds = getDisplayedTimeInSeconds();
  currentSeconds -= 1
  
  updateTimeDisplayed(currentSeconds)

  if(currentSeconds <= 0){
    alert('Finished');
    clearInterval(runningClock);
  }
}

function runClock(){
  let initialTime = getDisplayedTimeInSeconds();
  runningClock = setInterval(function(){
    countDown();
    progress(initialTime);
  }, 1000)

  currentProgress.style.backgroundColor = "DarkGreen"
}

function pauseClock(){
  clearInterval(runningClock);
  currentProgress.style.backgroundColor = "DarkRed"
}

function changeTimer(elem) {
  switch (elem.id) {
    case 'add-arrow':
      updateTimeDisplayed(addMinute());
      break;
    case 'remove-arrow':
      updateTimeDisplayed(removeMinute());
      break;
  }
}

function updateTimeDisplayed(timeInSeconds) {
  let t = returnTimeInParts(timeInSeconds)
  time.innerText = t.minutes + ":" + t.seconds
}

function addMinute() {
  let timeInSeconds = getDisplayedTimeInSeconds();
  timeInSeconds += 60;
  return timeInSeconds;
}

function removeMinute() {
  let timeInSeconds = getDisplayedTimeInSeconds();
  timeInSeconds -= 60;
  return timeInSeconds;
}

// Timer display functions
function justifySingleDigits(i) {
  if (i < 10) { i = "0" + i };
  return i
}

function returnTimeInParts(time) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor((time / 60) % 60);
  return {
    'seconds': justifySingleDigits(seconds),
    'minutes': justifySingleDigits(minutes)
  }
}

function getDisplayedTimeInSeconds() {
  let minutesString = document.getElementById('time').innerText.match(/^\d+/)
  let secondsString = document.getElementById('time').innerText.match(/\d+$/)

  return (Number(minutesString) * 60 + Number(secondsString))
}

// Progress bar
function progress(initialTime){
  let timePassed = initialTime - getDisplayedTimeInSeconds()
  let percentOfCompletedTime = timePassed / initialTime * 100

  currentProgress.style.width = percentOfCompletedTime + "%"
}