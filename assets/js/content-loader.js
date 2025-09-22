const readingArea = document.getElementById('reading-area');

function loadContent(page) {
    fetch(`content/${page}.html`)
        .then(response => {
            if(!response.ok) throw new Error('Content not found');
            return response.text();
        })
        .then(html => {
            readingArea.innerHTML = html;
        })
        .catch(err => {
            readingArea.innerHTML = `<h2>Content Not Found</h2><p>Sorry, we couldn't find the content for this section.</p>`;
            console.error(err);
        });
}
