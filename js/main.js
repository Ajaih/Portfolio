'use strict';

/* ── Projektdaten ── */
const projectData = [
  {title:'„Schatten" – Kurzfilm',category:'Kurzfilm',year:'2023',client:'Schulprojekt',tools:'Premiere Pro · After Effects · DaVinci Resolve',desc:'Preisgekrönter Schulkurzfilm über Identität und Selbstfindung. Das Projekt entstand innerhalb von vier Wochen und wurde als bester Film des Jahrgangs ausgezeichnet.',challenge:'Komplexe Lichtstimmungen mit begrenztem Equipment umzusetzen und gleichzeitig eine emotional dichte Geschichte zu erzählen.',result:'Auszeichnung als bester Schulfilm des Jahrgangs. Vor über 200 Personen aufgeführt.'},
  {title:'Produktvideo – Kampagne',category:'Video',year:'2024',client:'Lokale Marke',tools:'Premiere Pro · DaVinci Resolve · Lightroom',desc:'Professionelles Produktionsvideo für eine lokale Marke. Konzept, Dreh, Schnitt und Color Grading eigenständig umgesetzt.',challenge:'Produkteigenschaften visuell ansprechend in 60 Sekunden kommunizieren.',result:'Über 15\'000 organische Aufrufe in den ersten zwei Wochen.'},
  {title:'Portrait-Serie 2024',category:'Fotografie',year:'2024',client:'Persönliches Projekt',tools:'Lightroom · Photoshop · Sony Alpha',desc:'Emotionale Portraitfotografie mit Fokus auf Licht, Ausdruck und Tiefe. Menschen in authentischen Momenten.',challenge:'Echte Emotionen in einem kontrollierten Fotoumfeld einzufangen.',result:'Serie in einer lokalen Ausstellung präsentiert.'},
  {title:'Social-Media Kampagne',category:'Social Media',year:'2024',client:'Praktikumsbetrieb',tools:'Premiere Pro · After Effects · CapCut',desc:'Wöchentlicher Videocontent für Instagram Reels und Stories. Planung, Dreh und Schnitt eigenständig organisiert.',challenge:'Konsistenten Content unter Zeitdruck produzieren.',result:'Follower-Wachstum von 34% in 3 Monaten. Engagement-Rate verdoppelt.'},
  {title:'Event-Dokumentation',category:'Kundenprojekt',year:'2023',client:'Firmenkunde',tools:'Premiere Pro · Lightroom · Canon EOS R',desc:'Vollständige Foto- und Videodokumentation eines Firmenevents mit über 150 Gästen.',challenge:'Gleichzeitig hochwertige Fotos und Videos produzieren und dabei unauffällig bleiben.',result:'Material für LinkedIn, Website und interne Kommunikation. Folgeauftrag bestätigt.'},
  {title:'„Licht & Zeit" – Kurzfilm',category:'Kurzfilm',year:'2024',client:'Eigenproduktion',tools:'DaVinci Resolve · After Effects · Audition',desc:'Experimenteller Kurzfilm über menschliche Wahrnehmung. Langzeitbelichtung, Zeitlupe und abstrakte Überblendungen.',challenge:'Eine rein visuelle Geschichte erzählen, die dennoch emotional berührt.',result:'Einreichung bei zwei Schweizer Kurzfilm-Festivals.'},
];

/* ── Loading Screen ── */
function initLoader(){
  const loader=document.getElementById('loader');
  if(!loader)return;
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      loader.classList.add('hidden');
      document.body.style.overflow='';
      initHeroAnimations();
    },2000);
  });
  document.body.style.overflow='hidden';
  // fallback
  setTimeout(()=>{
    loader.classList.add('hidden');
    document.body.style.overflow='';
    initHeroAnimations();
  },3500);
}

/* ── Custom Cursor ── */
function initCursor(){
  const dot=document.getElementById('cursorDot');
  const ring=document.getElementById('cursorRing');
  if(!dot||!ring)return;
  if(window.matchMedia('(hover:none)').matches)return;

  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });

  // ring follows with slight lag
  function animateRing(){
    rx+=(mx-rx)*0.12;
    ry+=(my-ry)*0.12;
    ring.style.left=rx+'px';
    ring.style.top=ry+'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // hover states
  const hoverTargets='a,button,.masonry-card,.award-card,.about-card,.filter-btn';
  document.addEventListener('mouseover',e=>{
    if(e.target.closest(hoverTargets)){
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout',e=>{
    if(e.target.closest(hoverTargets)){
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    }
  });
  document.addEventListener('mousedown',()=>dot.classList.add('cursor-click'));
  document.addEventListener('mouseup',()=>dot.classList.remove('cursor-click'));
  document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0';});
  document.addEventListener('mouseenter',()=>{dot.style.opacity='1';ring.style.opacity='1';});
}

/* ── Hero Animations ── */
function initHeroAnimations(){
  // trigger hero fade-in elements
  document.querySelectorAll('.hero-anim').forEach(el=>el.classList.add('loaded'));

  // split hero headline into chars
  document.querySelectorAll('.hero-headline .split-line').forEach((line,lineIdx)=>{
    const text=line.textContent;
    line.innerHTML='';
    [...text].forEach((char,i)=>{
      if(char===' '){
        const sp=document.createElement('span');
        sp.className='char-space';
        line.appendChild(sp);
      } else {
        const span=document.createElement('span');
        span.className='char';
        span.textContent=char;
        span.style.transitionDelay=`${0.3+lineIdx*0.12+i*0.04}s`;
        line.appendChild(span);
      }
    });
  });
  // trigger chars
  setTimeout(()=>{
    document.querySelectorAll('.char').forEach(c=>c.classList.add('visible'));
  },400);
}

/* ── Navbar ── */
function initNavbar(){
  const navbar=document.getElementById('navbar');
  const navLinks=document.querySelectorAll('.nav-link');
  const sections=document.querySelectorAll('section[id]');
  function onScroll(){
    navbar.classList.toggle('scrolled',window.scrollY>60);
    let current='';
    sections.forEach(sec=>{if(window.scrollY>=sec.offsetTop-120)current=sec.getAttribute('id');});
    navLinks.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+current);});
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
}

/* ── Hamburger ── */
function initHamburger(){
  const btn=document.getElementById('hamburger');
  const menu=document.getElementById('navMenu');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  });
  menu.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{
    menu.classList.remove('open');btn.classList.remove('open');
    btn.setAttribute('aria-expanded','false');document.body.style.overflow='';
  }));
  document.addEventListener('click',e=>{
    if(!menu.contains(e.target)&&!btn.contains(e.target)&&menu.classList.contains('open')){
      menu.classList.remove('open');btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');document.body.style.overflow='';
    }
  });
}

/* ── Scroll Reveal ── */
function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-up').forEach((el,_,arr)=>{
    const siblings=Array.from(el.parentElement.children).filter(c=>
      c.classList.contains('reveal')||c.classList.contains('reveal-left')||
      c.classList.contains('reveal-right')||c.classList.contains('reveal-up'));
    const idx=siblings.indexOf(el);
    el.style.transitionDelay=`${idx*0.1}s`;
    obs.observe(el);
  });
}

/* ── Skills Bars ── */
function initSkills(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        setTimeout(()=>{entry.target.style.width=entry.target.getAttribute('data-value')+'%';},200);
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.3});
  document.querySelectorAll('.skill-fill').forEach(b=>obs.observe(b));
}

/* ── Project Filter ── */
function initProjectFilter(){
  const buttons=document.querySelectorAll('.filter-btn');
  const cards=document.querySelectorAll('.masonry-card');
  buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const filter=btn.getAttribute('data-filter');
      buttons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      cards.forEach(card=>{
        const show=filter==='all'||card.getAttribute('data-category')===filter;
        card.classList.toggle('hidden',!show);
        if(show)card.style.animation='fadeIn 0.4s ease both';
      });
    });
  });
}

/* ── Modal ── */
function initModal(){
  const backdrop=document.getElementById('modalBackdrop');
  const closeBtn=document.getElementById('modalClose');
  const mediaEl=document.getElementById('modalMedia');
  const metaEl=document.getElementById('modalMeta');
  const titleEl=document.getElementById('modalTitle');
  const descEl=document.getElementById('modalDesc');
  const detailsEl=document.getElementById('modalDetails');

  function openModal(idx){
    const d=projectData[idx];
    if(!d)return;
    mediaEl.innerHTML=`<div class="modal-video-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg><span>Video / Bild einfügen</span></div>`;
    metaEl.innerHTML=`<span class="meta-cat">${d.category}</span><span>${d.year}</span><span>${d.client}</span>`;
    titleEl.textContent=d.title;
    descEl.textContent=d.desc;
    detailsEl.innerHTML=`
      <div class="modal-detail-item"><h4>Tools</h4><p>${d.tools}</p></div>
      <div class="modal-detail-item"><h4>Herausforderung</h4><p>${d.challenge}</p></div>
      <div class="modal-detail-item" style="grid-column:span 2"><h4>Resultat</h4><p>${d.result}</p></div>`;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeBtn.focus();
  }
  function closeModal(){
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  document.querySelectorAll('.project-link').forEach(btn=>{
    btn.addEventListener('click',()=>openModal(parseInt(btn.getAttribute('data-project'),10)));
  });
  document.querySelectorAll('.masonry-thumb').forEach(thumb=>{
    thumb.addEventListener('click',()=>{
      const idx=parseInt(thumb.closest('.masonry-card').getAttribute('data-index'),10);
      openModal(idx);
    });
  });
  closeBtn.addEventListener('click',closeModal);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&backdrop.classList.contains('open'))closeModal();});
}

/* ── Contact Form ── */
function initContactForm(){
  const form=document.getElementById('contactForm');
  const btn=document.getElementById('submitBtn');
  const success=document.getElementById('formSuccess');
  if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.name.value.trim()||!form.email.value.trim()||!form.message.value.trim()){
      [form.name,form.email,form.message].forEach(f=>{
        if(!f.value.trim()){f.style.animation='none';requestAnimationFrame(()=>{f.style.animation='shake 0.4s ease';});}
      });
      return;
    }
    btn.classList.add('loading');btn.disabled=true;
    try {
      const data=new FormData(form);
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data});
      const json=await res.json();
      if(json.success){
        form.style.display='none';
        success.classList.add('visible');
      } else {
        throw new Error(json.message);
      }
    } catch(err) {
      btn.classList.remove('loading');btn.disabled=false;
      alert('Fehler beim Senden. Bitte schreib direkt an ajaih.tharmalingam@gmail.com');
    }
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      const target=document.querySelector(link.getAttribute('href'));
      if(target){e.preventDefault();window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});}
    });
  });
}

/* ── Footer Year ── */
function initFooterYear(){
  const el=document.getElementById('footerYear');
  if(el)el.textContent=new Date().getFullYear();
}

/* ── Inject keyframes ── */
function injectKeyframes(){
  const s=document.createElement('style');
  s.textContent=`
    @keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  `;
  document.head.appendChild(s);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded',()=>{
  injectKeyframes();
  initLoader();
  initCursor();
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
