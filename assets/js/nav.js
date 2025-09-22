// nav.js — navigation behavior for The Berean Library
(function() {
  const mobileButton = document.getElementById('mobile-menu-button');
  const mainMenu = document.getElementById('main-menu');

  function toggleMenu() {
    const expanded = mobileButton.getAttribute('aria-expanded') === 'true';
    mobileButton.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mainMenu.style.display = 'flex';
    } else {
      mainMenu.style.display = '';
    }
  }

  if (mobileButton) {
    mobileButton.addEventListener('click', toggleMenu);
  }

  // Make dropdowns expandable on mobile: add toggle on first button
  document.querySelectorAll('.menu-section > .menu-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.menu-section.open').forEach(s => s.classList.remove('open'));
      if (!isOpen) parent.classList.add('open');
      else parent.classList.remove('open');
      e.preventDefault();
    });
  });

  // Close mobile menu if click outside
  document.addEventListener('click', (e) => {
    if (!mainMenu) return;
    if (!mainMenu.contains(e.target) && e.target !== mobileButton) {
      mainMenu.style.display = '';
      if (mobileButton) mobileButton.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.menu-section.open').forEach(s => s.classList.remove('open'));
    }
  });

  // Accessible keyboard support for menu links
  document.querySelectorAll('.menu a').forEach(a => {
    a.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.location = a.getAttribute('href');
    });
  });

})();
