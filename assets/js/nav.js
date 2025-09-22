const menuItems = document.querySelectorAll('.menu li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all
        menuItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked
        item.classList.add('active');

        // Load corresponding content
        const page = item.getAttribute('data-page');
        loadContent(page);
    });
});
