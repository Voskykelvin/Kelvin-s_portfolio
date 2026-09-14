/* -------------------------------------------------------------------------- */
/* Kelvin Odhiambo Portfolio - Interactive Scripts                            */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initScrollspy();
  initMobileNav();
});

/**
 * Update header styling on window scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile nav toggle
 */
function initMobileNav() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav-open');
  });

  // Close menu when a nav link is clicked
  const links = nav.querySelectorAll('.nav-links a');
  links.forEach(l => l.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('nav-open')) return;
    if (nav.contains(event.target)) return;
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/**
 * Highlight active navigation item based on current viewport scroll position
 */
function initScrollspy() {
  const sections = document.querySelectorAll('section, div[id="hero"]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
