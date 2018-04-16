const body=document.body;const time=document.getElementById("time");const startButton=document.getElementById("startButton");const pauseButton=document.getElementById("pauseButton");const resetButton=document.getElementById("resetButton");const arrowsToChangeTimer=document.querySelectorAll(".arrow");const currentProgress=document.getElementById("currentProgress");const standardMinutes=25;let totalTime=getDisplayedTimeInSeconds();let timeToRun=getDisplayedTimeInSeconds();let runTime=0;let runningClock=null;startButton.addEventListener("click",function(){toggleButton(this.id);runClock();hideArrows();body.style.backgroundColor="LightGreen"});pauseButton.addEventListener("click",function(){if(runningClock){toggleButton(this.id);pauseClock();showArrows();body.style.backgroundColor="LightSalmon"}});resetButton.addEventListener("click",function(){let e=standardMinutes*60;toggleButton(this.id);pauseClock();showArrows();updateTimeDisplayed(e);totalTime=timeToRun=e;runTime=currentProgress.style.width=0;runningClock=null;body.style.backgroundColor="White"});arrowsToChangeTimer.forEach(e=>{const t=()=>changeTimer(e);e.addEventListener("click",t)});function hideArrows(){arrowsToChangeTimer.forEach(e=>{e.style.visibility="hidden"})}function showArrows(){arrowsToChangeTimer.forEach(e=>{e.style.visibility="visible"})}function toggleButton(e){switch(e){case"startButton":startButton.disabled=true;pauseButton.disabled=false;break;case"pauseButton":startButton.disabled=false;pauseButton.disabled=true;break;case"resetButton":startButton.disabled=false;pauseButton.disabled=false;break}}function runClock(){runningClock=setInterval(function(){countDown();updateProgressBar()},1e3);currentProgress.style.backgroundColor="DarkGreen"}function countDown(){timeToRun-=1;runTime++;updateTimeDisplayed(timeToRun);if(timeToRun<=0){clearInterval(runningClock)}}function pauseClock(){clearInterval(runningClock);currentProgress.style.backgroundColor="DarkRed"}function changeTimer(e){switch(e.id){case"add-arrow":updateTimeDisplayed(addMinute());break;case"remove-arrow":updateTimeDisplayed(removeMinute());break}}function updateTimeDisplayed(e){let t=returnTimeInParts(e);time.innerText=t.minutes+":"+t.seconds}function addMinute(){let e=getDisplayedTimeInSeconds();if(e<3540){e+=60;totalTime+=60;timeToRun+=60;updateProgressBar()}return e}function removeMinute(){let e=getDisplayedTimeInSeconds();if(e>60){e-=60;totalTime-=60;timeToRun-=60;updateProgressBar()}return e}function justifySingleDigits(e){if(e<10){e="0"+e}return e}function returnTimeInParts(e){let t=Math.floor(e%60);let n=Math.floor(e/60%60);return{seconds:justifySingleDigits(t),minutes:justifySingleDigits(n)}}function getDisplayedTimeInSeconds(){let e=document.getElementById("time").innerText.match(/^\d+/);let t=document.getElementById("time").innerText.match(/\d+$/);return Number(e)*60+Number(t)}function updateProgressBar(){let e=getProgressPercent(runTime);setProgressBarWidth(e)}function getProgressPercent(e){return e/totalTime*100}function setProgressBarWidth(e){currentProgress.style.width=e+"%"}