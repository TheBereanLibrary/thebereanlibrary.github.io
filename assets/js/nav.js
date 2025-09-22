const navLinks = document.querySelectorAll('.sidebar nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    loadContent(page);
  });
});
