// Smooth scroll (for older browsers that ignore CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking a link on mobile
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Scroll-based reveal animations
const animatedEls = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute("data-delay") || 0;
        setTimeout(() => {
          el.classList.add("animated");
        }, parseFloat(delay) * 1000);
        observer.unobserve(el);
      }
    });
  },
  {
    threshold: 0.15
  }
);

animatedEls.forEach(el => observer.observe(el));

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
// ===== Auto-rotating "Why this project exists" cards =====
(function () {
  const track = document.getElementById("projectTrack");
  const indicators = document.querySelectorAll("#projectIndicators .indicator");
  if (!track || indicators.length === 0) return;

  const cards = track.querySelectorAll(".project-card");
  const total = cards.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total; // wrap around
    const offset = -current * 100; // 100% width per card
    track.style.transform = `translateX(${offset}%)`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  // auto-advance every 3 seconds
  let timer = setInterval(() => goTo(current + 1), 3000);

  // allow clicking dots to navigate
  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      goTo(i);
      // restart timer after manual click
      timer = setInterval(() => goTo(current + 1), 3000);
    });
  });

  // initial position
  goTo(0);
})();


// curiosity got you here! I am glad
