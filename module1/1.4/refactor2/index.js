const lightSequence = ['red', 'orange', 'green', 'orange'];
const delaysBetweenLightChanges = 1000;
let currentLightIndex = 0;

cycleThroughLights();

function cycleThroughLights() {
  const currentLightColor = lightSequence[currentLightIndex];
  const currentLight = document.querySelector(`.${currentLightColor}`);
  currentLight.style.backgroundColor = currentLightColor;
  setTimeout(() => {
    currentLight.style.backgroundColor = '';
    currentLightIndex = (currentLightIndex + 1) % lightSequence.length;
    cycleThroughLights();
  }, delaysBetweenLightChanges);
}
