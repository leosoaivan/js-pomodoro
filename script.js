// const time = document.getElementById('time')
const arrowToAddTime = document.getElementById('add-arrow')
const arrowToRemoveTime = document.getElementById('remove-arrow')
const startButton = document.getElementById('startbutton')

function returnTimeInParts(initialTime) {
  let seconds = Math.floor(initialTime % 60);
  let minutes = Math.floor((initialTime/60) % 60);
  return {
    'seconds': checkTime(seconds),
    'minutes': checkTime(minutes)
  }
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };
  return i
}

function runTime(initialTime){
  let timeInterval = setInterval(function(){
    initialTime -= 1
    
    let t = returnTime(initialTime)
    time.innerText = t.minutes + ":" + t.seconds

    if(initialTime <= 0){
      alert('Finished');
      clearInterval(timeInterval);
    }
  }, 1000)
}

function returnCurrentMinutes() {
  minutesString = document.getElementById('time').innerText.match(/\d+/)
  return Number(minutesString)
}

function addMinute() {
  timeInSeconds = returnCurrentMinutes() * 60;
  timeInSeconds += 60;
  return timeInSeconds;
}

function removeMinute() {
  timeInSeconds = returnCurrentMinutes() * 60;
  timeInSeconds -= 60;
  return timeInSeconds;
}

function updateTimeDisplayed(timeInSeconds) {
  let t = returnTimeInParts(timeInSeconds)
  time.innerText = t.minutes + ":" + t.seconds
}

// Click actions
arrowToAddTime.addEventListener("click", function() {
  newTime = addMinute();
  updateTimeDisplayed(newTime);
})

arrowToRemoveTime.addEventListener("click", function() {
  newTime = removeMinute();
  updateTimeDisplayed(newTime);
})

startButton.addEventListener("click", function(){
  runTime(5)
});