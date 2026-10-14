// Interactive behaviors for Siddharth Kote's PCB Portfolio (Dark Navy + Electric Cyan Theme)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle with Accessible State & Outside Click Handling
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    const closeMobileMenu = () => {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMobileMenu = () => {
      const isOpen = navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
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
    datalogger: {
      title: "MCU Data Logger",
      badge: "KiCad • ATmega328P • 2-Layer PCB",
      overview: "A battery-powered data logger based on the ATmega328P microcontroller, featuring real-time timekeeping with the DS1337 RTC, 256 KB non-volatile EEPROM data logging, and external sensor headers.",
      images: [
        { url: "assets/projects/mcu-data-logger/pcb-3d.png", label: "3D PCB Render" },
        { url: "assets/projects/mcu-data-logger/schematic.png", label: "KiCad Schematic" },
        { url: "assets/projects/mcu-data-logger/pcb-layout.png", label: "PCB Layout" },
        { url: "assets/projects/mcu-data-logger/routing.png", label: "Trace Routing" }
      ],
      design: "Engineered as a compact 2-layer PCB in KiCad. The circuit layout separates the microcontroller core, high-precision crystal oscillator, and external communication interfaces with solid copper ground fills to minimize noise and maintain signal stability.",
      keyComponents: [
        { name: "ATmega328P-AU", role: "Main microcontroller (32-pin TQFP package)" },
        { name: "DS1337 RTC", role: "I2C real-time clock with dedicated 32.768 kHz crystal oscillator" },
        { name: "2x 24LC1025 EEPROMs", role: "Non-volatile storage memory (256 KB total) over I2C bus" },
        { name: "Decoupling Capacitors", role: "100nF ceramic capacitors placed close to IC power pins" },
        { name: "ICSP Header", role: "Standard 6-pin AVR in-system programming interface" }
      ],
      tools: ["KiCad", "Schematic Capture", "PCB Editor", "ERC / DRC", "Gerber Generation"],
      designProcess: [
        "Created circuit schematic with hierarchical structure, net labels, and power flags in KiCad.",
        "Verified component footprints against manufacturer datasheets.",
        "Placed decoupling capacitors directly adjacent to MCU and IC power pins.",
        "Routed critical power, ground, and I2C signal lines on a 2-layer layout.",
        "Performed Electrical Rules Check (ERC) and Design Rules Check (DRC) to fix layout issues.",
        "Generated standard Gerber and Excellon drill files for PCB manufacturing."
      ],
      githubLink: "https://github.com/siddharthkote25"
    },
    safesteps: {
      title: "SafeSteps – Personal Safety Device",
      badge: "KiCad • ESP32 • GPS & 4G LTE",
      overview: "An ESP32-based personal safety device integrating satellite GPS positioning, 4G cellular telemetry, an emergency tactile button trigger, buzzer alert, and power management in a wearable form factor.",
      images: [
        { url: "assets/projects/safesteps/pcb-3d.png", label: "3D PCB Render" },
        { url: "assets/projects/safesteps/schematic.png", label: "KiCad Schematic" },
        { url: "assets/projects/safesteps/pcb-layout.png", label: "PCB Layout" },
        { url: "assets/projects/safesteps/routing.png", label: "Trace Routing" }
      ],
      design: "Built around an ESP32 microcontroller with isolated UART communication links to the NEO-6M GPS receiver and A7670C 4G modem. Includes an onboard HT7333 low-quiescent 3.3V voltage regulator powered by a rechargeable Li-Po cell.",
      keyComponents: [
        { name: "ESP32-DEVKIT-V1", role: "Primary microcontroller handling sensor logic and modems" },
        { name: "NEO-6M GPS Module", role: "Satellite positioning engine for real-time location capture" },
        { name: "A7670C 4G LTE Modem", role: "Cellular transceiver for sending emergency SMS alerts" },
        { name: "HT7333 LDO Regulator", role: "Ultra-low quiescent current 3.3V voltage regulation" },
        { name: "Emergency Push-Button & Buzzer", role: "Tactile emergency SOS trigger with acoustic siren alert" }
      ],
      tools: ["KiCad", "Schematic Capture", "PCB Editor", "Footprint Wizard", "DRC Verification", "Gerber Export"],
      designProcess: [
        "Captured schematic connections connecting the ESP32 to GPS and cellular modems via UART.",
        "Designed and assigned accurate footprints for all modular headers and IC components.",
        "Arranged board layout keeping antenna paths and RF modules clear from switching noise.",
        "Routed power lines with wider traces to accommodate cellular transmission peak currents.",
        "Ran DRC checks to verify trace clearances and hole sizes against fabrication requirements.",
        "Generated manufacturing Gerber and drill files."
      ],
      githubLink: "https://github.com/siddharthkote25"
    },
    solar: {
      title: "Tiny Solar Supply",
      badge: "KiCad 9 • Boost Converter • AP3015A",
      overview: "A compact solar-charged 3.3V boost power supply designed in KiCad. It charges a single 1.2V Ni-MH AA cell from a solar panel and boosts it to a regulated 3.3V output using the AP3015A micropower boost converter, switching automatically between daytime charging and nighttime boosting.",
      images: [
        { url: "assets/projects/tiny-solar-supply/pcb-3d.png", label: "3D PCB Render" },
        { url: "assets/projects/tiny-solar-supply/schematic.png", label: "KiCad Schematic" },
        { url: "assets/projects/tiny-solar-supply/pcb-layout.png", label: "PCB Layout" }
      ],
      design: "Designed around the AP3015A step-up DC/DC converter. During daytime, the solar panel charges the 1.2V Ni-MH battery through Schottky diode D2 and biases the gate of MOSFET T1 (2N7002), pulling /SHDN low to disable the boost converter. At night, solar voltage drops, releasing /SHDN to boost battery voltage to 3.3V set by feedback divider R1/R2 (1 MΩ / 604 kΩ 1%). PCB layout features a minimized high-frequency switching loop, SMD passives (0805/1206), and clear pin headers for solar, battery, control, and output.",
      keyComponents: [
        { name: "AP3015AKTR-G1 (IC1)", role: "Micropower step-up (boost) DC/DC converter in SOT-23-5" },
        { name: "2N7002 (T1/Q1)", role: "N-channel MOSFET for automatic solar day/night /SHDN control" },
        { name: "SS14 (D1, D2)", role: "Schottky diodes: D1 boost rectifier, D2 battery charging path" },
        { name: "ASPI-0630LR-100M-T15 (L1)", role: "10 µH shielded SMD power boost inductor" },
        { name: "1.2V Ni-MH AA Cell", role: "Rechargeable energy storage battery" },
        { name: "Feedback Divider (R1, R2)", role: "Precision divider (1 MΩ / 604 kΩ 1%) setting 3.3V output" }
      ],
      tools: ["KiCad 9", "Schematic Capture", "PCB Layout", "Component Placement", "Routing", "Footprint Integration"],
      designProcess: [
        "Captured circuit schematic in KiCad covering boost converter, automatic day/night shutdown stage, and feedback network.",
        "Calculated R1/R2 feedback resistor values (1 MΩ / 604 kΩ) to achieve regulated 3.3V output from 1.2V battery input.",
        "Integrated symbols and custom footprints for AP3015A, SS14 diodes, and ASPI shielded inductor.",
        "Arranged PCB component placement to minimize the boost converter switching loop between inductor, diode, and IC.",
        "Routed power, ground, and signal traces with ground returns and silkscreen labeling.",
        "Verified layout and exported 3D board renders, schematics, and manufacturing documentation."
      ],
      githubLink: "https://github.com/siddharthkote25/solar-supply-"
    }
  };

  // Dedicated Hardware Inspection Lightbox Manager
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxLabel = document.getElementById('lightbox-label');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxRawLink = document.getElementById('lightbox-raw-link');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxOverlay = document.getElementById('lightbox-overlay');

  let currentGalleryImages = [];
  let currentGalleryIndex = 0;

  function showLightboxImage(index) {
    if (!currentGalleryImages.length) return;
    currentGalleryIndex = (index + currentGalleryImages.length) % currentGalleryImages.length;
    const item = currentGalleryImages[currentGalleryIndex];
    if (lightboxImg) {
      lightboxImg.style.opacity = '0.35';
      lightboxImg.src = item.url;
      lightboxImg.alt = item.label || 'PCB Hardware Inspection';
      setTimeout(() => {
        lightboxImg.style.opacity = '1';
      }, 70);
    }
    if (lightboxLabel) lightboxLabel.textContent = item.label || '';
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    if (lightboxRawLink) lightboxRawLink.href = item.url;
  }

  function openLightbox(images, startIndex = 0) {
    if (!images || !images.length || !lightbox) return;
    currentGalleryImages = images;
    showLightboxImage(startIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    const modalEl = document.getElementById('project-modal');
    if (!modalEl || !modalEl.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightboxImage(currentGalleryIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showLightboxImage(currentGalleryIndex + 1));

  // Touch Swipe for Mobile Lightbox Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          showLightboxImage(currentGalleryIndex - 1);
        } else {
          showLightboxImage(currentGalleryIndex + 1);
        }
      }
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxImage(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') showLightboxImage(currentGalleryIndex + 1);
    }
  });

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const galleryHtml = data.images && data.images.length ? `
      <div style="margin-bottom: 1.5rem;">
        <h4 class="modal-gallery-title">KiCad Project Visuals (Tap to view high-resolution)</h4>
        <div class="modal-gallery">
          ${data.images.map((img, idx) => `
            <div class="modal-gallery-item" data-index="${idx}" title="Tap to inspect full resolution">
              <img src="${img.url}" alt="${img.label}">
              <span class="modal-gallery-label">${img.label} ⤢</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="tag" style="margin-bottom: 0.5rem; display: inline-block;">${data.badge}</span>
        <h3 style="font-size: 1.5rem; color: #F8FAFC; margin-bottom: 0.5rem;">${data.title}</h3>
      </div>

      ${galleryHtml}

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.5rem; font-family: var(--font-mono);">Project Overview</h4>
        <p style="color: #94A3B8; font-size: 0.92rem; line-height: 1.6;">${data.overview}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.5rem; font-family: var(--font-mono);">Design</h4>
        <p style="color: #CBD5E1; font-size: 0.92rem; line-height: 1.6;">${data.design}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.75rem; font-family: var(--font-mono);">Key Components</h4>
        <div style="background: #0c1322; border: 1px solid #1E293B; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.6rem;">
          ${data.keyComponents.map(c => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-family: var(--font-mono); flex-wrap: wrap; gap: 0.25rem;">
              <span style="color: #38BDF8; font-weight: 600;">${c.name}:</span>
              <span style="color: #CBD5E1; text-align: right;">${c.role}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.6rem; font-family: var(--font-mono);">Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tools.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.02rem; color: #38BDF8; margin-bottom: 0.75rem; font-family: var(--font-mono);">Design Process</h4>
        <ol style="list-style: none; display: flex; flex-direction: column; gap: 0.55rem; padding-left: 0;">
          ${data.designProcess.map((step, idx) => `
            <li style="font-size: 0.88rem; color: #CBD5E1; display: flex; gap: 0.6rem; line-height: 1.5;">
              <span style="color: #38BDF8; font-family: var(--font-mono); font-weight: 600;">0${idx + 1}.</span> <span>${step}</span>
            </li>
          `).join('')}
        </ol>
      </div>

      <div style="padding-top: 1rem; border-top: 1px solid #1E293B; display: flex; justify-content: flex-end; gap: 0.8rem; flex-wrap: wrap;">
        <a href="${data.githubLink}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
          View on GitHub &rarr;
        </a>
      </div>
    `;

    // Connect modal gallery items to the full-screen Lightbox
    if (data.images && data.images.length) {
      modalContent.querySelectorAll('.modal-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
          openLightbox(data.images, idx);
        });
      });
    }

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

  // 4. In-Card Interactive Multi-View Tabs (3D / PCB Layout / Schematic / Routing)
  const projectViews = {
    datalogger: {
      '3d': { src: 'assets/projects/mcu-data-logger/pcb-3d.png', badge: '3D View' },
      'pcb': { src: 'assets/projects/mcu-data-logger/pcb-layout.png', badge: 'PCB Layout' },
      'sch': { src: 'assets/projects/mcu-data-logger/schematic.png', badge: 'Schematic' },
      'routing': { src: 'assets/projects/mcu-data-logger/routing.png', badge: 'Routing' }
    },
    safesteps: {
      '3d': { src: 'assets/projects/safesteps/pcb-3d.png', badge: '3D View' },
      'pcb': { src: 'assets/projects/safesteps/pcb-layout.png', badge: 'PCB Layout' },
      'sch': { src: 'assets/projects/safesteps/schematic.png', badge: 'Schematic' },
      'routing': { src: 'assets/projects/safesteps/routing.png', badge: 'Routing' }
    },
    solar: {
      '3d': { src: 'assets/projects/tiny-solar-supply/pcb-3d.png', badge: '3D View' },
      'pcb': { src: 'assets/projects/tiny-solar-supply/pcb-layout.png', badge: 'PCB Layout' },
      'sch': { src: 'assets/projects/tiny-solar-supply/schematic.png', badge: 'Schematic' }
    }
  };

  // Preload tab images for zero latency
  Object.values(projectViews).forEach(views => {
    Object.values(views).forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  });

  const tabContainers = document.querySelectorAll('.view-tabs');
  tabContainers.forEach(container => {
    const projectId = container.getAttribute('data-project-id');
    const tabs = container.querySelectorAll('.view-tab-btn');
    const targetImg = document.getElementById(`img-${projectId}`);
    const targetBadge = document.getElementById(`badge-${projectId}`);

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering parent card click
        const view = tab.getAttribute('data-view');
        
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (projectViews[projectId] && projectViews[projectId][view] && targetImg) {
          targetImg.style.opacity = '0.35';
          targetImg.style.transform = 'scale(0.98)';
          
          setTimeout(() => {
            targetImg.src = projectViews[projectId][view].src;
            if (targetBadge) {
              targetBadge.textContent = projectViews[projectId][view].badge;
            }
            targetImg.style.opacity = '1';
            targetImg.style.transform = 'scale(1)';
          }, 120);
        }
      });
    });
  });

  // 5. Clickable Preview opens Project Inspection Modal
  document.querySelectorAll('.clickable-preview').forEach(preview => {
    preview.addEventListener('click', (e) => {
      const pid = preview.getAttribute('data-project');
      if (pid) {
        openModal(pid);
      }
    });
  });

  // 6. Navigation Scroll Spy (Highlight active section)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link:not(.btn-nav)');

  function updateNavSpy() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateNavSpy, { passive: true });
  updateNavSpy();

  // 7. Copy Email Feature
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

  // 8. Update footer year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

