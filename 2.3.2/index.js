const divs = document.querySelectorAll('div');
divs.forEach((div) => {
  div.addEventListener('click', (e) => {
    e.target.innerText = e.target.style.backgroundColor;
    e.target.style.width = "100px";
    e.target.style.height = "100px";
  });
});
