const clearPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
};

const renderPageTitle = (title) => {
  if (!title) return;
  const main = document.querySelector('main');
  const pageTitle = document.createElement('h4');
  pageTitle.innerText = title;
  main.appendChild(pageTitle);
};

const renderHeaderTitle = (title) => {
  if (!title) return;
  const headerTitle = document.querySelector('title');
  headerTitle.innerText = title;
};

export { clearPage, renderPageTitle, renderHeaderTitle };
