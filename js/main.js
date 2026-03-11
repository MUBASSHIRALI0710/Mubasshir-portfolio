// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.nav-menu-mobile');
  const hamburgerIcon = hamburger ? hamburger.querySelector('i') : null;

  console.log('Hamburger:', hamburger); // Debug
  console.log('Mobile Menu:', mobileMenu); // Debug

  // Only run hamburger code if elements exist
  if (hamburger && mobileMenu && hamburgerIcon) {

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      console.log('Overlay created');
    }

    // Toggle menu function
    function toggleMenu() {
      console.log('Toggling menu'); // Debug
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');

      // Toggle icon between bars and times
      if (mobileMenu.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        console.log('Menu opened'); // Debug
      } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Menu closed'); // Debug
      }
    }

    // Hamburger click event
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function () {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Close menu on window resize (if screen becomes larger)
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  } else {
    console.warn('Hamburger menu elements not found. Check your HTML structure.');
  }

  // ===== NAVBAR SCROLL EFFECT =====
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const toggleIcon = themeToggle.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (toggleIcon) {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
      }
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-theme');

      if (toggleIcon) {
        if (document.body.classList.contains('light-theme')) {
          toggleIcon.classList.remove('fa-moon');
          toggleIcon.classList.add('fa-sun');
          localStorage.setItem('theme', 'light');
        } else {
          toggleIcon.classList.remove('fa-sun');
          toggleIcon.classList.add('fa-moon');
          localStorage.setItem('theme', 'dark');
        }
      }
    });
  }

  // ===== ACTIVE LINK HIGHLIGHT =====
  function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu-mobile a');

    navLinks.forEach(link => {
      // Remove active class from all links first
      link.classList.remove('active');

      const linkPage = link.getAttribute('href');

      // Check if this link should be active
      if (linkPage === currentPage ||
        (currentPage === 'index.html' && (linkPage === 'index.html' || linkPage === '#' || linkPage === '#home'))) {
        link.classList.add('active');
      }
    });
  }

  setActiveLink();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});