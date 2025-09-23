import { ROUTES } from './content-routes.js';

const contentContainer = document.getElementById('page');
const breadcrumb = document.getElementById('breadcrumb');

async function loadContent(hash) {
  const route = hash.replace(/^#/, '') || '/';
  const file = ROUTES[route];
  if (!file) {
    contentContainer.innerHTML = '<h1>404 — Content Not Found</h1>';
    breadcrumb.style.display = 'none';
    return;
  }
  try {
    const res = await fetch(file);
    const data = await res.json();
    renderContent(data);
    buildBreadcrumb(route);
  } catch (e) {
    contentContainer.innerHTML = '<h1>Error Loading Content</h1>';
    console.error(e);
  }
}

function renderContent(data) {
  let html = '';
  if (data.title) html += `<h1>${data.title}</h1>`;
  if (data.content) html += data.content;
  contentContainer.innerHTML = html;
}

function buildBreadcrumb(route) {
  const parts = route.split('/').filter(Boolean);
  if (!parts.length) {
    breadcrumb.style.display = 'none';
    return;
  }
  breadcrumb.style.display = 'block';
  let html = `<a href="#/">Home</a>`;
  let path = '';
  parts.forEach(p => {
    path += '/' + p;
    html += ` &raquo; <a href="#${path}">${p.replace(/-/g,' ')}</a>`;
  });
  breadcrumb.innerHTML = html;
}

window.addEventListener('hashchange', () => loadContent(location.hash));
window.addEventListener('load', () => loadContent(location.hash));
