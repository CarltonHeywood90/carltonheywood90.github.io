// -------------------------------
// script.js
// -------------------------------

// 1️⃣ Load nav dynamically and set fixed nav
fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    navPlaceholder.innerHTML = data;

    // Make nav fixed
    navPlaceholder.style.position = 'fixed';
    navPlaceholder.style.top = '0';
    navPlaceholder.style.left = '0';
    navPlaceholder.style.width = '100%';
    navPlaceholder.style.zIndex = '1000';
    navPlaceholder.style.backgroundColor = '#000';
    navPlaceholder.style.borderBottom = '1px solid #222';
    navPlaceholder.style.boxShadow = '0 2px 6px rgba(0,0,0,0.5)';

    // Dynamically set top spacing for banner and container
    const container = document.querySelector('.container');
    const banner = document.querySelector('.banner');

    const setTopSpacing = () => {
      const navHeight = navPlaceholder.offsetHeight;
      container.style.paddingTop = navHeight + 'px';
      if (banner) banner.style.marginTop = navHeight + 'px';
    };

    setTopSpacing();
    window.addEventListener('resize', setTopSpacing); // adjust on resize
  });

// 2️⃣ Shrink nav on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav-placeholder');
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.style.backgroundColor = '#111';
    nav.style.padding = '0.5rem 1rem';
  } else {
    nav.style.backgroundColor = '#000';
    nav.style.padding = '1rem 1rem';
  }
});

// 3️⃣ Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// 4️⃣ Scroll-to-top button
const topBtn = document.createElement('button');
topBtn.innerText = '↑ Top';
topBtn.id = 'scrollTopBtn';
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
  const scrollThreshold = Math.min(200, document.body.scrollHeight / 10); 
  if (window.scrollY > scrollThreshold) topBtn.style.display = 'block';
  else topBtn.style.display = 'none';
});

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5️⃣ Lazy load images and iframes
const lazyEls = document.querySelectorAll('img[data-src], iframe[data-src]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.src = el.dataset.src;
      observer.unobserve(el);
    }
  });
});
lazyEls.forEach(el => observer.observe(el));

// 6️⃣ Highlight active nav link
const sections = document.querySelectorAll('main h2[id]');
const navLinks = document.querySelectorAll('#nav-placeholder a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 60) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});
