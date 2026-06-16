/* ============================================================
   Portfolio – [Dein Name] – main.js
   ============================================================
   ANPASSEN:
   - projectData: Projektinhalte für das Modal anpassen
   - Kontaktformular: Formspree-/Netlify-URL eintragen (siehe unten)
   ============================================================ */

'use strict';

/* ── Projekt-Daten für das Modal ── */
const projectData = [
  {
    title: '„Schatten" – Kurzfilm',
    category: 'Kurzfilm',
    year: '2023',
    client: 'Schulprojekt',
    tools: 'Premiere Pro · After Effects · DaVinci Resolve',
    desc: 'Preisgekrönter Schulkurzfilm über Identität und Selbstfindung. Das Projekt entstand innerhalb von vier Wochen im Rahmen der Mediamatiker-Ausbildung und wurde als bester Film des Jahrgangs ausgezeichnet.',
    challenge: 'Komplexe Lichtstimmungen mit begrenztem Equipment umzusetzen und gleichzeitig eine emotional dichte Geschichte zu erzählen.',
    result: 'Auszeichnung als bester Schulfilm des Jahrgangs. Vorgeführt am Schulanlass vor über 200 Personen.',
  },
  {
    title: 'Produktvideo – Kampagne',
    category: 'Video',
    year: '2024',
    client: 'Lokale Marke (anonym)',
    tools: 'Premiere Pro · DaVinci Resolve · Lightroom',
    desc: 'Professionelles Produktionsvideo für eine lokale Marke. Konzept, Dreh, Schnitt und Color Grading wurden eigenständig umgesetzt. Das Video wurde für Social Media und die Website der Marke verwendet.',
    challenge: 'Produkteigenschaften visuell ansprechend in 60 Sekunden zu kommunizieren und die Markenwerte authentisch zu transportieren.',
    result: 'Über 15\'000 organische Aufrufe in den ersten zwei Wochen auf Instagram und YouTube.',
  },
  {
    title: 'Portrait-Serie 2024',
    category: 'Fotografie',
    year: '2024',
    client: 'Persönliches Projekt',
    tools: 'Lightroom · Photoshop · Sony Alpha',
    desc: 'Emotionale Portraitfotografie mit Fokus auf Licht, Ausdruck und Tiefe. Die Serie zeigt Menschen in authentischen Momenten und fängt Charakter und Stimmung in natürlichem Licht ein.',
    challenge: 'Echte Emotionen in einem kontrollierten Fotoumfeld einzufangen und technische Perfektion mit natürlicher Atmosphäre zu verbinden.',
    result: 'Serie wurde in einer lokalen Ausstellung präsentiert und erzielte starkes Feedback auf Instagram.',
  },
  {
    title: 'Social-Media-Content Kampagne',
    category: 'Social Media',
    year: '2024',
    client: 'Praktikumsbetrieb',
    tools: 'Premiere Pro · After Effects · CapCut',
    desc: 'Wöchentlicher Videocontent für Instagram Reels und Stories für einen lokalen Kunden. Planung, Dreh und Schnitt wurden in einem festen Rhythmus eigenständig organisiert.',
    challenge: 'Konsistenten und hochwertigen Content unter Zeitdruck zu produzieren und dabei die Markenstimme konsequent umzusetzen.',
    result: 'Follower-Wachstum von 34% in 3 Monaten. Engagement-Rate verdoppelt.',
  },
  {
    title: 'Event-Dokumentation',
    category: 'Kundenprojekt',
    year: '2023',
    client: 'Firmenkunde (anonym)',
    tools: 'Premiere Pro · Lightroom · Canon EOS R',
    desc: 'Vollständige Foto- und Videodokumentation eines Firmenevents mit über 150 Gästen. Vom Aufbau über die Keynote bis zum Networking – jeder Moment wurde festgehalten.',
    challenge: 'In einer dynamischen Umgebung gleichzeitig hochwertige Fotos und Videos zu produzieren und dabei unauffällig zu bleiben.',
    result: 'Kunde nutzte Material für interne Kommunikation, LinkedIn und die Webseite. Folgeauftrag bestätigt.',
  },
  {
    title: '„Licht & Zeit" – Kurzfilm',
    category: 'Kurzfilm',
    year: '2024',
    client: 'Eigenproduktion',
    tools: 'DaVinci Resolve · After Effects · Audition',
    desc: 'Experimenteller Kurzfilm über menschliche Wahrnehmung und den Lauf der Zeit. Einsatz von Langzeitbelichtung, Zeitlupe und abstrakten Überblendungen als visuelle Sprache.',
    challenge: 'Eine rein visuelle, nicht-narrative Geschichte zu erzählen, die dennoch emotional berührt und eine klare Botschaft trägt.',
    result: 'Einreichung bei zwei Schweizer Kurzfilm-Festivals. Positives Feedback von der Jury.',
  },
];

/* ── Hero Animations on load ── */
function initHeroAnimations() {
  const elems = document.querySelectorAll('.hero-anim');
  // small delay to ensure fonts are loaded
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      elems.forEach(el => el.classList.add('loaded'));
    });
  });
}

/* ── Navbar scroll behavior ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Hamburger menu ── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── Scroll-reveal Intersection Observer ── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach((el, i) => {
    // stagger siblings in the same parent
    const siblings = Array.from(el.parentElement.children).filter(c =>
      c.classList.contains('reveal') ||
      c.classList.contains('reveal-left') ||
      c.classList.contains('reveal-right') ||
      c.classList.contains('reveal-up')
    );
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 0.1}s`;
    observer.observe(el);
  });
}

/* ── Skills progress bar animation ── */
function initSkills() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.getAttribute('data-value');
        // small delay for visual effect
        setTimeout(() => {
          bar.style.width = value + '%';
        }, 150);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ── Project filter ── */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ── Project modal ── */
function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const mediaEl = document.getElementById('modalMedia');
  const metaEl = document.getElementById('modalMeta');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const detailsEl = document.getElementById('modalDetails');

  function openModal(idx) {
    const d = projectData[idx];
    if (!d) return;

    // Populate modal
    mediaEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" style="width:100px;height:100px;opacity:0.2;color:var(--text-muted)">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    `;
    metaEl.innerHTML = `
      <span class="meta-cat">${d.category}</span>
      <span>${d.year}</span>
      <span>${d.client}</span>
    `;
    titleEl.textContent = d.title;
    descEl.textContent = d.desc;
    detailsEl.innerHTML = `
      <div class="modal-detail-item">
        <h4>Tools</h4><p>${d.tools}</p>
      </div>
      <div class="modal-detail-item">
        <h4>Herausforderung</h4><p>${d.challenge}</p>
      </div>
      <div class="modal-detail-item" style="grid-column:span 2">
        <h4>Resultat</h4><p>${d.result}</p>
      </div>
    `;

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open on project-link click
  document.querySelectorAll('.project-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-project'), 10);
      openModal(idx);
    });
  });

  // Also open on card thumb click
  document.querySelectorAll('.project-card').forEach(card => {
    card.querySelector('.project-thumb').addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openModal(idx);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });
}

/* ── Contact form ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      // Simple shake animation on invalid fields
      [form.name, form.email, form.message].forEach(field => {
        if (!field.value.trim()) {
          field.style.animation = 'none';
          requestAnimationFrame(() => {
            field.style.animation = 'shake 0.4s ease';
          });
        }
      });
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // ── FORMSPREE INTEGRATION ──────────────────────────────────────
    // Um das Formular mit Formspree zu verwenden:
    // 1. Gehe zu https://formspree.io und erstelle ein kostenloses Konto
    // 2. Erstelle ein neues Formular und kopiere die Formular-ID
    // 3. Ersetze 'YOUR_FORM_ID' unten mit deiner ID, z.B. 'xpzgknab'
    // 4. Entkommentiere den fetch-Block und lösche den setTimeout-Block
    //
    // NETLIFY FORMS:
    // Füge dem <form> Tag hinzu: data-netlify="true" name="contact"
    // Dann kannst du den fetch-Block weglassen – Netlify verarbeitet alles automatisch
    // ──────────────────────────────────────────────────────────────

    /*
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        showSuccess();
      } else {
        throw new Error('Fehler beim Senden');
      }
    } catch (err) {
      console.error(err);
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      alert('Es gab einen Fehler. Bitte sende mir direkt eine E-Mail.');
    }
    */

    // Demo: Simuliert erfolgreiches Senden (entfernen wenn Formspree eingerichtet)
    setTimeout(() => {
      showSuccess();
    }, 1800);

    function showSuccess() {
      form.style.display = 'none';
      successEl.classList.add('visible');
    }
  });
}

/* ── Smooth scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Footer year ── */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── CSS animation keyframe for form shake ── */
function injectShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
}

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  injectShakeKeyframe();
  initHeroAnimations();
  initNavbar();
  initHamburger();
  initReveal();
  initSkills();
  initProjectFilter();
  initModal();
  initContactForm();
  initSmoothScroll();
  initFooterYear();
});
