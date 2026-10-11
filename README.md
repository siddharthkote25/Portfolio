# Hardware & PCB Designer Portfolio (KiCad Specialist)

A modern, high-performance, responsive portfolio website tailored specifically for **PCB & Hardware Electronics Engineers** using **KiCad**. Built with clean HTML5, CSS3, and JavaScript — zero complex build tools or heavy node dependencies required.

---

## 🚀 Features

- **High-Tech Aesthetic**: Dark PCB theme with copper/gold pads, emerald solder-mask glow, and animated circuit traces.
- **Interactive Project Filtering**: Instant categorization for IoT/MCUs, Power Electronics/BMS, and RF/High-Speed designs.
- **Deep-Dive Modals**: Detailed engineering specifications (layer stackup, min clearance, IPC compliance, manufacturing notes).
- **Engineering Workflow Timeline**: Schematic Capture → Stackup → Critical Routing → DRC/DFM → Fab & Assembly.
- **Direct Contact & Copy-to-Clipboard**: One-click email copying and interactive quote request form.
- **100% Vercel Ready**: Static deployment with zero build configuration needed.

---

## 🛠️ Project Structure

```
pcb-portfolio/
├── index.html       # Semantic HTML5 markup and PCB schematics visuals
├── styles.css       # Custom modern CSS (responsive grid, variables, animations)
├── script.js        # Filters, modal popups, clipboard copy, and interactive UI
├── vercel.json      # Optional Vercel deployment headers and clean URLs
└── README.md        # Documentation and deployment instructions
```

---

## ⚡ How to Preview Locally

You can open the website right in your browser:
1. Double-click `index.html` in your file explorer, OR
2. In VS Code / Antigravity, open with **Live Server**, OR
3. Run with python's built-in local server:
   ```bash
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your web browser.

---

## 🌐 How to Deploy to Vercel (Step-by-Step)

### Option A: Via GitHub & Vercel Dashboard (Easiest & Automatic Updates)

1. **Initialize Git & Push to GitHub**:
   In your terminal inside `pcb-portfolio`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of PCB designer portfolio"
   ```
2. Create a new repository on [GitHub](https://github.com/new) (e.g. `pcb-portfolio`).
3. Link and push your local code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/pcb-portfolio.git
   git push -u origin main
   ```
4. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** -> **"Project"**.
   - Select your `pcb-portfolio` repository and click **Import**.
   - Keep the default settings (Framework Preset: **Other**) and click **Deploy**.
   - Your website will be live in ~10 seconds with a free `.vercel.app` URL and HTTPS! Any future git push will automatically update your site.

---

### Option B: Via Vercel CLI (Deploy in 1 Command)

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment:
   ```bash
   vercel
   ```
   Follow the simple terminal prompts (Link to existing project? No. Project name: `pcb-portfolio`).
3. For production release:
   ```bash
   vercel --prod
   ```

---

## ✏️ Customization Checklist

- **Your Name & Bio**: Update the headline and bio inside `<section id="hero">` and `<section id="about">` in `index.html`.
- **Your Real Projects**: Replace the placeholder project descriptions, stackup details, and dimensions in `index.html` and the `projectData` object in `script.js`.
- **Contact Details**: Update `your.email@example.com`, your LinkedIn URL, and your GitHub URL in `index.html`.
