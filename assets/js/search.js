// Basic client-side search: searches links in nav menu
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const links = document.querySelectorAll(".nav-menu li a");
        let found = false;

        links.forEach(link => {
            if(link.textContent.toLowerCase().includes(query)) {
                window.location.href = link.href;
                found = true;
            }
        });

        if(!found) {
            alert("No results found in main sections. Try browsing manually.");
        }
    });
});
