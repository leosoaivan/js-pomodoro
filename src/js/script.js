// Body elements
const body = document.body
const time = document.getElementById('time')
const startButton = document.getElementById('startButton')
const pauseButton = document.getElementById('pauseButton')
const buttons = document.querySelectorAll('button')
const arrowsToChangeTimer = document.querySelectorAll('.arrow')
const currentProgress = document.getElementById('currentProgress')
const defaultMinutes = 25

let totalTime = getDisplayedTimeInSeconds()
let timeToRun = getDisplayedTimeInSeconds()
let breakToRun = 300
let runTime = 0
let runningClock = null
let runningBreak = null

// Event listeners
buttons.forEach(elem => {
  const buttonAction = () => buttonFunction(elem)
  elem.addEventListener('click', buttonAction)
})

function buttonFunction (elem) {
  switch (elem.id) {
    case 'startButton':
      startPomodoro(elem)
      break
    case 'pauseButton':
      pausePomodoro(elem)
      break
    case 'resetButton':
      resetAll(elem)
      break
  }
}

function startPomodoro (elem) {
  toggleButton(elem.id)
  hideArrows()
  
  if (runningClock === null || runningClock !== 0) {
    runClock()
    body.style.backgroundColor = 'LightGreen'
  } else {
    runBreak()
  }
}

function pausePomodoro (elem) {
  toggleButton(elem.id)
  pauseClock()
  showArrows()

  body.style.backgroundColor = 'LightSalmon'
}

function resetAll (elem) {
  let standartTimer = defaultMinutes * 60
  toggleButton(elem.id)
  pauseClock()
  showArrows()
  updateTimeDisplayed(standartTimer)
  totalTime = timeToRun = standartTimer
  breakToRun = 300
  runningClock = runningBreak = null
  runTime = currentProgress.style.width = 0
  body.style.backgroundColor = 'White'
}

arrowsToChangeTimer.forEach(elem => {
  const listener = () => changeTimer(elem)
  elem.addEventListener('click', listener)
})

function changeTimer (elem) {
  switch (elem.id) {
    case 'increase-by-one':
      updateTimeDisplayed(addMinute())
      break
    case 'increase-by-five':
      updateTimeDisplayed(addMinute(5))
      break
    case 'decrease-by-one':
      updateTimeDisplayed(removeMinute())
      break
    case 'decrease-by-five':
      updateTimeDisplayed(removeMinute(5))
      break
  }
}

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
  
  if (timeToRun === 0) {
    clearInterval(runningClock)
    runningClock = 0
    updateTimeDisplayed(breakToRun)
    runBreak()
  }
}

function runBreak () {
  runningBreak = setInterval(function () {
    breakToRun -= 1
    updateTimeDisplayed(breakToRun)

    if (breakToRun === 0) {
      clearInterval(runningBreak)
      resetAll()
    }
  }, 1000)

  body.style.backgroundColor = 'Orange'
  currentProgress.style.backgroundColor = 'DarkOrange'
}

function pauseClock () {
  clearInterval(runningClock)
  clearInterval(runningBreak)
  currentProgress.style.backgroundColor = 'DarkRed'
}

function updateTimeDisplayed (timeInSeconds) {
  let t = returnTimeInParts(timeInSeconds)
  time.innerText = t.minutes + ':' + t.seconds
}

function addMinute (multiplier = 1) {
  let timeInSeconds = getDisplayedTimeInSeconds()

  if (timeInSeconds < (3660 - multiplier * 60)) {
    timeInSeconds += (60 * multiplier)
    totalTime += (60 * multiplier)
    timeToRun += (60 * multiplier)
    updateProgressBar()
  }

  return timeInSeconds
}

function removeMinute (multiplier = 1) {
  let timeInSeconds = getDisplayedTimeInSeconds()

  if (timeInSeconds > 60 * multiplier) {
    timeInSeconds -= (60 * multiplier)
    totalTime -= (60 * multiplier)
    timeToRun -= (60 * multiplier)
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
  let minutes = Math.floor((time / 60) % 61)
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
