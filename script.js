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

  const projectsHTML = PROJECTS.map((p, index) => `
    <article class="project-item expanded" onclick="toggleProject(this)">
      <div class="project-header">
        <div>
          <span class="project-title">${p.title}</span>
          <div class="project-summary">${p.short}</div>
        </div>
        <div class="project-arrow">→</div>
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
  const sections = document.querySelectorAll('.view-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      buttons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      // Hide all sections
      sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
      });

      // Show target section
      const viewName = btn.getAttribute('data-view');
      const targetId = `view-${viewName}`;
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
          targetSection.classList.add('active');
        }, 10);
      }
    });
  });
}

// Consultation Configuration
// Consultation Configuration
const CONSULTATION_CONFIG = {
  "Want To Learn Python From Me": {
    qr: "./2000.jpeg",
    link: "https://cal.com/sudhir-singh/want-to-learn-python-from-me-professional-student?overlayCalendar=true",
    price: "₹500"
  },
  "Research Related Topic": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/research-related-topic-for-scholars?overlayCalendar=true",
    price: "₹500"
  },
  "ML/DE Technical Design Challenges": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/ml-de-technical-design-challenges-for-professionals?overlayCalendar=true",
    price: "₹500"
  },
  "Discuss Startup Ideas": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/discuss-startup-ideas?overlayCalendar=true",
    price: "₹500"
  },
  "Guidance": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/guidence-for-students?overlayCalendar=true",
    price: "₹500"
  },
  "Building Long Term Connection": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/building-long-terms-connection?overlayCalendar=true",
    price: "₹500"
  }
};

let currentPlan = '';

function openBookingModal(planName) {
  currentPlan = planName;
  const config = CONSULTATION_CONFIG[planName];

  document.getElementById('modal-plan-name').textContent = `Selected: ${planName}`;

  // Set Price if element exists
  const priceEl = document.getElementById('modal-price');
  if (priceEl && config) {
    priceEl.textContent = `Amount to Pay: ${config.price}`;
  }

  // Set QR Code Image
  const qrImage = document.getElementById('modal-qr-image');
  if (config && config.qr) {
    qrImage.src = config.qr;
    qrImage.alt = `${planName} QR Code`;
  } else {
    qrImage.src = "";
    qrImage.alt = "QR Code not found";
  }

  document.getElementById('booking-modal').classList.add('active');
  document.getElementById('booking-modal').classList.remove('hidden');

  // Reset to Step 1
  document.getElementById('modal-step-1').classList.remove('hidden');
  document.getElementById('modal-step-2').classList.add('hidden');
  document.getElementById('user-email').value = ''; // Clear email
  document.getElementById('txn-id').value = ''; // Clear txn id
  document.getElementById('btn-confirm').disabled = true; // Disable confirm button
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.remove('active');
  setTimeout(() => {
    document.getElementById('booking-modal').classList.add('hidden');
  }, 300);
}

function nextBookingStep() {
  const email = document.getElementById('user-email').value;
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  document.getElementById('modal-step-1').classList.add('hidden');
  document.getElementById('modal-step-2').classList.remove('hidden');
}

function prevBookingStep() {
  document.getElementById('modal-step-2').classList.add('hidden');
  document.getElementById('modal-step-1').classList.remove('hidden');
}

function handleBookingSubmit() {
  const email = document.getElementById('user-email').value;
  const txnId = document.getElementById('txn-id').value;

  if (!txnId) {
    alert('Please enter the UPI Transaction ID to confirm your payment.');
    return;
  }

  const config = CONSULTATION_CONFIG[currentPlan];

  // Redirect to the specific booking link
  if (config && config.link) {
    window.open(config.link, '_blank');
  } else {
    alert('Booking link not found for this plan. Please contact me directly.');
  }

  closeBookingModal();
}

// Transaction ID Validation
document.addEventListener('DOMContentLoaded', () => {
  const txnInput = document.getElementById('txn-id');
  const confirmBtn = document.getElementById('btn-confirm');

  if (txnInput && confirmBtn) {
    txnInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      // Basic validation: Check if length is at least 10 characters (typical UPI IDs are 12)
      if (value.length >= 10) {
        confirmBtn.disabled = false;
      } else {
        confirmBtn.disabled = true;
      }
    });
  }
});

// Theme Toggle
function toggleTheme(isDark) {
  const body = document.body;
  // If isDark is provided, use it. Otherwise toggle.
  if (typeof isDark === 'boolean') {
    body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderExperience();
  renderProjects();
  setupViewToggle();

  // Attach click handlers to "Book Session" buttons
  const bookButtons = document.querySelectorAll('.btn-outline');
  bookButtons.forEach(btn => {
    if (btn.textContent.trim() === 'Book Session') {
      const card = btn.closest('.pricing-card');
      const planName = card.querySelector('h3').textContent;
      btn.onclick = () => openBookingModal(planName);
    }
  });
});
