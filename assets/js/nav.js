// Simple mobile dropdown toggle (if you expand for mobile later)
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if(menuButton) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});
