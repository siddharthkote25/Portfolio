# Portfolio

Personal portfolio website of **Siddharth Kote** — Electronics Hardware & PCB Design Engineer.

Focused on schematic capture, component selection, 2-layer PCB layout, ERC/DRC verification, and Gerber generation using **KiCad**.

---

## ⚡ Features

- **Dark Navy & Electric Cyan Theme**: Clean, professional hardware engineering aesthetic.
- **Hardware Projects Showcase**:
  - **MCU Data Logger**: Battery-backed acquisition board based on ATmega328P with DS1337 RTC and 24LC1025 EEPROMs.
  - **SafeSteps**: ESP32-based wearable safety platform with NEO-6M GPS and A7670C 4G LTE.
  - **Tiny Solar Supply**: Micropower 1.2V to 3.3V boost converter using AP3015 with autonomous day/night shutdown.
- **Interactive Multi-View Previews**: Instant toggling between 3D Renders, PCB Layout, Schematics, and Routing.
- **Full-Screen Hardware Lightbox**: High-resolution image inspection with touch/swipe support on mobile devices.
- **Engineering Workflow Ribbon**: Schematic → Components → Placement → Routing → DRC → Gerber.
- **Fully Responsive**: Optimized for desktop, laptops, tablets, and mobile phones down to 320px with zero horizontal scroll.

---

## 🛠️ Project Structure

```
Portfolio/
├── index.html       # Semantic HTML5 structure
├── styles.css       # Responsive styling & Dark Navy/Cyan palette
├── script.js        # Lightbox, project modal data, and interactive tabs
├── assets/
│   └── projects/    # KiCad 3D renders, layouts, routing, and schematics
│       ├── mcu-data-logger/
│       ├── safesteps/
│       └── tiny-solar-supply/
└── README.md        # Project documentation
```

---

## 🚀 Local Preview

Open `index.html` directly in your browser or run a simple local web server:

```bash
# Python
python -m http.server 3000

# Or Node.js
npx serve .
```

Visit `http://localhost:3000` to preview.
