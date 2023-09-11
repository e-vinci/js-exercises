const lightSequence = ['red', 'orange', 'green', 'orange'];
const delaysBetweenLightChanges = 1000;

cycleThroughLamps();

function cycleThroughLamps() {
  renderLightSequence();
  window.setInterval(
    renderLightSequence,
    delaysBetweenLightChanges * lightSequence.length
  );
}

function renderLightSequence() {
  lightSequence.forEach(renderCurrentLightForExpectedDelay);
}

function renderCurrentLightForExpectedDelay(light, index) {
  const currentLight = document.querySelector(`.${light}`);
  showCurrentLightAfterExpectedDelay(light, index * delaysBetweenLightChanges);
  clearCurrentLightAfterExpectedDelay(
    light,
    (index + 1) * delaysBetweenLightChanges
  );
}

function showCurrentLightAfterExpectedDelay(light, delay) {
  window.setTimeout(() => {
    const currentLight = document.querySelector(`.${light}`);
    currentLight.style.backgroundColor = light;
  }, delay);
}

function clearCurrentLightAfterExpectedDelay(light, delay) {
  window.setTimeout(() => {
    const currentLight = document.querySelector(`.${light}`);
    currentLight.style.backgroundColor = '';
  }, delay);
}
