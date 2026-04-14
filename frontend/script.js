/* ============================================================
   KESME SACCO – Shared JavaScript
   ============================================================ */

// ---- Active nav link ----
(function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();
    if (linkFile === page || (page === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ---- Sticky navbar ----
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  if (window.scrollY > 60) navbar.classList.add('scrolled');
}

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- Smooth scroll for in-page anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 85, behavior: 'smooth' });
    }
  });
});

// ---- Scroll-reveal animation ----
const revealEls = document.querySelectorAll(
  '.vm-card, .why-card, .product-card, .service-card, .testimonial-card, .focus-card, ' +
  '.offering-card, .step-card, .value-card, .approach-card, .member-card, ' +
  '.impact-card, .news-card, .benefit-item, .contact-item, .download-card'
);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
  });
}

// ---- Products page tabs ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ---- News page filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const newsCards  = document.querySelectorAll('.news-card');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      newsCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Loan Calculator ----
const calcAmountSlider  = document.getElementById('calcAmount');
const calcTermSlider    = document.getElementById('calcTerm');
const calcRateSlider    = document.getElementById('calcRate');
const calcAmountVal     = document.getElementById('calcAmountVal');
const calcTermVal       = document.getElementById('calcTermVal');
const calcRateVal       = document.getElementById('calcRateVal');
const resultMonthly     = document.getElementById('resultMonthly');
const resultTotal       = document.getElementById('resultTotal');
const resultInterest    = document.getElementById('resultInterest');

function formatKES(n) {
  return 'KES ' + Math.round(n).toLocaleString();
}

function calculateLoan() {
  if (!calcAmountSlider) return;
  const P = parseFloat(calcAmountSlider.value);
  const months = parseInt(calcTermSlider.value);
  const annualRate = parseFloat(calcRateSlider.value);
  const r = annualRate / 100 / 12;

  if (calcAmountVal) calcAmountVal.textContent = formatKES(P);
  if (calcTermVal)   calcTermVal.textContent   = months + ' months';
  if (calcRateVal)   calcRateVal.textContent   = annualRate + '%';

  if (r === 0) {
    const monthly = P / months;
    if (resultMonthly)  resultMonthly.textContent  = formatKES(monthly);
    if (resultTotal)    resultTotal.textContent    = formatKES(P);
    if (resultInterest) resultInterest.textContent = 'KES 0';
    return;
  }

  const emi = P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  const interest = total - P;

  if (resultMonthly)  resultMonthly.textContent  = formatKES(emi);
  if (resultTotal)    resultTotal.textContent    = formatKES(total);
  if (resultInterest) resultInterest.textContent = formatKES(interest);
}

[calcAmountSlider, calcTermSlider, calcRateSlider].forEach(el => {
  if (el) el.addEventListener('input', calculateLoan);
});
calculateLoan();

// ---- Contact form ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      if (formSuccess) { formSuccess.style.display = 'block'; }
      contactForm.reset();
      btn.textContent = orig;
      btn.disabled = false;
      setTimeout(() => { if (formSuccess) formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

// ---- Animate counters (stats bar) ----
function animateCounter(el, target, prefix, suffix) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : Math.round(current * 10) / 10) + suffix;
  }, 20);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const data = el.dataset;
      if (data.count) animateCounter(el, parseFloat(data.count), data.prefix || '', data.suffix || '');
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));
