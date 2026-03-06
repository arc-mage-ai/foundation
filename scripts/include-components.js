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
        el.innerHTML = html;
        // Execute any scripts found in the included fragment
        Array.from(el.querySelectorAll('script')).forEach(oldScript => {
          const script = document.createElement('script');
          if (oldScript.src) {
            script.src = oldScript.src;
            script.async = false;
          } else {
            script.textContent = oldScript.textContent;
          }
          oldScript.parentNode.replaceChild(script, oldScript);
        });
      })
      .catch(err => {
        // Keep a minimal visible error for maintainers
        console.error(err);
        el.innerHTML = '';
      });
  });
});
