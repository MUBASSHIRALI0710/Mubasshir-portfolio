// js/filter.js - Project Filtering

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get filter value
      const filterValue = button.dataset.filter;

      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          const categories = card.dataset.category;
          if (categories && categories.includes(filterValue)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});