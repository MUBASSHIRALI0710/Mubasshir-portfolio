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

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // Animate progress bars when in view
      if (entry.target.classList.contains('skill-item')) {
        const progressFill = entry.target.querySelector('.progress-fill');
        const percent = entry.target.dataset.progress;
        if (progressFill && percent) {
          progressFill.style.width = percent + '%';
        }
      }
    }
  });
}, observerOptions);

// Observe all sections and elements you want to animate
document.querySelectorAll('section, .skill-item, .project-card, .achievement-card, .building-card, .blog-card').forEach(el => {
  observer.observe(el);
});

// Initialize progress bars with 0 width then animate
document.querySelectorAll('.skill-item .progress-fill').forEach(fill => {
  fill.style.width = '0';
});

// ===== ACTIVE PAGE HIGHLIGHTING =====
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a, .nav-menu-mobile a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }

    // Special case for index.html
    if (currentPage === 'index.html' && (linkPage === 'index.html' || linkPage === '#')) {
      link.classList.add('active');
    }
  });
});

// Typed.js Effect
if (document.querySelector('.typed-text')) {
  new Typed('.typed-text', {
    strings: [
      'Full Stack Developer',
      'JavaScript Expert',
      'Java Developer',
      'ML Enthusiast',
      'Problem Solver'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

// Resume download counter
window.countDownload = function () {
  let count = localStorage.getItem('resumeDownloads') || 0;
  count = parseInt(count) + 1;
  localStorage.setItem('resumeDownloads', count);
  console.log(`Resume downloaded ${count} times`);
  return true;
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}