// content-loader.js — loads JSON content dynamically
import { ROUTES } from './content-routes.js';

const contentContainer = document.getElementById('page');
const breadcrumb = document.getElementById('breadcrumb');

async function loadContent(hash) {
  const route = hash.replace(/^#/, '') || '/';
  const file = ROUTES[route];
  if(!file){
    contentContainer.innerHTML = '<h1>404 — Content Not Found</h1><p>The page you requested does not exist.</p>';
    breadcrumb.style.display = 'none';
    return;
  }

  try {
    const res = await fetch(file);
    const data = await res.json();
    renderContent(data);
    buildBreadcrumb(route);
  } catch(e){
    contentContainer.innerHTML = '<h1>Error Loading Content</h1><p>Check console.</p>';
    console.error(e);
  }
}

function renderContent(data){
  let html = '';
  if(data.title) html += `<h1>${data.title}</h1>`;
  if(data.toc){
    html += '<div class="toc"><ul>';
    data.toc.forEach(item => html += `<li><a href="#${item.href}">${item.label}</a></li>`);
    html += '</ul></div>';
  }
  if(data.body){
    data.body.forEach(block => {
      if(block.type==='p') html += `<p>${block.text}</p>`;
      else if(block.type==='blockquote') html += `<blockquote>${block.text}</blockquote>`;
      else if(block.type==='h2') html += `<h2 id="${block.id}">${block.text}</h2>`;
      else if(block.type==='ul') html += `<ul>${block.items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
    });
  }
  contentContainer.innerHTML = html;
}

function buildBreadcrumb(route){
  const parts = route.split('/').filter(Boolean);
  if(parts.length===0){ breadcrumb.style.display='none'; return; }
  breadcrumb.style.display='block';
  let html = `<a href="#/">Home</a>`;
  let path = '';
  parts.forEach(p=>{
    path += '/' + p;
    html += ` &raquo; <a href="#${path}">${p.replace(/-/g,' ')}</a>`;
  });
  breadcrumb.innerHTML = html;
}

window.addEventListener('hashchange', () => loadContent(location.hash));
window.addEventListener('load', () => loadContent(location.hash));
