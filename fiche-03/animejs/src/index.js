// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Custom styles
import "./stylesheets/main.css";
// Import Anime.js
import anime from "animejs/lib/anime.es.js";

const ANIMATION_LIBRARIES = [
  {
    title: "Anime.js",
    url: "https://animejs.com/",
    description: `Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API.
It works with CSS properties, SVG, DOM attributes and JavaScript Objects.`,
  },
  {
    title: "Three.js",
    url: "https://threejs.org/",
    description:
      "Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.",
  },
  {
    title: "Phaser.io",
    url: "https://phaser.io/",
    description:
      "Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. ",
  },
  {
    title: "GSAP",
    url: "https://greensock.com/gsap/",
    description:
      "GSAP is a JavaScript library for building high-performance animations that work in every major browser. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects... anything JavaScript can touch!",
  },
  {
    title: "Mo.js",
    url: "https://mojs.github.io/",
    description:
      "mo · js is a javascript motion graphics library that is a fast, retina ready, modular and open source. In comparison to other libraries, it have a different syntax and code animation structure approach. The declarative API provides you a complete control over the animation, making it customizable with ease.",
  },
  {
    title: "Velocity.js",
    url: "http://velocityjs.org/",
    description: `Velocity is an animation engine with the same API as jQuery's $.animate(). It works with and without jQuery. It's incredibly fast, and it features color animation, transforms, loops, easings, SVG support, and scrolling. It is the best of jQuery and CSS transitions combined.`,
  },
  {
    title: "AniJS",
    url: "https://anijs.github.io/",
    description: "A Library to Raise your Web Design without Coding",
  },
  {
    title: "vivus",
    url: "https://maxwellito.github.io/vivus/",
    description:
      "Vivus is a lightweight JavaScript class (with no dependencies) that allows you to animate SVGs, giving them the appearence of being drawn. There are a variety of different animations available, as well as the option to create a custom script to draw your SVG in whatever way you like.",
  },
  {
    title: "ScrollReveal",
    url: "https://scrollrevealjs.org/",
    description:
      "ScrollReveal is a JavaScript library for easily animating elements as they enter/leave the viewport. It was designed to be robust and flexible, but hopefully you’ll be surprised below at how easy it is to pick up.",
  },
  {
    title: "Typed.js",
    url: "https://mattboldt.com/demos/typed-js/",
    description:
      "Typed.js is a library that types. Enter in any string, and watch it type at the speed you've set, backspace what it's typed, and begin a new sentence for however many strings you've set.",
  },
];

//const root = document.getElementById("root");
//get dimensions of page element
const page = document.querySelector("#page");
let pageWidth = page.clientWidth;
let pageHeight = page.clientHeight;

// create dynamically the HTML for all words in libraries
for (let i = 0; i < ANIMATION_LIBRARIES.length; i++) {
  let word = document.createElement("div");
  word.innerText = ANIMATION_LIBRARIES[i].title;
  // using dataset property to deal with data attributes. Here we "hide" the description to be used later in a modal
  word.dataset.description = ANIMATION_LIBRARIES[i].description;
  // set the class translate so that all word are ready to be translated
  word.className = "word translate d-inline-block";
  page.appendChild(word);
}

// animate all elements that have the "word" class
let animation;
let scaleAnimations = [];
randomTranslations();

function randomTranslations() {
  animation = anime({
    targets: ".translate",
    translateX: {
      value: function (target, index, targetsLength) {
        // get x position
        let currentX = target.getBoundingClientRect().x;
        return anime.random(0, pageWidth - currentX - target.offsetWidth);
      },
      duration: 3000,
    },
    translateY: {
      value: function (target, index, targetsLength) {
        let currentY = target.getBoundingClientRect().y;
        return anime.random(0, pageHeight - currentY - target.offsetHeight);
      },
      duration: 3000,
    },

    easing: "linear",
    //number of iterations or true for indefinitely
    complete: randomTranslations,
  });
}

const allWords = document.querySelectorAll(".word");

// deal when the mouse passing on a word : enlarge the word
allWords.forEach((item) => {
  item.addEventListener("mouseenter", (event) => {
    //enlarge only if the enlarge/mouseentered animation or the clicked animation is not running
    if (event.target.className.search(/mouseentered|clicked/i) < 0) {
      scaleAnimations.push(
        anime({
          //here you specify your targeted element through CSS selector syntax
          targets: event.target,
          //duration in ms to make one iteration
          duration: 1000,
          scale: 3,
          //start automatically the animation
          //autoplay: true,
          //to go from scale x3 back and forth
          direction: "alternate",
          //number of iterations or true for indefinitely
          loop: true,
          easing: "linear",
        })
      );
      //prepare to stop the animation only for the selected element (remove "translate" class)
      event.target.classList.remove("translate"); // = "mouseentered d-inline-block";
      //inform that we have entered the "enlarge" or "mouseentered"
      event.target.classList.add("mouseentered");
    }
  });
});

// deal with click on words
const message = document.getElementById("message");
const myModal = document.getElementById("myModal");
const modalTitle = document.querySelector(".modal-title");

allWords.forEach((item) => {
  item.addEventListener("click", (event) => {
    //stop the main translation animation
    console.log("clicked");
    animation.pause();
    //stop all the enlarge/mouseentered animations
    scaleAnimations.forEach((item) => {
      item.pause();
    });
    //prepare to hide all elements but not the one clicked
    event.target.className = "word clicked";
    //hide all elements that are either under translate or enlarge/mousentered animations
    document.querySelectorAll(".translate,.mouseentered").forEach((item) => {
      //don't remove item from the DOM as the DIV would move from position : item.remove() NOK
      //ditto, don't hide the elements as the final word would move from position : item.className = "d-none"; NOK
      //=> use bootstrap invisible class which does not affect layout
      item.className = "invisible d-inline-block";
    });
    //show the modal with the word clicked as title and its description
    modalTitle.innerText = event.target.innerText;
    message.innerText = event.target.dataset.description;
    // display a modal without using JQuery
    myModal.style.display = "block";
    myModal.classList.add("show");

    anime({
      targets: event.target,
      //duration in ms to make one iteration
      scale: {
        value: 5,
        easing: "linear",
        duration: 2000,
      },
      rotate: {
        value: "360",
        easing: "linear",
        duration: 2000,
      },
      loop: 4,
      direction: "alternate",
    });
  });
});

// deal with closing events on the Modal (to be independant of JQuery)
const modalCloseButtons = document.querySelectorAll(".close");
modalCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    myModal.classList.remove("show");
    myModal.style.display = "none";
  });
});
