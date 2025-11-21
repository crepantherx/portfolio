// Data
const PROFILE = {
  name: "Sudhir Singh",
  role: "Machine Learning Engineer",
  exp: "5 years",
  email: "hire.sudhir.singh@icloud.com",
  github: "https://github.com/yourhandle",
  kaggle: "https://kaggle.com/yourhandle",
  cv: "#",
  techCategories: [
    {
      category: "Languages & Libraries",
      skills: ["Python", "Bash", "Pandas", "NumPy", "PySpark", "SpaCy", "Scikit-learn", "TensorFlow", "PyTorch", "Seaborn", "Matplotlib", "SQL", "Datetime", "Logging", "Async", "Apache Airflow", "Apache Kafka", "Flink", "Apache Spark"]
    },
    {
      category: "Model Serving & Optimization",
      skills: ["ONNX", "TensorRT", "FastAPI", "Kubernetes", "Kubeflow", "MLflow", "Databricks"]
    },
    {
      category: "DevOps & MLOps Tooling",
      skills: ["GitHub Actions", "Jenkins", "Docker", "JFrog", "Terraform", "Datadog", "Prometheus", "Splunk"]
    },
    {
      category: "Machine Learning Algorithms",
      skills: ["Logistic Regression", "Classification", "Clustering", "Decision Trees", "Random Forests", "Gradient Boosting (XGBoost, LightGBM)", "Support Vector Machines", "K-Nearest Neighbors", "Naive Bayes"]
    },
    {
      category: "Deep Learning Architectures",
      skills: ["CNN", "RNN", "LSTM", "Transformers", "BERT", "RoBERTa", "GPT", "LLaMA", "GANs"]
    },
    {
      category: "LLM & Generative AI Frameworks",
      skills: ["LangChain", "HuggingFace", "OpenAI APIs", "Vector Embeddings", "Retrieval-Augmented Generation (RAG)"]
    }
  ]
  ,
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
    demo: "https://demo.example.com/ner",
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
    company: "@ Confidential",
    role: "Senior Machine Learning Engineer",
    period: "2024 - Present <div class=\"live-wrapper\">\n" +
      "                <span class=\"live-indicator\"></span>\n" +
      "              </div> ",
    desc: "Leading the recommendation engine team. Improved model inference latency by 40% and mentored junior engineers."
  },
  {
    company: "@ Tiger Analytics",
    role: "Machine Learning Engineer",
    period: "2023 - 2024",
    desc: "Built the first version of the NLP pipeline for customer support automation. Reduced manual ticket handling by 60%."
  },
  {
    company: "@ Tech Mahindra",
    role: "Machine Learning Engineer",
    period: "2021 - 2023",
    desc: "Developed predictive models for churn analysis and customer segmentation. Collaborated with product teams to drive data-driven decisions."
  }
];

// Render Functions
function renderProfile() {
  // document.getElementById('exp-years').textContent = PROFILE.exp; // Removed
  // document.getElementById('impact-stat').textContent = PROFILE.impact; // Removed
  const yearSpans = document.querySelectorAll('.year-span');
  yearSpans.forEach(span => {
    span.textContent = new Date().getFullYear();
  });

  const techContainer = document.getElementById('tech-list');
  techContainer.innerHTML = PROFILE.techCategories.map((category, index) => `
    <div class="tech-category-item" style="margin-bottom: 16px; border-bottom: 1px solid var(--divider); padding-bottom: 12px;" onclick="toggleTechCategory(this)">
      <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 8px 0;">
        <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em;">${category.category}</h4>
        <div class="tech-arrow" style="font-size: 1rem; color: var(--text-tertiary); transition: transform 0.3s ease, color 0.3s ease;">→</div>
      </div>
      <div class="tech-skills" style="max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease; margin-top: 0;">
        <div style="display: flex; flex-wrap: wrap; gap: 8px; padding-top: 12px;">
          ${category.skills.map(skill => `<span class="tech-tag" style="border:1px solid var(--divider); padding:4px 12px; border-radius:4px; font-size:0.75rem; color:var(--text-tertiary); font-family:var(--font-mono)">${skill}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Toggle function for tech categories
function toggleTechCategory(element) {
  const isExpanded = element.classList.contains('expanded');
  const skillsDiv = element.querySelector('.tech-skills');
  const arrow = element.querySelector('.tech-arrow');
  const heading = element.querySelector('h4');

  if (isExpanded) {
    element.classList.remove('expanded');
    skillsDiv.style.maxHeight = '0';
    skillsDiv.style.opacity = '0';
    skillsDiv.style.marginTop = '0';
    arrow.style.transform = 'rotate(0deg)';
    arrow.style.color = 'var(--text-tertiary)';
    arrow.style.textShadow = 'none';
    heading.style.color = 'var(--text-secondary)';
  } else {
    element.classList.add('expanded');
    skillsDiv.style.maxHeight = '500px';
    skillsDiv.style.opacity = '1';
    skillsDiv.style.marginTop = '12px';
    arrow.style.transform = 'rotate(90deg)';
    arrow.style.color = 'var(--accent)';
    arrow.style.textShadow = '0 0 8px var(--accent), 0 0 12px var(--accent)';
    heading.style.color = 'var(--accent)';
  }
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
          <div class="project-arrow">→</div>
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
    <article class="project-item" onclick="toggleProject(this)">
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
          ${p.demo && p.demo !== '#' ? `
            <div class="live-wrapper">
              <span class="live-indicator"></span>
              <a href="${p.demo}" target="_blank">Live</a>
            </div>
          ` : ''}
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
    price: "₹1000"
  },
  "Research Related Topic": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/research-related-topic-for-scholars?overlayCalendar=true",
    price: "₹1000"
  },
  "ML/DE Technical Design Challenges": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/ml-de-technical-design-challenges-for-professionals?overlayCalendar=true",
    price: "₹1000"
  },
  "Discuss Startup Ideas": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/discuss-startup-ideas?overlayCalendar=true",
    price: "₹1000"
  },
  "Guidance": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/guidence-for-students?overlayCalendar=true",
    price: "₹1000"
  },
  "Building Long Term Connection": {
    qr: "./1000.jpg",
    link: "https://cal.com/sudhir-singh/building-long-terms-connection?overlayCalendar=true",
    price: "₹1000"
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
    priceEl.textContent = `Charges: ${config.price}`;
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



// Click Sound Effect using Web Audio API - Crisp and Tactile
function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create white noise for crisp click
    const bufferSize = audioContext.sampleRate * 0.015; // 15ms
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;

    // Create oscillator for tonal component
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.01);

    // Create filter for shaping
    const filter = audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, audioContext.currentTime);

    // Gain nodes for mixing
    const noiseGain = audioContext.createGain();
    const oscGain = audioContext.createGain();
    const masterGain = audioContext.createGain();

    // Connect noise path
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // Connect oscillator path
    oscillator.connect(oscGain);
    oscGain.connect(masterGain);

    // Output
    masterGain.connect(audioContext.destination);

    // Sharp attack and decay for tactile feel
    const now = audioContext.currentTime;
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    oscGain.gain.setValueAtTime(0.15, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    masterGain.gain.setValueAtTime(0.5, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    // Start and stop
    noise.start(now);
    noise.stop(now + 0.015);
    oscillator.start(now);
    oscillator.stop(now + 0.015);
  } catch (error) {
    // Silently fail if Web Audio API is not supported
    console.log('Click sound not available');
  }
}

// Calculate years rounded to nearest
function calculateYears(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();
  const diffInMs = now - start;
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(diffInYears);
}

// Background Music System
let musicContext = null;
let musicGainNode = null;
let oscillators = [];
let isPlaying = false;

function createAmbientMusic() {
  try {
    if (!musicContext) {
      musicContext = new (window.AudioContext || window.webkitAudioContext)();
      musicGainNode = musicContext.createGain();
      musicGainNode.gain.setValueAtTime(0.15, musicContext.currentTime); // Low volume
      musicGainNode.connect(musicContext.destination);
    }

    // Create multiple oscillators for ambient soundscape
    const frequencies = [174, 261.63, 329.63, 392]; // C major pentatonic-ish ambient tones

    oscillators = frequencies.map((freq, index) => {
      const osc = musicContext.createOscillator();
      const oscGain = musicContext.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle'; // Mix of waveforms
      osc.frequency.setValueAtTime(freq, musicContext.currentTime);

      // Create subtle variation
      const lfo = musicContext.createOscillator();
      const lfoGain = musicContext.createGain();
      lfo.frequency.setValueAtTime(0.1 + index * 0.05, musicContext.currentTime);
      lfoGain.gain.setValueAtTime(0.5, musicContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      oscGain.gain.setValueAtTime(0.1 + index * 0.02, musicContext.currentTime);

      osc.connect(oscGain);
      oscGain.connect(musicGainNode);

      osc.start();
      lfo.start();

      return { osc, oscGain, lfo };
    });

    isPlaying = true;
  } catch (error) {
    console.log('Background music not available');
  }
}

function stopAmbientMusic() {
  if (oscillators.length > 0) {
    oscillators.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        lfo.stop();
      } catch (e) {
        // Already stopped
      }
    });
    oscillators = [];
    isPlaying = false;
  }
}

function toggleMusic(isOn) {
  playClickSound(); // Add click sound for music toggle

  if (isOn && !isPlaying) {
    createAmbientMusic();
  } else if (!isOn && isPlaying) {
    stopAmbientMusic();
  }
}

// Theme Toggle with sound
function toggleTheme(isDark) {
  playClickSound(); // Add click sound for theme toggle

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

  // Add click sound to all interactive elements
  const clickableElements = document.querySelectorAll(
    'button, .toggle-btn, .btn-outline, .btn-primary, .btn-secondary, .collapsible-header, .project-item, .experience-item, .tech-category-item'
  );

  clickableElements.forEach(element => {
    element.addEventListener('click', playClickSound);
  });

  // Dynamic Stats
  const expSpan = document.getElementById('exp-years');
  if (expSpan) {
    expSpan.textContent = calculateYears('2021-01-01');
  }

  const ageSpan = document.getElementById('age-years');
  if (ageSpan) {
    ageSpan.textContent = calculateYears('1998-10-01');
  }

  // Attach click handlers to "Book Session" buttons
  const bookButtons = document.querySelectorAll('.btn-outline');
  bookButtons.forEach(btn => {
    if (btn.textContent.trim() === 'Book Session') {
      const card = btn.closest('.pricing-card');
      const planName = card.querySelector('h3').textContent;
      btn.onclick = () => openBookingModal(planName);
    }
  });

  // Skill Search
  const searchInput = document.getElementById('skill-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterSkills(e.target.value));
  }

  // Initialize background music (start playing by default)
  setTimeout(() => {
    const musicCheckbox = document.getElementById('music-checkbox');
    if (musicCheckbox && musicCheckbox.checked) {
      createAmbientMusic();
    }
  }, 500); // Small delay to ensure audio context works
});

function filterSkills(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  const categories = document.querySelectorAll('.tech-category-item');

  categories.forEach(category => {
    const skills = category.querySelectorAll('.tech-tag');
    let hasMatch = false;

    skills.forEach(skill => {
      const text = skill.textContent.toLowerCase();
      if (term && text.includes(term)) {
        skill.classList.add('highlight');
        hasMatch = true;
      } else {
        skill.classList.remove('highlight');
      }
    });

    // Expand/Collapse logic
    const isExpanded = category.classList.contains('expanded');

    if (term) {
      // If searching, expand if match, collapse if no match
      if (hasMatch) {
        if (!isExpanded) toggleTechCategory(category);
      } else {
        if (isExpanded) toggleTechCategory(category);
      }
    } else {
      // If search cleared, collapse everything (or restore default state)
      if (isExpanded) toggleTechCategory(category);
    }
  });
}
