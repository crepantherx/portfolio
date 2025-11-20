// Data
const PROFILE = {
  name: "Sudhir Singh",
  role: "Machine Learning Engineer",
  exp: "5 years",
  email: "hire.sudhir.singh@icloud.com",
  github: "https://github.com/yourhandle",
  kaggle: "https://kaggle.com/yourhandle",
  cv: "#",
  tech: ["Python", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "FastAPI", "Postgres", "Redis"],
  impact: "+18% Conversion Uplift"
};

const PROJECTS = [
  {
    id: "reco-edge",
    title: "Realtime Recommendation",
    short: "Edge CPU Quantized Transformer",
    desc: "Quantized transformer recommender running on CPU at the edge. Focus: low-latency personalized ranking.",
    demo: "https://demo.example.com/reco",
    repo: "https://github.com/yourhandle/reco-edge",
    design: "#",
    metrics: { AUC: 0.84, Latency: "30ms", Size: "38MB" },
    tags: ["Edge AI", "Transformer"],
    readiness: ["Dockerized", "CI/CD", "Prometheus"]
  },
  {
    id: "ner-prod",
    title: "Realtime Anomaly Detection",
    short: "Domain Adapted NLP",
    desc: "Fine-tuned transformer for domain NER with retraining pipeline and MLflow tracking.",
    demo: "#",
    repo: "https://github.com/yourhandle/ner-service",
    design: "#",
    metrics: { F1: 0.91, Latency: "42ms", Size: "220MB" },
    tags: ["NLP", "MLflow"],
    readiness: ["Auto-rollback", "Docker", "MLflow"]
  },
  {
    id: "forecast-api",
    title: "Scheduled Demand Forecast API",
    short: "Time-series Forecasting",
    desc: "Weekly retraining forecasting service with API and monitoring; integrated into inventory pipeline.",
    demo: "https://demo.example.com/forecast",
    repo: "https://github.com/yourhandle/forecast-api",
    design: "#",
    metrics: { MAPE: "6.2%", Retrain: "Weekly" },
    tags: ["Time-series", "Airflow"],
    readiness: ["Scheduled Retrain", "Integration Tests"]
  }
];

const EXPERIENCE = [
  {
    company: "Tech Giant Corp",
    role: "Senior Machine Learning Engineer",
    period: "2022 - Present",
    desc: "Leading the recommendation engine team. Improved model inference latency by 40% and mentored junior engineers."
  },
  {
    company: "High Growth Startup",
    role: "Machine Learning Engineer",
    period: "2020 - 2022",
    desc: "Built the first version of the NLP pipeline for customer support automation. Reduced manual ticket handling by 60%."
  },
  {
    company: "Data Analytics Ltd",
    role: "Data Scientist",
    period: "2018 - 2020",
    desc: "Developed predictive models for churn analysis and customer segmentation. Collaborated with product teams to drive data-driven decisions."
  }
];

// Render Functions
function renderProfile() {
  // document.getElementById('exp-years').textContent = PROFILE.exp; // Removed
  // document.getElementById('impact-stat').textContent = PROFILE.impact; // Removed
  document.getElementById('year').textContent = new Date().getFullYear();

  const techContainer = document.getElementById('tech-list');
  techContainer.innerHTML = PROFILE.tech.map(t => `<span class="tech-tag" style="border:1px solid var(--divider); padding:2px 8px; border-radius:4px; font-size:0.75rem; color:var(--text-tertiary); font-family:var(--font-mono)">${t}</span>`).join(' ');
}

function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  const html = EXPERIENCE.map(exp => `
    <div class="experience-item" onclick="toggleProject(this)">
      <div class="experience-header">
        <div class="exp-main-info">
          <div class="exp-role">${exp.role}</div>
          <div class="exp-company">${exp.company}</div>
        </div>
        <div class="exp-meta">
          <div class="exp-period">${exp.period}</div>
          <div class="project-arrow">↓</div>
        </div>
      </div>
      
      <div class="experience-details" onclick="event.stopPropagation()">
        <p>${exp.desc}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = html;
}

function renderProjects() {
  const container = document.getElementById('project-list');

  const projectsHTML = PROJECTS.map(p => `
    <article class="project-item expanded" onclick="toggleProject(this)">
      <div class="project-header">
        <div>
          <span class="project-title">${p.title}</span>
          <div class="project-summary">${p.short}</div>
        </div>
        <div class="project-arrow">↓</div>
      </div>

      <div class="project-details" onclick="event.stopPropagation()">
        <div class="details-grid">
          <div>
            <h4>Description</h4>
            <p>${p.desc}</p>
            <div style="margin-top:16px">
              ${p.tags.map(t => `<span style="margin-right:8px; font-size:0.8rem; color:var(--text-secondary)">#${t}</span>`).join('')}
            </div>
          </div>

          <div>
            <h4>Key Metrics</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px">
              ${Object.entries(p.metrics).map(([k, v]) => `
                <div class="metric-box">
                  <div class="metric-value">${v}</div>
                  <div class="metric-label">${k}</div>
                </div>
              `).join('')}
            </div>

            <h4>Readiness</h4>
            <ul style="font-size:0.9rem; color:var(--text-secondary); padding-left:20px">
              ${p.readiness.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="project-links">
          ${p.demo && p.demo !== '#' ? `<a href="${p.demo}" target="_blank">Live Demo</a>` : ''}
          <a href="${p.repo}" target="_blank">View Code on GitHub</a>
          <a href="${p.design}" target="_blank">System Design</a>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = projectsHTML;
}

// Interaction Logic
function toggleProject(element) {
  element.classList.toggle('expanded');
}

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle('expanded');
  }
}

// View Toggle Logic
function setupViewToggle() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const views = document.querySelectorAll('.view-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Deactivate all buttons
      buttons.forEach(b => b.classList.remove('active'));
      // 2. Activate clicked button
      btn.classList.add('active');

      const targetViewId = `view-${btn.getAttribute('data-view')}`;

      // 3. Handle Views
      views.forEach(view => {
        if (view.id === targetViewId) {
          view.classList.remove('hidden');
          // Small delay to allow display:block to apply before opacity transition
          setTimeout(() => view.classList.add('active'), 10);
        } else {
          view.classList.remove('active');
          // Wait for fade out transition before hiding
          setTimeout(() => view.classList.add('hidden'), 300);
        }
      });
    });
  });
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderExperience();
  renderProjects();
  setupViewToggle();
});
