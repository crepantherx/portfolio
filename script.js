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
    title: "Realtime Interaction-Driven Recommendations",
    short: "Like Instagram, but not Batch prediction",
    desc: "Quantized transformer recommender running on CPU at the edge. Focus: low-latency personalized ranking.",
    demo: "https://sudhir-singh-realtime-interaction-driven-recommendation.streamlit.app/",
    repo: "https://github.com/crepantherx/Realtime-Interaction-Driven-Recommendations",
    design: "https://app.eraser.io/workspace/iWYxDRWsVmEHYw42b8K4?origin=share",
    metrics: { AUC: 0.84, Latency: "300-800ms", Hosted: "Vercel" },
    tags: ["Realtime", "Interactions"],
    techStack: ["Python", "PyTorch", "Transformers", "FastAPI", "Docker", "Redis", "Streamlit", "Bash"]
  },
  {
    id: "ner-prod",
    title: "Realtime Anomaly Detection",
    short: "Unbalanced Dataset",
    desc: "Fine-tuned transformer for domain NER with retraining pipeline and MLflow tracking.",
    demo: "https://project-anomaly.sudhir-singh.com/",
    repo: "https://github.com/crepantherx/anamoly",
    design: "#",
    metrics: { F1: 0.91, Latency: "42ms", Size: "220MB" },
    tags: ["NLP", "MLflow"],
    techStack: ["Python", "HuggingFace", "BERT", "MLflow", "Docker", "Flask", "PostgreSQL"]
  },
  {
    id: "forecast-api",
    title: "Scheduled Demand Forecast API",
    short: "Time-series Forecasting",
    desc: "Weekly retraining forecasting service with API and monitoring; integrated into inventory pipeline.",
    demo: "https://project-forecasting.sudhir-singh.com",
    repo: "https://github.com/yourhandle/forecast-api",
    design: "#",
    metrics: { MAPE: "6.2%", Retrain: "Weekly" },
    tags: ["Time-series", "Airflow"],
    techStack: ["Python", "Scikit-learn", "Apache Airflow", "Pandas", "FastAPI", "Docker"]
  },
  {
    id: "deep-statistics",
    title: "Deep Statistics",
    short: "Zero shot classification",
    desc: "Passion weekend experiment project started by me & Utkarsh, that might become something meaningful long-term",
    demo: "https://deepstatistics.co.in",
    repo: "#",
    design: "#",
    metrics: { Uptime: "10.9%" },
    tags: ["Full Stack ML", "Scalability", "Statistics", "Zero-shot Classification", "Fast API", "RAG"],
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Nginx"]
  }
];

const EXPERIENCE = [
  {
    company: "@ Confidential",
    role: "Senior Machine Learning Engineer",
    period: "2024 - Present <div class=\"live-wrapper\">\n" +
      "                <span class=\"live-indicator\"></span>\n" +
      "              </div> ",
    desc: "Building engine for a SAAS platform that helps businesses compare their own catalog products against entire market data, identifying which market products are most similar to theirs."
  },
  {
    company: "@ Tiger Analytics",
    role: "Machine Learning Engineer",
    period: "2023 - 2024",
    desc: "Built real-time user profiles from interaction patterns for personalized recommendations, and modeled trust by flagging fake profiles."
  },
  {
    company: "@ Tech Mahindra",
    role: "Machine Learning Engineer",
    period: "2021 - 2023",
    desc: "Build engine for a platform that automates claim review & risk analysis by combining image classification, document NLP, & financial forecasting."
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
    <div class="tech-category-item" id="cat-${index}" style="margin-bottom: 16px; border-bottom: 1px solid var(--divider); padding-bottom: 12px;" onclick="toggleTechCategory(this)">
      <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 8px 0;">
        <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em;">${category.category}</h4>
        <div class="tech-arrow" style="font-size: 1rem; color: var(--text-tertiary); transition: transform 0.3s ease, color 0.3s ease;">→</div>
      </div>
      <div class="tech-skills" style="max-height: 0; overflow: hidden; opacity: 0; padding: 0; transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease, padding 0.3s ease; margin-top: 0;">
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${category.skills.map(skill => `<span class="tech-tag" onclick="handleSkillClick('${skill}', ${index}, event)">${skill}</span>`).join('')}
        </div>
        <div class="category-projects" id="cat-projects-${index}" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;"></div>
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
    skillsDiv.style.padding = '0';
    arrow.style.transform = 'rotate(0deg)';
    arrow.style.color = 'var(--text-tertiary)';
    arrow.style.textShadow = 'none';
    heading.style.color = 'var(--text-secondary)';
  } else {
    element.classList.add('expanded');
    skillsDiv.style.maxHeight = '2000px';
    skillsDiv.style.opacity = '1';
    skillsDiv.style.marginTop = '12px';
    skillsDiv.style.padding = '12px';
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
    <article class="project-item" id="${p.id}" onclick="toggleProject(this)">
      <div class="project-header">
        <div>
          <span class="project-title">${p.title} <span class="live-text">LIVE</span></span>
          <div class="project-summary">${p.short}</div>
        </div>
        <div class="project-arrow">→</div>
      </div>

      <div class="project-details" onclick="event.stopPropagation()">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:24px">
          <div>
            <h4>Description</h4>
            <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin-bottom:16px">${p.desc}</p>
            
            <div style="font-size:0.85rem; color:var(--text-tertiary); margin-bottom:16px">
              ${p.tags.map(t => `#${t}`).join(' ')}
            </div>

            <h4>Tech Stack</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; justify-content: flex-start;">
              ${p.techStack ? p.techStack.map(tech => `
                <span style="
                  display: inline-block;
                  font-size: 0.8rem;
                  color: var(--text-secondary);
                  border: 1px solid var(--divider);
                  padding: 4px 10px;
                  border-radius: 4px;
                  background: rgba(255, 255, 255, 0.03);
                ">${tech}</span>
              `).join('') : ''}
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
          </div>
        </div>

        <div class="project-links">
          ${p.demo && p.demo !== '#' ? `
            <a href="${p.demo}" target="_blank">
              Live<span class="live-dot"></span>
            </a>
          ` : ''}
<!--          <a href="${p.repo}" target="_blank">Request To See Code</a>-->
          <a href="mailto:hire.sudhir.singh@icloud.com">Request To See Code</a>
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

function handleSkillClick(skillName, catIndex, event) {
  event.stopPropagation(); // Prevent bubbling to category toggle

  const target = event.target;
  target.classList.toggle('selected');

  // Find all selected skills in this category
  const categoryContainer = document.getElementById(`cat-${catIndex}`);
  const selectedSkills = Array.from(categoryContainer.querySelectorAll('.tech-tag.selected'))
    .map(el => el.textContent.trim().toLowerCase());

  const projectsContainer = document.getElementById(`cat-projects-${catIndex}`);

  if (selectedSkills.length === 0) {
    projectsContainer.innerHTML = '';
    return;
  }

  // Find matching projects
  const matchingProjects = PROJECTS.filter(p => {
    if (!p.techStack) return false;
    // Check if project has ALL of the selected skills (AND logic)
    const hasAll = selectedSkills.every(selectedSkill =>
      p.techStack.some(projectTech => projectTech.toLowerCase() === selectedSkill)
    );
    return hasAll;
  });

  // Render links
  if (matchingProjects.length > 0) {
    projectsContainer.innerHTML = `
      <div style="width: 100%; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px;">Used in:</div>
      ${matchingProjects.map(p => `
        <span class="project-link-tag" onclick="goToProject('${p.id}', event)">
          ${p.title} ↗
        </span>
      `).join('')}
    `;
  } else {
    projectsContainer.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-tertiary);">Intentionally, common skills are not attached with multiple projects to avoid repetition.</div>`;
  }
}

function goToProject(projectId, event) {
  event.stopPropagation();

  // 1. Switch to Work view if not active
  const workBtn = document.querySelector('.toggle-btn[data-view="work"]');
  if (workBtn && !workBtn.classList.contains('active')) {
    workBtn.click();
  }

  // 2. Expand Projects Section
  const projectsSection = document.getElementById('section-projects');
  if (projectsSection && !projectsSection.classList.contains('expanded')) {
    projectsSection.classList.add('expanded');
  }

  // 3. Find and Expand Project
  const projectEl = document.getElementById(projectId);
  if (projectEl) {
    if (!projectEl.classList.contains('expanded')) {
      projectEl.classList.add('expanded');
    }

    // Smooth scroll
    setTimeout(() => {
      projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Highlight effect
      projectEl.style.transition = 'box-shadow 0.5s ease';
      projectEl.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(() => {
        projectEl.style.boxShadow = '';
      }, 2000);
    }, 300);
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
    console.warn('Please enter a valid email address.');
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
    console.warn('Please enter the UPI Transaction ID to confirm your payment.');
    return;
  }

  const config = CONSULTATION_CONFIG[currentPlan];

  // Redirect to the specific booking link
  if (config && config.link) {
    window.open(config.link, '_blank');
  } else {
    console.warn('Booking link not found for this plan. Please contact me directly.');
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

// Background Music System – Random Radio Streams
let musicAudio = null;
let isPlaying = false;
const RADIO_STREAMS = [
  // English-language music streams (CORS enabled)
  "https://stream.radioparadise.com/mp3-128", // Radio Paradise – English songs mix
  "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one", // BBC Radio 1 – English pop/rock
  "https://icecast.omroep.nl/radio2-bb-mp3" // Retained classical as fallback (instrumental)
];

function startRandomMusic() {
  try {
    // Ensure any existing music is stopped before starting a new one
    if (musicAudio) {
      musicAudio.pause();
      musicAudio = null;
      isPlaying = false;
    }
    // Filter out any streams that may trigger authentication popups
    const safeStreams = RADIO_STREAMS.filter(url => !url.includes('radioking.com'));
    const pool = safeStreams.length > 0 ? safeStreams : RADIO_STREAMS;
    // Choose a random instrumental radio stream each time music is turned on
    const trackUrl = pool[Math.floor(Math.random() * pool.length)];
    musicAudio = new Audio(trackUrl);
    musicAudio.loop = true;
    musicAudio.volume = 0.2; // low background volume
    musicAudio.play();
    // Add error handling to switch streams on failure
    musicAudio.addEventListener('error', () => {
      console.log('Music stream error, switching to another stream');
      startRandomMusic();
    });
    musicAudio.addEventListener('ended', () => {
      // Restart playback when stream ends
      startRandomMusic();
    });
    isPlaying = true;
  } catch (e) {
    console.log('Background music could not be started', e);
  }
}

function stopMusic() {
  if (musicAudio) {
    musicAudio.pause();
    musicAudio = null;
    isPlaying = false;
  }
}

function toggleMusic(isOn) {
  playClickSound(); // click feedback for toggle
  if (isOn && !isPlaying) {
    startRandomMusic();
  } else if (!isOn && isPlaying) {
    stopMusic();
  }
}

// Theme Toggle with sound (unchanged)
function toggleTheme(isDark) {
  playClickSound();
  const body = document.body;
  if (typeof isDark === "boolean") {
    body.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", next);
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
      startRandomMusic();
    }
  }, 500); // Small delay to ensure audio context works
});

function filterSkills(searchTerm) {
  const term = searchTerm.toLowerCase().trim();

  // Auto-expand main section if searching
  if (term) {
    const mainSection = document.getElementById('section-tech');
    if (mainSection && !mainSection.classList.contains('expanded')) {
      mainSection.classList.add('expanded');
    }
  }

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
