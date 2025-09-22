// content-loader.js
const ContentLoader = (function() {
  const contentEl = document.getElementById('page');
  const breadcrumbEl = document.getElementById('breadcrumb');

  // map routes to content files
  const ROUTES = {
    // welcome
    '/welcome/about': 'content/welcome-about.json',
    '/welcome/new-believers': 'content/welcome-new-believers.json',
    '/welcome/howto': 'content/welcome-howto.json',
    '/welcome/testimony': 'content/welcome-testimony.json',
    '/welcome/evaluating': 'content/welcome-evaluating-christianity.json',
    '/welcome/vs-other': 'content/welcome-vs-other-religions.json',

    // bible
    '/bible/overview': 'content/bible-overview.json',
    '/bible/books': 'content/bible-books.json',
    '/bible/translations': 'content/bible-translations.json',
    '/bible/timeline': 'content/bible-timeline.json',
    '/bible/reading': 'content/bible-reading.json',
    '/bible/word-studies': 'content/bible-word-studies.json',
    '/bible/versions': 'content/bible-versions.json',
    '/bible/study-websites': 'content/bible-study-websites.json',

    // doctrine
    '/doctrine/salvation': 'content/doctrine-salvation.json',
    '/doctrine/heaven-hell': 'content/doctrine-heaven-hell.json',
    '/doctrine/end-times': 'content/doctrine-endtimes.json',
    '/doctrine/holy-spirit': 'content/doctrine-holy-spirit.json',
    '/doctrine/satan': 'content/doctrine-satan.json',
    '/doctrine/baptism': 'content/doctrine-baptism.json',
    '/doctrine/church': 'content/doctrine-church.json',
    '/doctrine/difficult': 'content/doctrine-difficult-questions.json',
    '/doctrine/discernment': 'content/doctrine-discernment.json',
    '/doctrine/deception': 'content/doctrine-deception.json',

    // living
    '/living/walking': 'content/living-walking.json',
    '/living/prayer': 'content/living-prayer.json',
    '/living/marriage': 'content/living-marriage-singleness.json',
    '/living/lukewarm': 'content/living-lukewarm.json',
    '/living/habits': 'content/living-habits.json',
    '/living/discipleship': 'content/living-discipleship.json',
    '/living/jesus': 'content/living-jesus-ministry.json',
    '/living/fruits': 'content/living-fruits.json',
    '/living/gifts': 'content/living-gifts.json',

    // history
    '/history/timeline': 'content/history-timeline.json',
    '/history/apostles-death': 'content/history-apostles-death.json',
    '/history/faithful': 'content/history-faithful-witnesses.json',
    '/history/lessons': 'content/history-lessons.json',
    '/history/denominations': 'content/history-denominations.json',
    '/history/evaluation-checklist': 'content/history-evaluation-checklist.json',

    // reference
    '/reference/topical': 'content/reference-topical-index.json',
    '/reference/research': 'content/reference-research-topics.json',
    '/reference/youtube': 'content/reference-youtube.json',
    '/reference/pastors': 'content/reference-pastors.json',
    '/reference/websites': 'content/reference-websites.json',
    '/reference/infographics': 'content/reference-infographics.json',
    '/reference/study-methods': 'content/reference-study-methods.json',

    // qna
    '/qna/difficult': 'content/qna-difficult.json',
    '/qna/salvation-prayer': 'content/qna-salvation-prayer.json',
    '/qna/everyday': 'content/qna-everyday.json',
    '/qna/discernment': 'content/qna-discernment.json',

    // growth
    '/growth/reading-plans': 'content/growth-reading-plans.json',
    '/growth/small-groups': 'content/growth-small-groups.json',
    '/growth/topical-studies': 'content/growth-topical-studies.json',
    '/growth/reflections': 'content/growth-reflections.json'
  };

  function setContentFromRoute(route) {
    const path = route || '/';
    if (path === '/' || path === '') {
      // home
      contentEl.innerHTML = `<h1>Welcome to The Berean Library</h1>
        <p>Scripture-centered, non-denominational, evangelical resources for study and discipleship.</p>
        <p>Use the menu above or search to find topics. Add new content by dropping new JSON files into the <code>/content</code> folder and linking them in the nav.</p>`;
      breadcrumbEl.style.display = 'none';
      document.title = 'The Berean Library';
      return;
    }

    const key = path.replace('#','');
    const routeKey = key.startsWith('/') ? key : key;
    const file = ROUTES[routeKey];

    if (!file) {
      contentEl.innerHTML = `<h1>Page not found</h1><p>The page you're looking for doesn't exist yet. Use the menu to open a section.</p>`;
      breadcrumbEl.style.display = 'none';
      document.title = 'Not found — The Berean Library';
      return;
    }

    // fetch JSON file
    fetch(file).then(resp => {
      if (!resp.ok) throw new Error('Content not found');
      return resp.json();
    }).then(json => {
      document.title = `${json.title} — The Berean Library`;
      // build breadcrumb
      breadcrumbEl.style.display = 'block';
      breadcrumbEl.textContent = json.breadcrumb || json.title;
      // set main content (safe HTML presumed)
      contentEl.innerHTML = `<h1>${json.title}</h1>${json.body || '<p>Content placeholder.</p>'}${json.extra || ''}`;
      // focus main for accessibility
      contentEl.focus();
    }).catch(err => {
      contentEl.innerHTML = `<h1>Unable to load content</h1><p>${err.message}</p>`;
      breadcrumbEl.style.display = 'none';
      document.title = 'Error — The Berean Library';
    });
  }

  function handleHashChange() {
    const hash = location.hash.replace('#','') || '/';
    // add leading slash if omitted
    const route = hash.startsWith('/') ? `/${hash.replace(/^\/+/, '')}` : `/${hash}`;
    setContentFromRoute(route);
  }

  window.addEventListener('hashchange', handleHashChange);

  return {
    init: function() {
      handleHashChange();
    },
    load: setContentFromRoute
  };
})();
