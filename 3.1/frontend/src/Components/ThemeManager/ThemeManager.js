const ThemeManager = () => {
  const themeToggle = document.querySelector('#theme-toggle');
  const body = document.querySelector('body');

  // Check the user's preference from local storage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }

  // Toggle the theme when the button is clicked
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save the user's preference to local storage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
};

export default ThemeManager;
