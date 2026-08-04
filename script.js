/* -------------------------------------------------------------------------- */
/* Kelvin Odhiambo Portfolio - Interactive Scripts                            */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initProjectFilters();
  initScrollspy();
});

/**
 * Update header styling on window scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
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
 * Filter projects by category tab
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && btn.getAttribute('data-filter') !== cardCategory) {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
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
