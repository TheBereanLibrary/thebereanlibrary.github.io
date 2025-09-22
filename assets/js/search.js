// search.js — live search with highlight & keyboard nav
import { CONTENT_FILES } from './content-routes.js';

const searchInput = document.getElementById('site-search');
let allContent = [];

async function loadAllContent(){
  for(const file of CONTENT_FILES){
    const res = await fetch(file);
    const data = await res.json();
    allContent.push({file, title:data.title||'', body:data.body.map(b=>b.text||'').join(' ')});
  }
}
loadAllContent();

function highlightTerm(text, term){
  const re = new RegExp(`(${term})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

let resultsPanel;
searchInput.addEventListener('input', e=>{
  const term = e.target.value.trim();
  if(!term){ removeResults(); return; }
  if(!resultsPanel){
    resultsPanel = document.createElement('div');
    resultsPanel.className='search-results';
    searchInput.parentElement.appendChild(resultsPanel);
  }
  resultsPanel.innerHTML='';
  let matches = 0;
  allContent.forEach(c=>{
    if(c.title.toLowerCase().includes(term.toLowerCase()) || c.body.toLowerCase().includes(term.toLowerCase())){
      matches++;
      const snippet = c.body.substring(0,120) + (c.body.length>120?'…':'');
      const div = document.createElement('div');
      div.className='result';
      div.innerHTML = `<a href="#${Object.keys(ROUTES).find(k=>ROUTES[k]===c.file)}">${highlightTerm(c.title, term)}</a><p>${highlightTerm(snippet, term)}</p>`;
      resultsPanel.appendChild(div);
    }
  });
  if(matches===0) resultsPanel.innerHTML='<p>No results found.</p>';
});

function removeResults(){ if(resultsPanel){ resultsPanel.remove(); resultsPanel=null; } }
document.addEventListener('click', e=>{ if(!searchInput.contains(e.target)) removeResults(); });

