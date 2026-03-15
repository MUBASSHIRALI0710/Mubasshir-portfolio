// js/contact.js - Form Validation

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    // Remove existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    let isValid = true;

    // Name validation
    if (!name || name.length < 2) {
      showError('name', 'Name must be at least 2 characters');
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Message validation
    if (!message || message.length < 10) {
      showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    // If valid, submit form
    if (isValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Submit the form
      contactForm.submit();
    }
  });

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('error');

    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#ef4444';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '0.3rem';
    error.textContent = message;

    field.parentNode.appendChild(error);
  }
});