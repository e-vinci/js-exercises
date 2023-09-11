const maxTime = 5; // in s
const expectedClicks = 10;
let startTime;
let currentClicks = 0;
let timerReference;

const button = document.querySelector('button');
const message = document.querySelector('#message');

button.addEventListener('mouseenter', startCounter);
button.addEventListener('click', clickHandler);

function startCounter() {
  startTime = new Date();
  timerReference = setTimeout(printLoss, maxTime * 1000);
}

function clickHandler() {
  ++currentClicks;
  if (currentClicks === expectedClicks) {
    clearTimeout(timerReference);
    win();
  }
}

function printLoss() {
  const timeSpent = new Date().getTime() - startTime.getTime();
  button.style.display = 'none';
  message.innerHTML = `Game over, you did not click ${expectedClicks} times within ${maxTime}s!
    You clicked ${currentClicks} times`;
}

function win() {
  const timeSpent = new Date().getTime() - startTime.getTime();
  button.style.display = 'none';
  message.innerHTML = `You win ! you clicked ${expectedClicks} times within ${timeSpent}s!`;
}
