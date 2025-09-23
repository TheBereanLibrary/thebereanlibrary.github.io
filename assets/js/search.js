// search.js — site-wide search for JSON content

import { ROUTES, loadContent } from './content-loader.js';

const searchInput = document.getElementById('site-search');
const resultsContainer = document.createElement('div');
resultsContainer.className = 'search-results';
resultsContainer.style.display = 'none';
searchInput.parentNode.appendChild(resultsContainer);

let allContent = [];

// Load all JSON content for search
async function loadAllContent() {
  const promises = Object.entries(ROUTES).map(async ([route, file]) => {
    try {
      const res = await fetch(file);
      const data = await res.json();
      if (data.content) {
        allContent.push({ route, title: data.title || '', content: data.content.replace(/<[^>]+>/g, '') });
      }
    } catch (err) {
      console.error('Error loading search content:', file, err);
    }
  });
  await Promise.all(promises);
}

// Filter search results
function search(query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return allContent
    .filter(item => item.title.toLowerCase().includes(lowerQuery) || item.content.toLowerCase().includes(lowerQuery))
    .slice(0, 10); // max 10 results
}

// Render search results
function renderResults(results) {
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p style="padding:0.5rem;color:#666;">No results found</p>';
    resultsContainer.style.display = 'block';
    return;
  }

  resultsContainer.innerHTML = results.map(r => `
    <div class="result">
      <a href="#${r.route}">${r.title}</a>
      <p>${r.content.substring(0, 120)}${r.content.length > 120 ? '...' : ''}</p>
    </div>
  `).join('');
  resultsContainer.style.display = 'block';
}

// Handle input
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (!query) {
    resultsContainer.style.display = 'none';
    return;
  }
  const results = search(query);
  renderResults(results);
});

// Click on result
resultsContainer.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (a) {
    loadContent(a.getAttribute('href')).then(() => {
      resultsContainer.style.display = 'none';
      searchInput.value = '';
    });
  }
});

// Close results when clicking outside
document.addEventListener('click', e => {
  if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
    resultsContainer.style.display = 'none';
  }
});

// Initialize
loadAllContent();
