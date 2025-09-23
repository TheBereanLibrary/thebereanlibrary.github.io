// content-loader.js — dynamic JSON content loader

// Map your routes to JSON files
export const ROUTES = {
  '/': 'content/welcome-about.json',
  '/welcome/about': 'content/welcome-about.json',
  '/welcome/new-believers': 'content/welcome-new-believers.json',
  '/welcome/howto': 'content/welcome-howto.json',
  '/welcome/testimony': 'content/welcome-testimony.json',
  '/welcome/evaluating': 'content/welcome-evaluating-christianity.json',
  '/welcome/vs-other': 'content/welcome-vs-other-religions.json',
  '/bible/overview': 'content/bible-overview.json',
  '/bible/books': 'content/bible-books.json',
  '/bible/translations': 'content/bible-translations.json',
  '/bible/timeline': 'content/bible-timeline.json',
  '/bible/reading': 'content/bible-reading.json',
  '/bible/word-studies': 'content/bible-word-studies.json',
  '/bible/versions': 'content/bible-versions.json',
  '/bible/study-websites': 'content/bible-study-websites.json',
  '/doctrine/salvation': 'content/doctrine-salvation.json',
  '/doctrine/heaven-hell': 'content/doctrine-heaven-hell.json',
  '/doctrine/endtimes': 'content/doctrine-endtimes.json',
  '/doctrine/holy-spirit': 'content/doctrine-holy-spirit.json',
  '/doctrine/satan': 'content/doctrine-satan.json',
  '/doctrine/baptism': 'content/doctrine-baptism.json',
  '/doctrine/church': 'content/doctrine-church.json',
  '/doctrine/difficult-questions': 'content/doctrine-difficult-questions.json',
  '/doctrine/discernment': 'content/doctrine-discernment.json',
  '/doctrine/deception': 'content/doctrine-deception.json',
  '/living/walking': 'content/living-walking.json',
  '/living/prayer': 'content/living-prayer.json',
  '/living/marriage-singleness': 'content/living-marriage-singleness.json',
  '/living/lukewarm': 'content/living-lukewarm.json',
  '/living/habits': 'content/living-habits.json',
  '/living/discipleship': 'content/living-discipleship.json',
  '/living/jesus-ministry': 'content/living-jesus-ministry.json',
  '/living/fruits': 'content/living-fruits.json',
  '/living/gifts': 'content/living-gifts.json',
  '/history/timeline': 'content/history-timeline.json',
  '/history/apostles-death': 'content/history-apostles-death.json',
  '/history/faithful-witnesses': 'content/history-faithful-witnesses.json',
  '/history/lessons': 'content/history-lessons.json',
  '/history/denominations': 'content/history-denominations.json',
  '/history/evaluation-checklist': 'content/history-evaluation-checklist.json',
  '/reference/topical-index': 'content/reference-topical-index.json',
  '/reference/research-topics': 'content/reference-research-topics.json',
  '/reference/youtube': 'content/reference-youtube.json',
  '/reference/pastors': 'content/reference-pastors.json',
  '/reference/websites': 'content/reference-websites.json',
  '/reference/infographics': 'content/reference-infographics.json',
  '/reference/study-methods': 'content/reference-study-methods.json',
  '/qna/difficult': 'content/qna-difficult.json',
  '/qna/salvation-prayer': 'content/qna-salvation-prayer.json',
  '/qna/everyday': 'content/qna-everyday.json',
  '/qna/discernment': 'content/qna-discernment.json',
  '/growth/reading-plans': 'content/growth-reading-plans.json',
  '/growth/small-groups': 'content/growth-small-groups.json',
  '/growth/topical-studies': 'content/growth-topical-studies.json',
  '/growth/reflections': 'content/growth-reflections.json'
};

// Main containers
const contentContainer = document.getElementById('page');
const breadcrumb = document.getElementById('breadcrumb');

// Load JSON based on URL hash
export async function loadContent(hash) {
  const route = hash.replace(/^#/, '') || '/';
  const file = ROUTES[route];

  if (!file) {
    contentContainer.innerHTML = '<h1>404 — Content Not Found</h1><p>The page you requested does not exist.</p>';
    breadcrumb.style.display = 'none';
    return;
  }

  try {
    const res = await fetch(file);
    const data = await res.json();
    renderContent(data);
    buildBreadcrumb(route);
  } catch (err) {
    contentContainer.innerHTML = '<h1>Error Loading Content</h1><p>Check console for details.</p>';
    console.error(err);
  }
}

// Render content from JSON
function renderContent(data) {
  let html = '';
  if (data.title) html += `<h1>${data.title}</h1>`;
  if (data.toc) {
    html += '<div class="toc"><ul>';
    data.toc.forEach(item => html += `<li><a href="#${item.href}">${item.label}</a></li>`);
    html += '</ul></div>';
  }
  if (data.content) {
    html += data.content;
  }
  contentContainer.innerHTML = html;
}

// Build breadcrumb
function buildBreadcrumb(route) {
  const parts = route.split('/').filter(Boolean);
  if (parts.length === 0) { breadcrumb.style.display = 'none'; return; }

  breadcrumb.style.display = 'block';
  let html = `<a href="#/">Home</a>`;
  let path = '';
  parts.forEach(p => {
    path += '/' + p;
    html += ` &raquo; <a href="#${path}">${p.replace(/-/g, ' ')}</a>`;
  });
  breadcrumb.innerHTML = html;
}

// Event listeners
window.addEventListener('hashchange', () => loadContent(location.hash));
window.addEventListener('load', () => loadContent(location.hash));
