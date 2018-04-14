// Body elements
const body = document.body
const time = document.getElementById('time')
const startButton = document.getElementById('startButton')
const pauseButton = document.getElementById('pauseButton')
const resetButton = document.getElementById('resetButton')
const arrowsToChangeTimer = document.querySelectorAll('.changetime')
const currentProgress = document.getElementById('currentProgress')
const standardMinutes = 25

let totalTime = getDisplayedTimeInSeconds()
let timeToRun = getDisplayedTimeInSeconds()
let runTime = 0
let runningClock = null

// Event listeners
startButton.addEventListener('click', function () {
  toggleButton(this.id)
  runClock()
  hideArrows()

  body.style.backgroundColor = 'LightGreen'
})

pauseButton.addEventListener('click', function () {
  if (runningClock) {
    toggleButton(this.id)
    pauseClock()
    showArrows()

    body.style.backgroundColor = 'LightSalmon'
  }
})

resetButton.addEventListener('click', function () {
  let standartTimer = standardMinutes * 60
  toggleButton(this.id)
  pauseClock()
  showArrows()
  updateTimeDisplayed(standartTimer)
  totalTime = timeToRun = standartTimer
  runTime = currentProgress.style.width = 0
  runningClock = null
  body.style.backgroundColor = 'White'
})

arrowsToChangeTimer.forEach(elem => {
  const listener = () => changeTimer(elem)
  elem.addEventListener('click', listener)
})

function hideArrows () {
  arrowsToChangeTimer.forEach(elem => {
    elem.style.visibility = 'hidden'
  })
}

function showArrows () {
  arrowsToChangeTimer.forEach(elem => {
    elem.style.visibility = 'visible'
  })
}

function toggleButton (buttonID) {
  switch (buttonID) {
    case 'startButton':
      startButton.disabled = true
      pauseButton.disabled = false
      break
    case 'pauseButton':
      startButton.disabled = false
      pauseButton.disabled = true
      break
    case 'resetButton':
      startButton.disabled = false
      pauseButton.disabled = false
      break
  }
}

// Timer clock functions
function runClock () {
  runningClock = setInterval(function () {
    countDown()
    updateProgressBar()
  }, 1000)

  currentProgress.style.backgroundColor = 'DarkGreen'
}

function countDown () {
  timeToRun -= 1
  runTime++

  updateTimeDisplayed(timeToRun)

  if (timeToRun <= 0) {
    clearInterval(runningClock)
  }
}

function pauseClock () {
  clearInterval(runningClock)
  currentProgress.style.backgroundColor = 'DarkRed'
}

function changeTimer (elem) {
  switch (elem.id) {
    case 'add-arrow':
      updateTimeDisplayed(addMinute())
      break
    case 'remove-arrow':
      updateTimeDisplayed(removeMinute())
      break
  }
}

function updateTimeDisplayed (timeInSeconds) {
  let t = returnTimeInParts(timeInSeconds)
  time.innerText = t.minutes + ':' + t.seconds
}

function addMinute () {
  let timeInSeconds = getDisplayedTimeInSeconds()

  if (timeInSeconds < 3540) {
    timeInSeconds += 60
    totalTime += 60
    timeToRun += 60
    updateProgressBar()
  }

  return timeInSeconds
}

function removeMinute () {
  let timeInSeconds = getDisplayedTimeInSeconds()

  if (timeInSeconds > 60) {
    timeInSeconds -= 60
    totalTime -= 60
    timeToRun -= 60
    updateProgressBar()
  }

  return timeInSeconds
}

// Timer display functions
function justifySingleDigits (i) {
  if (i < 10) { i = '0' + i }
  return i
}

function returnTimeInParts (time) {
  let seconds = Math.floor(time % 60)
  let minutes = Math.floor((time / 60) % 60)
  return {
    'seconds': justifySingleDigits(seconds),
    'minutes': justifySingleDigits(minutes)
  }
}

function getDisplayedTimeInSeconds () {
  let minutesString = document.getElementById('time').innerText.match(/^\d+/)
  let secondsString = document.getElementById('time').innerText.match(/\d+$/)

  return (Number(minutesString) * 60 + Number(secondsString))
}

// Progress bar
function updateProgressBar () {
  let percent = getProgressPercent(runTime)
  setProgressBarWidth(percent)
}

function getProgressPercent (runTime) {
  return (runTime / totalTime * 100)
}

function setProgressBarWidth (percent) {
  currentProgress.style.width = percent + '%'
}
