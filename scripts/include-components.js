document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const src = el.getAttribute('data-include');
    if (!src) return;
    fetch(src, {cache: 'no-store'})
      .then(resp => {
        if (!resp.ok) throw new Error(`Failed to fetch ${src}`);
        return resp.text();
      })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Strip scripts before insertion — components are markup-only
        doc.querySelectorAll('script').forEach(s => s.remove());
        el.replaceChildren(...doc.body.childNodes);
      })
      .catch(err => {
        console.error(err);
        el.replaceChildren();
      });
  });
});
