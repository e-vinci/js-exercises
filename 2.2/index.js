let counter = 0;
let messageWrapper = document.querySelector('.message');
let counterWrapper = document.querySelector('.counter');

window.addEventListener('click', () => {
  ++counter;
  counterWrapper.textContent = counter;
  if (counter === 5) messageWrapper.textContent = 'Bravo, bel échauffement !';
  else if (counter === 10)
    messageWrapper.textContent = "Vous êtes passé maître en l'art du clic ! ";
});
