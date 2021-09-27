let counter = 0;
let messageDiv = document.querySelector(".message");
let counterSpan = document.querySelector(".counter");

window.addEventListener("click", () => {
  ++counter;
  counterSpan.textContent = counter;
  if (counter === 5) messageDiv.textContent = "Bravo, bel échauffement !";
  else if (counter === 10)
    messageDiv.textContent = "Vous êtes passé maître en l’art du clic ! ";
  else messageDiv.textContent = "";
});
