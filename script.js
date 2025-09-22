// -------------------------------
// script.js (refactored)
// -------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------
  // 1️⃣ Load nav dynamically and make fixed
  // -------------------------------
  const navPlaceholder = document.getElementById('nav-placeholder');
  const container = document.querySelector('.container');
  const banner = document.querySelector('.banner');

  fetch('nav.html')
    .then(response => response.text())
    .then(data => {
      navPlaceholder.innerHTML = data;

      Object.assign(navPlaceholder.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '1000',
        backgroundColor: '#000',
        borderBottom: '1px solid #222',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        padding: '1rem 1rem',
        transition: 'all 0.2s ease'
      });

      // Adjust banner margin to prevent it from being hidden behind nav
      const adjustBannerMargin = () => {
        if (banner) {
          const navHeight = navPlaceholder.offsetHeight;
          banner.style.marginTop = navHeight + 'px';
        }
      };

      // Run once after image load (mobile fix)
      if (banner) {
        const bannerImg = banner.querySelector('img');
        if (bannerImg && !bannerImg.complete) {
          bannerImg.addEventListener('load', adjustBannerMargin);
        }
      }

      // Initial adjustment & on window resize
      adjustBannerMargin();
      window.addEventListener('resize', adjustBannerMargin);
    });

  // -------------------------------
  // 2️⃣ Shrink nav on scroll
  // -------------------------------
  const shrinkNavOnScroll = () => {
    if (!navPlaceholder) return;
    if (window.scrollY > 50) {
      navPlaceholder.style.backgroundColor = '#111';
      navPlaceholder.style.padding = '0.5rem 1rem';
    } else {
      navPlaceholder.style.backgroundColor = '#000';
      navPlaceholder.style.padding = '1rem 1rem';
    }
  };
  window.addEventListener('scroll', shrinkNavOnScroll);

  // -------------------------------
  // 3️⃣ Smooth scrolling for anchor links
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // -------------------------------
  // 4️⃣ Scroll-to-top button
  // -------------------------------
  const topBtn = document.createElement('button');
  topBtn.id = 'scrollTopBtn';
  topBtn.innerText = '↑ Top';
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

  const toggleScrollTopBtn = () => {
    const scrollThreshold = Math.min(200, document.body.scrollHeight / 10);
    topBtn.style.display = window.scrollY > scrollThreshold ? 'block' : 'none';
  };

  window.addEventListener('scroll', toggleScrollTopBtn);
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // -------------------------------
  // 5️⃣ Lazy load images and iframes
  // -------------------------------
  const lazyEls = document.querySelectorAll('img[data-src], iframe[data-src]');
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.src = el.dataset.src;
      lazyObserver.unobserve(el);
    });
  });
  lazyEls.forEach(el => lazyObserver.observe(el));

  // -------------------------------
  // 6️⃣ Highlight active nav link
  // -------------------------------
  const sections = document.querySelectorAll('main h2[id]');
  const navLinks = document.querySelectorAll('#nav-placeholder a[href^="#"]');

  const highlightActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 60) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', highlightActiveLink);

});
