/* =============================================
   LLOYD ACHA PORTFOLIO — SCRIPT
   ============================================= */

// ─── NAV TOGGLE ───────────────────────────────
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// ─── FOOTER YEAR ──────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ─── YEARS OF EXPERIENCE ──────────────────────
document.getElementById('years-exp').textContent = new Date().getFullYear() - 2020;

// ─── HERO TYPEWRITER ──────────────────────────
const titles = [
  "ModelOps Engineer",
  "MLOps Engineer",
  "Mechanical Engineer",
  "Robotics Engineer",
  "AI Software Engineer",
  "Machine Learning Engineer",
  "Computer Vision Specialist",
];
let titleIdx = 0, charIdx = 0, deleting = false;
const titleEl = document.getElementById('hero-title-type');
const cursor = document.createElement('span');
cursor.className = 'cursor-blink';
titleEl.appendChild(cursor);

function typeTitle() {
  const current = titles[titleIdx];

  let text = !deleting
    ? current.substring(0, charIdx + 1)
    : current.substring(0, charIdx - 1);

  // ✅ Keep cursor inside
  titleEl.innerHTML = text + '<span class="cursor-blink"></span>';

  if (!deleting) {
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      return setTimeout(typeTitle, 2000);
    }
  } else {
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
    }
  }

  setTimeout(typeTitle, deleting ? 40 : 75);
}
setTimeout(typeTitle, 600);

// ─── INTERSECTION OBSERVER (scroll reveal) ────
function revealEl(el) {
  el.classList.add('visible');
  if (el.classList.contains('skill-item')) {
    const fill = el.querySelector('.skill-bar-fill');
    if (fill) {
      const pct = fill.dataset.pct;
      setTimeout(() => { fill.style.width = pct + '%'; }, 150);
    }
  }
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      revealEl(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

// ─── TAB SWITCHING ────────────────────────────
function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ─── DATA LOADING ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Observe static reveal elements
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  fetch('cv_data.json')
    .then(r => r.json())
    .then(data => {
      buildJobs(data.jobs);
      buildProjects(data.projects);
      buildSkills(data.skills);

      // After DOM updates, observe new elements
      requestAnimationFrame(() => {
        document.querySelectorAll('.job-item, .project-item, .skill-item').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Already in viewport — reveal immediately
            revealEl(el);
          } else {
            io.observe(el);
          }
        });
      });
    })
    .catch(err => console.error('Error loading cv_data.json:', err));
});

// ─── BUILD JOBS ───────────────────────────────
function buildJobs(jobs) {
  const container = document.getElementById('jobs-container');
  jobs.forEach((job, i) => {
    const el = document.createElement('div');
    el.className = 'job-item';
    el.style.transitionDelay = `${i * 0.1}s`;

    const typeBadges = [job.type, job.remote ? 'Remote' : 'On-site']
      .map(t => `<span class="job-type-badge">${t}</span>`).join('');

    const deets = job.desc.map(d => `<li>${d.trim()}</li>`).join('');

    el.innerHTML = `
      <div class="job-tenure-badge">${job.tenure.replace(' - ', '<br>–<br>')}</div>
      <div class="job-content">
        <div class="job-header">
              <div class="job-logo-col">
        <img class="job-logo-img" src="${job.logo}" alt="${job.company}" referrerpolicy="no-referrer" />
      </div>
          <div class="job-header-left">
            <div class="job-position">${job.position}</div>
            <div class="job-meta">
              <span class="job-company">${job.company}</span>
              ${typeBadges}
            </div>
          </div>

        </div>
        <ul class="job-deets">${deets}</ul>
      </div>
    `;
    container.appendChild(el);
  });
}

// ─── BUILD PROJECTS ───────────────────────────
function buildProjects(projects) {
  const grid = document.getElementById('projects-grid');
  projects.forEach((proj, i) => {
    const el = document.createElement('div');
    el.className = 'project-item';
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    el.onclick = () => window.open(proj.link, '_blank');

    el.innerHTML = `
      <div class="project-thumb-wrap">
        <img class="project-thumb" src="${proj.background}" alt="${proj.title}" referrerpolicy="no-referrer" loading="lazy" />
      </div>
      <div class="project-body">
        <div class="project-title">${proj.title}</div>
        <div class="project-desc">${proj.desc}</div>
        <div class="project-link-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          View Project
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ─── BUILD SKILLS ─────────────────────────────
function buildSkills(skills) {
  const grid = document.getElementById('skills-grid');
  skills.forEach((skill, i) => {
    const el = document.createElement('div');
    el.className = 'skill-item';
    el.style.transitionDelay = `${(i % 6) * 0.06}s`;

    el.innerHTML = `
      <div class="skill-item-logo">
        <img src="${skill.logo}" alt="${skill.name}" referrerpolicy="no-referrer" loading="lazy" />
      </div>
      <div class="skill-item-contents">
        <div class="skill-name-row">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-pct">${skill.proficiency}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-pct="${skill.proficiency}"></div>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}
