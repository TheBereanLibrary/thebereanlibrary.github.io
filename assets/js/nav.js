// nav.js — handles mobile toggle & dropdowns
const mobileButton = document.getElementById('mobile-menu-button');
const mainMenu = document.getElementById('main-menu');

mobileButton.addEventListener('click', () => {
  const expanded = mobileButton.getAttribute('aria-expanded') === 'true';
  mobileButton.setAttribute('aria-expanded', !expanded);
  mainMenu.style.display = expanded ? 'none' : 'flex';
});

// dropdown toggle on mobile
document.querySelectorAll('.menu-section.dropdown > .menu-link').forEach(btn => {
  btn.addEventListener('click', e => {
    if(window.innerWidth < 980){
      e.preventDefault();
      const parent = btn.parentElement;
      parent.classList.toggle('open');
    }
  });
});

// highlight active menu based on hash
function highlightActiveMenu() {
  const hash = location.hash.replace(/^#/, '') || '/';
  document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
  const link = document.querySelector(`.menu a[href="#${hash}"]`);
  if(link) link.classList.add('active');
}
window.addEventListener('hashchange', highlightActiveMenu);
window.addEventListener('load', highlightActiveMenu);
