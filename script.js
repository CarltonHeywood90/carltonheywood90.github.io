// -------------------------------
// script.js (refactored, lazy-loading removed)
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {

  const navPlaceholder = document.getElementById('nav-placeholder');
  const banner = document.querySelector('.banner');

  // Utility: run fn after images in element load
  const onImageLoad = (el, fn) => {
    if (!el) return;
    if (el.complete) fn();
    else el.addEventListener('load', fn, { once: true });
  };

  // -------------------------------
  // 1️⃣ Load nav dynamically and style it fixed
  // -------------------------------
  fetch('nav.html')
    .then(res => res.text())
    .then(html => {
      navPlaceholder.innerHTML = html;

      Object.assign(navPlaceholder.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '1000',
        backgroundColor: '#000',
        borderBottom: '1px solid #222',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        padding: '1rem',
        transition: 'all 0.2s ease'
      });

      // Adjust banner offset under nav
      const adjustBannerOffset = () => {
        if (!banner) return;
        banner.style.marginTop = navPlaceholder.offsetHeight + 'px';
      };

      // Initial + responsive adjustment
      adjustBannerOffset();
      window.addEventListener('resize', adjustBannerOffset);

      // Run again after banner image fully loads
      const bannerImg = banner?.querySelector('img');
      if (bannerImg) onImageLoad(bannerImg, adjustBannerOffset);

      // 2️⃣ Shrink nav on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navPlaceholder.style.backgroundColor = '#111';
          navPlaceholder.style.padding = '0.5rem 1rem';
        } else {
          navPlaceholder.style.backgroundColor = '#000';
          navPlaceholder.style.padding = '1rem';
        }
      });
    });

  // -------------------------------
  // 3️⃣ Smooth scrolling for anchors
  // -------------------------------
  document.body.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });

  // -------------------------------
  // 4️⃣ Scroll-to-top button
  // -------------------------------
  const topBtn = Object.assign(document.createElement('button'), {
    id: 'scrollTopBtn',
    innerText: '↑ Top'
  });
  Object.assign(topBtn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'none',
    padding: '0.5rem 1rem',
    background: '#4169E1',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: '1001'
  });
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    const threshold = Math.min(200, document.body.scrollHeight / 10);
    topBtn.style.display = window.scrollY > threshold ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // -------------------------------
  // 5️⃣ Highlight active nav link
  // -------------------------------
  const sections = document.querySelectorAll('main h2[id]');
  const highlightActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 60) current = section.id;
    });
    navPlaceholder.querySelectorAll('a[href^="#"]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', highlightActiveLink);

});
