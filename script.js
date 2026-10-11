// Interactive behaviors for Siddharth Kote's PCB Portfolio (Dark Navy + Electric Cyan Theme)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

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
    solar: {
      title: "Tiny Solar Supply (Sunlight In, 3.3 V Out)",
      badge: "KiCad 9 :: Micropower Boost Converter (Elektor Lab)",
      overview: "Designed based on the Elektor Lab design to convert a solar-charged 1.2V Ni-MH AA/AAA cell into a steady, regulated 3.3V power rail suitable for microcontrollers and IoT sensors.",
      specs: [
        { label: "Step-Up Controller", value: "AP3015 / AP3015A (Diodes Inc.)" },
        { label: "Input Voltage Range", value: "1.0V to 1.2V Ni-MH Cell (starts up down to 1.0V for A-version)" },
        { label: "Output Voltage", value: "Regulated 3.3V (Set by Vout = 1.23 × (1 + R1/R2) with R1=1M, R2=604k)" },
        { label: "Output Current", value: "100 mA (AP3015A) / up to 350 mA (AP3015 standard)" },
        { label: "Automatic Shutdown", value: "2N7002 SOT-23 N-FET (Shuts down regulator while charging under sunlight)" },
        { label: "Schottky Diodes", value: "2x SS14 (DO-214AC)" },
        { label: "Inductor", value: "10 µH, 680 mA rated current" },
        { label: "Passives Footprints", value: "0805 Resistors & Capacitors (4.7µF, 22µF, 10pF)" }
      ],
      highlights: [
        "Automatic day/night solar switching: solar voltage biases the 2N7002 gate, pulling /SHDN low to disable the boost converter while charging, then releasing /SHDN at dusk.",
        "Precision resistor divider (R1=1MΩ, R2=604kΩ 1%) generates exactly 3.3V for clean MCU powering.",
        "Ultra-compact layout optimized to fit inside miniature weatherproof solar lighting enclosures.",
        "Comprehensive component placement with dedicated ground returns for high-frequency switching loops."
      ],
      githubLink: "https://github.com/siddharthkote25"
    },
    datalogger: {
      title: "MCU Data Logger – ATmega328P Acquisition Board",
      badge: "KiCad 9 :: 2-Layer Embedded Acquisition Board",
      overview: "End-to-end battery-backed embedded data logging hardware designed in KiCad using modular hierarchical sheets and optimized 2-layer routing.",
      images: [
        { url: "assets/images/datalogger-3d.png", label: "3D KiCad Raytraced Board" },
        { url: "assets/images/datalogger-pcb.png", label: "2D PCB Layout & Routing" },
        { url: "assets/images/datalogger-schematic.png", label: "KiCad Schematic (Sheet 1)" }
      ],
      specs: [
        { label: "Microcontroller", value: "ATmega328P-AU (32-pin TQFP)" },
        { label: "Real-Time Clock", value: "DS1337 I2C RTC with dedicated crystal oscillator" },
        { label: "Non-Volatile Storage", value: "2x 24LC1025 I2C EEPROMs (256 KB total memory)" },
        { label: "Communication Buses", value: "I2C, UART, GPIO headers, and standard 6-pin ICSP" },
        { label: "Board Architecture", value: "Hierarchical Schematic (MCU, RTC, EEPROM, Connectors)" },
        { label: "PCB Stackup", value: "2-Layer Board with Top/Bottom Solid Copper Ground Fills" },
        { label: "Manufacturability", value: "100% DRC verified, standard 0.25mm trace/space, Gerber RS-274X" }
      ],
      highlights: [
        "Hierarchical schematic sheets ensuring strict signal modularity, net labeling, and power flags.",
        "Strategically located high-frequency crystal and decoupling capacitors placed in close proximity to ATmega328P VCC/GND pins.",
        "I2C pull-up resistors tuned for reliable high-speed EEPROM and RTC bus communication without bus contention.",
        "Full copper ground pours with thermal relief on both layers ensuring low impedance and easy soldering."
      ],
      githubLink: "https://github.com/siddharthkote25"
    },
    safesteps: {
      title: "SafeSteps – ESP32 Personal Safety Device",
      badge: "KiCad 9 :: IoT, Cellular & Telematics Hardware",
      overview: "Custom hardware platform for a portable personal safety device integrating satellite navigation, cellular communication, and tactile emergency alerts.",
      images: [
        { url: "assets/images/safesteps-3d.png", label: "3D KiCad Board View" },
        { url: "assets/images/safesteps-pcb.png", label: "2D PCB Layout & Routing" },
        { url: "assets/images/safesteps-schematic.png", label: "KiCad Schematic Sheet" }
      ],
      specs: [
        { label: "Main Processor", value: "ESP32 (Wi-Fi, Bluetooth BLE, Dual Tensilica Cores)" },
        { label: "GPS / GNSS Module", value: "NEO-6M Satellite Positioning Engine" },
        { label: "Cellular Telemetry", value: "A7670C 4G LTE High-Speed Cellular Module" },
        { label: "User Interface / Alert", value: "Emergency SOS push-button, status LEDs, and high-decibel Buzzer" },
        { label: "Power Supply", value: "Rechargeable Li-Po battery input with HT7333 3.3V ultra-low quiescent LDO" },
        { label: "Communication Links", value: "High-speed UART interfaces from ESP32 to GPS and LTE modems" },
        { label: "Library Assets", value: "Custom schematic symbols & high-accuracy PCB footprint models created in KiCad" }
      ],
      highlights: [
        "Configured specialized net classes and clearance constraints for cellular RF and high-current power nets.",
        "Integrated ultra-low dropout HT7333 regulator delivering steady 3.3V while maximizing battery runtime from single-cell Li-Po.",
        "Component layout engineered to minimize digital switching noise coupling into the sensitive GPS RF receiver.",
        "Full design verified with DRC (0 errors) and complete production Gerber export."
      ],
      githubLink: "https://github.com/siddharthkote25"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const galleryHtml = data.images && data.images.length ? `
      <div style="margin-bottom: 1.5rem;">
        <h4 class="modal-gallery-title">KiCad Hardware Visuals (Click to view full size)</h4>
        <div class="modal-gallery">
          ${data.images.map(img => `
            <a href="${img.url}" target="_blank" rel="noopener" class="modal-gallery-item" title="Click to view full resolution in new tab">
              <img src="${img.url}" alt="${img.label}">
              <span class="modal-gallery-label">${img.label} ↗</span>
            </a>
          `).join('')}
        </div>
      </div>
    ` : '';

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="tag" style="margin-bottom: 0.5rem; display: inline-block;">${data.badge}</span>
        <h3 style="font-size: 1.5rem; color: #F8FAFC; margin-bottom: 0.5rem;">${data.title}</h3>
        <p style="color: #94A3B8; font-size: 0.95rem;">${data.overview}</p>
      </div>

      ${galleryHtml}

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.75rem; font-family: var(--font-mono);">Hardware Specifications & Circuit Details</h4>
        <div style="background: #0c1322; border: 1px solid #1E293B; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.specs.map(s => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-family: var(--font-mono);">
              <span style="color: #64748B;">${s.label}:</span>
              <span style="color: #F8FAFC; font-weight: 500; text-align: right; max-width: 60%;">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.75rem; font-family: var(--font-mono);">Engineering Highlights</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${data.highlights.map(h => `
            <li style="font-size: 0.88rem; color: #CBD5E1; display: flex; gap: 0.6rem; line-height: 1.5;">
              <span style="color: #38BDF8;">✔</span> ${h}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="padding-top: 1rem; border-top: 1px solid #1E293B; display: flex; justify-content: flex-end; gap: 0.8rem;">
        <a href="${data.githubLink}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          View on GitHub &rarr;
        </a>
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
        copyBtn.style.background = '#38BDF8';
        copyBtn.style.color = '#080D1A';

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
      statusEl.style.color = '#38BDF8';
      statusEl.textContent = '✓ Message received! Siddharth will get back to you shortly.';
    }
    if (submitBtn) {
      submitBtn.textContent = 'Sent Successfully';
    }
    const form = document.getElementById('contact-form');
    if (form) form.reset();
  }, 800);
}
