// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const RECT_NUMBER = 101;
const FPS = 5; // frame per second
let animationReference; // référence vers l'animation
let animate = true;
let size = 5;
let timer;

let myCanvas = document.querySelector("canvas");
let myContext = myCanvas.getContext("2d");
let page = document.querySelector("#page");
// set the canvas dimensions
let pageWidth = page.clientWidth;
let pageHeight = page.clientHeight;
myCanvas.width = pageWidth - 20;
myCanvas.height = pageHeight;
myContext.fillStyle = "blue";

// call the callback to draw our animation when the browser is ready
requestAnimationFrame(drawOneFrame);

function drawOneFrame() {
  // Reset everything done in the previous frame
  // We could force the width or height of canvas to force a redraw myCanvas.width = pageWidth;myCanvas.height = pageHeight;
  // however that would not be optimized.
  myContext.clearRect(0, 0, pageWidth, pageHeight);

  // deal with a minimum size for rectangles
  if (size <= 0) size = 1;

  //draw dynamically the rectangles at random locations
  for (let i = 0; i < RECT_NUMBER; i++) {
    myContext.fillRect(
      Math.floor(Math.random() * pageWidth),
      Math.floor(Math.random() * pageHeight),
      size,
      size
    );
  }
  // Refresh automatically the animation via this recursive call :
  //requestAnimationFrame(drawOneFrame);

  // Slow the animation down via setTimeout.
  animationReference = requestAnimationFrame(
    () => (timer = setTimeout(drawOneFrame, 1000 / FPS))
  );
}

document.addEventListener("keydown", logKey);

// Manage keyboard key events
function logKey(e) {
  switch (e.code) {
    case "NumpadAdd":
      e.preventDefault();
      size += 10;
      break;
    case "NumpadSubtract":
      e.preventDefault();
      size -= 10;
      break;
  }
}

// Manage the right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // stop the right click to "bubble" and therefore stop it to execute the default action (which is to print the contextual menu)
  let red = Math.floor(Math.random() * 256); // [0,255]
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  myContext.fillStyle = "rgba(" + red + "," + green + "," + blue + ",1)";
});

myCanvas.addEventListener("click", () => {
  animate = !animate;
  if (!animate) {
    cancelAnimationFrame(animationReference);
    //stop the timeout so that the final drawOneFrame() is not called
    clearTimeout(timer);
  } else {
    animationReference = requestAnimationFrame(drawOneFrame);
  }
});
