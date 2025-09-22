const contentArea = document.getElementById('content-area');

function loadContent(page) {
  fetch(`content/${page}.json`)
    .then(res => res.json())
    .then(data => {
      contentArea.innerHTML = `<h2>${data.title}</h2><p>${data.content}</p>`;
    })
    .catch(err => {
      contentArea.innerHTML = `<h2>Content Not Found</h2><p>This section is not yet available.</p>`;
      console.error(err);
    });
}
