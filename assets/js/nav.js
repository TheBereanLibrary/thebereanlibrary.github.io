// nav.js — handles mobile menu toggle and dropdowns
const menuBtn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('main-menu');

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('open');
});

// Desktop dropdowns
const dropdowns = document.querySelectorAll('.menu-section.dropdown');
dropdowns.forEach(drop => {
  const btn = drop.querySelector('.menu-link');
  btn.addEventListener('click', e => {
    // Only for mobile, ignore desktop hover
    if (window.innerWidth <= 980) {
      drop.classList.toggle('open');
    }
  });
});
