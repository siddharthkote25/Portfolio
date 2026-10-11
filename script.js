// Interactive behaviors for KiCad PCB Designer Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Project Detail Modal Data & Logic
  const projectData = {
    esp32: {
      title: "ESP32-S3 Industrial Sensor Node",
      badge: "KiCad 8 :: 4-Layer Board",
      overview: "Designed for high-reliability sensor acquisition in electrically noisy industrial automation setups.",
      specs: [
        { label: "Layer Count", value: "4 Layers (Signal - GND - 3.3V Plane - Signal)" },
        { label: "Substrate & Core", value: "FR-4 Standard TG150, 1.6mm thickness" },
        { label: "Copper Weight", value: "1oz Outer / 1oz Inner" },
        { label: "Minimum Trace / Clearance", value: "0.15mm (6 mil) / 0.15mm (6 mil)" },
        { label: "MCU Package", value: "ESP32-S3-WROOM-1 (or QFN56 direct layout)" },
        { label: "Interfaces", value: "Isolated RS-485, Dual USB-C (OTG & Debug), I2C, SPI" },
        { label: "Protective Circuits", value: "USBLC6-4SC6 ESD Diodes, PTC resettable fuses, TVS diodes on bus lines" },
        { label: "Fabrication Ready", value: "Gerber RS-274X, Drill file, IPC-D-356 Netlist, CPL/BOM" }
      ],
      highlights: [
        "Uninterrupted solid Ground plane on Layer 2 directly under RF traces for controlled 50Ω antenna feedline impedance.",
        "Differential routing for USB D+/D- with tight length matching (< 0.1mm skew).",
        "Galvanic isolation on RS-485 transceiver with isolated DC-DC converter prevent ground loops."
      ]
    },
    usbpnd: {
      title: "100W USB-C PD Adjustable Bench Converter",
      badge: "KiCad 8 :: Power Electronics",
      overview: "High-density DC-DC step-down buck module powered by USB Type-C Power Delivery (PD 3.0 up to 20V @ 5A).",
      specs: [
        { label: "Layer Count", value: "2 Layers (Heavy Copper)" },
        { label: "Copper Weight", value: "2oz (70µm) for high current handling" },
        { label: "Thermal Relief", value: "Via stitching under MOSFETs and inductor" },
        { label: "Controller IC", value: "CH224K PD sink negotiator + Synchronous Buck Controller" },
        { label: "Continuous Current", value: "5.0A continuous with < 45°C temp rise" },
        { label: "Switching Frequency", value: "500 kHz (Optimized for inductor footprint)" },
        { label: "Ripple & Noise", value: "< 25mV peak-to-peak under full load" }
      ],
      highlights: [
        "Direct thermal dissipation planes utilizing both top and bottom copper pours tied through an array of 0.3mm thermal vias.",
        "Short, wide high-di/dt current loops to minimize radiated EMI and ringing.",
        "Integrated CC pin pull-down logic and automatic 5V/9V/12V/15V/20V profile negotiation."
      ]
    },
    bms: {
      title: "Precision 3S Li-Ion BMS & Active Telemetry",
      badge: "KiCad 8 :: Battery Management",
      overview: "3-Series Lithium-Ion protection and monitoring circuit with autonomous hardware protection and digital telemetry.",
      specs: [
        { label: "Battery Chemistry", value: "3S Li-Ion / LiPo (9.0V - 12.6V nominal)" },
        { label: "Layer Count", value: "4 Layers" },
        { label: "Protection Thresholds", value: "Overvoltage: 4.25V/cell | Undervoltage: 2.80V/cell" },
        { label: "Balance Current", value: "100mA passive dissipation per cell" },
        { label: "Continuous Discharge", value: "20A (Dual low-Rds(on) N-Channel MOSFETs)" },
        { label: "Telemetry Interface", value: "I2C fuel gauge (Voltage, Current, State of Charge, Temperature)" },
        { label: "Quiescent Current", value: "< 12 µA in sleep / storage state" }
      ],
      highlights: [
        "Dedicated Kelvin connections to current sensing shunt resistor for high-accuracy coulomb counting.",
        "Independent NTC thermistor sensor footprint positioned adjacent to cell terminals.",
        "Clean physical isolation barriers between high-current discharge paths and sensitive analog ADC sensing nets."
      ]
    }
  };

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="tag" style="margin-bottom: 0.5rem; display: inline-block;">${data.badge}</span>
        <h3 style="font-size: 1.6rem; color: #f1f5f9; margin-bottom: 0.5rem;">${data.title}</h3>
        <p style="color: #94a3b8; font-size: 0.95rem;">${data.overview}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.05rem; color: #34d399; margin-bottom: 0.75rem; font-family: var(--font-mono);">Fabrication & Layout Specifications</h4>
        <div style="background: #091210; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.specs.map(s => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-family: var(--font-mono);">
              <span style="color: #64748b;">${s.label}:</span>
              <span style="color: #f1f5f9; font-weight: 500; text-align: right; max-width: 60%;">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.05rem; color: #34d399; margin-bottom: 0.75rem; font-family: var(--font-mono);">Key Engineering Highlights</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.highlights.map(h => `
            <li style="font-size: 0.88rem; color: #cbd5e1; display: flex; gap: 0.6rem; line-height: 1.5;">
              <span style="color: #10b981;">✔</span> ${h}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: flex-end; gap: 0.8rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('In your real deployment, link this button to your GitHub repository or Gerber ZIP download!')">Download Fabrication Files</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = e.currentTarget.getAttribute('data-project');
      openModal(pid);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Copy Email Feature
  const copyBtn = document.getElementById('copy-email-btn');
  const emailSpan = document.getElementById('email-address');

  if (copyBtn && emailSpan) {
    copyBtn.addEventListener('click', () => {
      const email = emailSpan.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        copyBtn.style.color = '#050a09';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }

  // 5. Update footer year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Form submit handler
function handleFormSubmit() {
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  setTimeout(() => {
    if (statusEl) {
      statusEl.style.color = '#34d399';
      statusEl.textContent = '✓ Message received! I will review your requirements and respond promptly.';
    }
    if (submitBtn) {
      submitBtn.textContent = 'Sent Successfully';
    }
    const form = document.getElementById('contact-form');
    if (form) form.reset();
  }, 900);
}
