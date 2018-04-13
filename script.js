// Body elements
const body = document.body
const arrowToAddTime = document.getElementById('add-arrow')
const arrowToRemoveTime = document.getElementById('remove-arrow')
const startButton = document.getElementById('startbutton')
const pauseButton = document.getElementById('pausebutton')
const resetButton = document.getElementById('resetbutton')
const arrowsToChangeTimer = document.querySelectorAll('.changetime')
let runningClock = null

// Event listeners
startButton.addEventListener("click", function() {
  this.disabled = true;
  pauseButton.disabled = false;
  
  runClock();
  hideArrows();
  body.style.backgroundColor = 'LightGreen';
});

pauseButton.addEventListener("click", function() {
  this.disabled = true
  startButton.disabled = false;

  pauseClock();
  showArrows();
  body.style.backgroundColor = 'LightSalmon';
});

resetButton.addEventListener("click", function() {
  pauseClock();
  showArrows();
  body.style.backgroundColor = 'White'
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
  runningClock = setInterval(function(){
    countDown();
  }, 1000)
}

function pauseClock(){
  clearInterval(runningClock);
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
  timeInSeconds = getDisplayedTimeInSeconds();
  timeInSeconds += 60;
  return timeInSeconds;
}

function removeMinute() {
  timeInSeconds = getDisplayedTimeInSeconds();
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
  minutesString = document.getElementById('time').innerText.match(/^\d+/)
  secondsString = document.getElementById('time').innerText.match(/\d+$/)

  return (Number(minutesString) * 60 + Number(secondsString))
}