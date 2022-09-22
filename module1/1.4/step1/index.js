const redLamp = document.querySelector('.red');
const orangeLamp = document.querySelector('.orange');
const greenLamp = document.querySelector('.green');

const redColor = 'red';
const orangeColor = 'orange';
const greenColor = 'green';
const noLightColor = '';

const delaysBetweenLightChanges = 1000;

cycleThroughLamps();

function cycleThroughLamps() {
  window.setInterval(
    showFromRedToGreenToRedWithDelays,
    delaysBetweenLightChanges * 4
  );
}

showFromRedToGreenToRedWithDelays();

function showFromRedToGreenToRedWithDelays() {
  showRedLamp();
  showOrangeLampOnlyWithDelay(delaysBetweenLightChanges);
  showGreenLampOnlyWithDelay(2 * delaysBetweenLightChanges);
  showOrangeLampOnlyWithDelay(3 * delaysBetweenLightChanges);
  showRedLampOnlyWithDelay(4 * delaysBetweenLightChanges);
}

function showRedLamp() {
  redLamp.style.backgroundColor = redColor;
}

function clearRedLamp() {
  redLamp.style.backgroundColor = noLightColor;
}

function showRedLampOnlyWithDelay(delay) {
  window.setTimeout(() => {
    clearOrangeLamp();
    clearGreenLamp();
    showRedLamp();
  }, delay);
}

function showOrangeLamp() {
  orangeLamp.style.backgroundColor = orangeColor;
}

function showOrangeLampOnlyWithDelay(delay) {
  window.setTimeout(() => {
    clearRedLamp();
    clearGreenLamp();
    showOrangeLamp();
  }, delay);
}

function clearOrangeLamp() {
  orangeLamp.style.backgroundColor = noLightColor;
}

function showGreenLampOnlyWithDelay(delay) {
  window.setTimeout(() => {
    clearRedLamp();
    clearOrangeLamp();
    showGreenLamp();
  }, delay);
}

function showGreenLamp() {
  greenLamp.style.backgroundColor = greenColor;
}

function clearGreenLamp() {
  greenLamp.style.backgroundColor = noLightColor;
}
