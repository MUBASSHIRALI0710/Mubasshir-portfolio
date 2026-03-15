// js/theme.js - Dark/Light Mode Toggle

(function () {
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme on page load
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // Toggle theme function
  function toggleTheme() {
    document.body.classList.toggle('light-theme');

    // Update icon
    if (themeIcon) {
      if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
    }
  }

  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
})();