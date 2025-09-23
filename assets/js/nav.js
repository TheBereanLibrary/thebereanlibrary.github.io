// nav.js — mobile toggle + dropdown
const menuBtn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('main-menu');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('open');
});

const dropdowns = document.querySelectorAll('.menu-section.dropdown');
dropdowns.forEach(drop => {
  const btn = drop.querySelector('.menu-link');
  btn.addEventListener('click', e => {
    if (window.innerWidth <= 980) drop.classList.toggle('open');
  });
});
