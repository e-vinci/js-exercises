const clockSpan = document.getElementById("clock");

const getTime = () => {
  const dateTimeNow = new Date();
  const timeNow = dateTimeNow.toLocaleTimeString(); // 13:26:15
  return timeNow;
};

const reRenderClock = () => {
  clockSpan.innerText = getTime();
};

// start the clock when the page is loaded
let timerRef;
timerRef = setInterval(reRenderClock, 1000);

// pause / resume the clock on clicks
clockSpan.addEventListener("click", onClockClicked);

function onClockClicked() {
  if (timerRef) {
    clearInterval(timerRef);
    timerRef = undefined;
  } else {
    timerRef = setInterval(reRenderClock, 1000);
  }
}
