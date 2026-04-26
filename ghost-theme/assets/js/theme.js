/* =============================================================
   SALCIDO — Ghost Theme JavaScript
   ============================================================= */

(function () {
  'use strict';

  // ── READING PROGRESS BAR ──────────────────────────────────
  const progressBar = document.querySelector('.gh-reading-progress-bar');
  if (progressBar) {
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ── TABLE OF CONTENTS ─────────────────────────────────────
  const tocList   = document.querySelector('.gh-toc-list');
  const article   = document.querySelector('.gh-content');

  if (tocList && article) {
    const headings = Array.from(article.querySelectorAll('h2, h3'));

    if (headings.length === 0) {
      const toc = document.querySelector('.gh-toc');
      if (toc) toc.style.display = 'none';
      const layout = document.querySelector('.gh-post-body-layout');
      if (layout) layout.classList.add('gh-post-body-layout--no-toc');
    } else {
      // Build TOC links
      headings.forEach((heading, i) => {
        if (!heading.id) heading.id = 'section-' + i;

        const li = document.createElement('li');
        li.className = 'gh-toc-item' + (heading.tagName === 'H3' ? ' is-h3' : '');
        li.dataset.target = heading.id;

        const a = document.createElement('a');
        a.className  = 'gh-toc-link';
        a.href       = '#' + heading.id;
        a.textContent = heading.textContent.trim();

        a.addEventListener('click', e => {
          e.preventDefault();
          const el = document.getElementById(heading.id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });

        li.appendChild(a);
        tocList.appendChild(li);
      });

      // Active-section highlighting via IntersectionObserver
      const items = Array.from(tocList.querySelectorAll('.gh-toc-item'));
      let activeId = headings[0].id;

      const setActive = id => {
        if (id === activeId) return;
        activeId = id;
        items.forEach(item => item.classList.toggle('is-active', item.dataset.target === id));
      };

      // Mark first item active on load
      if (items[0]) items[0].classList.add('is-active');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

      headings.forEach(h => observer.observe(h));
    }
  }

  // ── SOCIAL SHARE — COPY LINK ───────────────────────────────
  const copyBtn = document.querySelector('[data-copy-link]');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.classList.add('is-copied');
        copyBtn.setAttribute('title', 'Copied!');
        setTimeout(() => {
          copyBtn.classList.remove('is-copied');
          copyBtn.setAttribute('title', 'Copy link');
        }, 2200);
      });
    });
  }

  // ── NEWSLETTER FORM STATE ──────────────────────────────────
  // Ghost's members.js handles actual submission; we manage UI classes
  document.querySelectorAll('[data-members-form="subscribe"]').forEach(form => {
    // Wrap input + button in a fields div so we can hide them on success
    const fields  = form.querySelectorAll('input, button[type="submit"]');
    const wrapper = document.createElement('div');
    wrapper.className = 'gh-newsletter-form-fields';
    fields.forEach(f => wrapper.appendChild(f));
    form.insertBefore(wrapper, form.querySelector('.gh-newsletter-success'));

    form.addEventListener('success', () => form.classList.add('success'));
    form.addEventListener('error',   () => form.classList.add('error'));
  });

  // ── NAV SCROLL SHADOW ─────────────────────────────────────
  const head = document.querySelector('.gh-head');
  if (head) {
    const toggle = () => head.classList.toggle('is-scrolled', window.scrollY > 12);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

})();
