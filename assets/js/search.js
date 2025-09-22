// search.js — client-side search for content JSON
const Search = (function() {
  const searchInput = document.getElementById('site-search');
  const contentFiles = [
    'content/welcome-about.json','content/welcome-new-believers.json','content/welcome-howto.json','content/welcome-testimony.json','content/welcome-evaluating-christianity.json','content/welcome-vs-other-religions.json',
    'content/bible-overview.json','content/bible-books.json','content/bible-translations.json','content/bible-timeline.json','content/bible-reading.json','content/bible-word-studies.json','content/bible-versions.json','content/bible-study-websites.json',
    'content/doctrine-salvation.json','content/doctrine-heaven-hell.json','content/doctrine-endtimes.json','content/doctrine-holy-spirit.json','content/doctrine-satan.json','content/doctrine-baptism.json','content/doctrine-church.json','content/doctrine-difficult-questions.json','content/doctrine-discernment.json','content/doctrine-deception.json',
    'content/living-walking.json','content/living-prayer.json','content/living-marriage-singleness.json','content/living-lukewarm.json','content/living-habits.json','content/living-discipleship.json','content/living-jesus-ministry.json','content/living-fruits.json','content/living-gifts.json',
    'content/history-timeline.json','content/history-apostles-death.json','content/history-faithful-witnesses.json','content/history-lessons.json','content/history-denominations.json','content/history-evaluation-checklist.json',
    'content/reference-topical-index.json','content/reference-research-topics.json','content/reference-youtube.json','content/reference-pastors.json','content/reference-websites.json','content/reference-infographics.json','content/reference-study-methods.json',
    'content/qna-difficult.json','content/qna-salvation-prayer.json','content/qna-everyday.json','content/qna-discernment.json',
    'content/growth-reading-plans.json','content/growth-small-groups.json','content/growth-topical-studies.json','content/growth-reflections.json'
  ];
  let index = [];

  function buildIndex() {
    const fetches = contentFiles.map(f => fetch(f).then(r => r.json()).catch(()=>null));
    return Promise.all(fetches).then(results => {
      index = results.filter(Boolean).map(json => ({
        title: json.title,
        excerpt: (json.excerpt || '').slice(0,200),
        body: (json.body || '').replace(/<[^>]*>/g,'').slice(0,400),
        path: json.path || ''
      }));
      return index;
    });
  }

  function doSearch(q) {
    if (!q || q.trim().length < 1) return [];
    const term = q.trim().toLowerCase();
    const results = index.filter(it => (it.title && it.title.toLowerCase().includes(term)) || (it.body && it.body.toLowerCase().includes(term)));
    return results;
  }

  function showResults(results) {
    let container = document.querySelector('.search-results');
    if (!container) {
      container = document.createElement('div');
      container.className = 'search-results';
      document.querySelector('.menu-right').appendChild(container);
    }
    container.innerHTML = results.length ? results.map(r => `<div class="result"><a href="${r.path || '#/'}">${r.title}</a><p>${r.excerpt || r.body}</p></div>`).join('') : '<div class="result"><p>No results</p></div>';
  }

  return {
    init: function() {
      buildIndex().then(()=> {
        if (searchInput) {
          let timeout = null;
          searchInput.addEventListener('input', (e)=>{
            clearTimeout(timeout);
            const v = e.target.value;
            timeout = setTimeout(()=> {
              const res = doSearch(v);
              showResults(res);
            }, 250);
          });
        }
      });
    }
  };
})();
