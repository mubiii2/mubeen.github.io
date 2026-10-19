# Media Assets Guide for Mubeen's Portfolio

This guide explains where to put your gameplay videos, screenshots, GIFs, and profile photo, and how to link them in `index.html`.

---

## 1. Directory Structure

Place your media files inside the `assets/` folder:

```text
Portfolio/
├── assets/
│   ├── videos/
│   │   ├── hero-reel.mp4           (Hero looping montage, 6-12s, 16:9)
│   │   ├── campus99-fps.mp4        (Campus 99 gameplay clip)
│   │   ├── dissolve-shader.mp4     (Dissolve shader demonstration)
│   │   ├── active-ragdoll.mp4      (Ragdoll physics gameplay)
│   │   ├── last-experiment.mp4     (Time-travel gameplay)
│   │   └── reverse-it.mp4          (Mobile puzzle gameplay)
│   └── images/
│       ├── portrait.jpg            (Your profile / headshot photo)
│       ├── campus99-thumb.jpg      (Fallback poster screenshot)
│       ├── ragdoll-thumb.jpg       (Fallback poster screenshot)
│       └── analytics-map.png       (Python telemetry screenshot)
```

---

## 2. Recommended Video & Image Formats

- **Videos:** `.mp4` (encoded with H.264 / AAC) or `.webm`
  - Always **muted** (browsers block unmuted autoplay).
  - Short clips: 6 to 12 seconds looping seamlessly.
  - Resolution: 1080p (`1920x1080`) or 720p (`1280x720`) at 30 or 60 fps.
- **Images:** `.jpg`, `.png`, or `.webp`
  - 16:9 for project banners (`1920x1080` or `1280x720`).
  - 4:3 or 1:1 for Tech Art cards (`800x600`).
  - Vertical rectangle (`600x750`) for your portrait.

---

## 3. How to Replace Canvases with Real Videos in `index.html`

### A. Hero Section (Looping Montage)
In `index.html`, find:
```html
<div class="visual-media-box">
  <canvas id="heroReelCanvas" width="960" height="540" ...></canvas>
```
Replace the `<canvas>` line with:
```html
<video autoplay loop muted playsinline poster="assets/images/campus99-thumb.jpg">
  <source src="assets/videos/hero-reel.mp4" type="video/mp4">
</video>
```

---

### B. Project 01: Campus 99 (FPS)
In `index.html`, find:
```html
<div class="media-inner">
  <canvas class="project-canvas" id="canvasFps" width="1280" height="720"></canvas>
```
Replace the `<canvas>` line with:
```html
<video autoplay loop muted playsinline poster="assets/images/campus99-thumb.jpg">
  <source src="assets/videos/campus99-fps.mp4" type="video/mp4">
</video>
```

*(You can do the exact same for Active Ragdoll, The Last Experiment, and Reverse It!)*

---

### C. Profile / About Photo
In `index.html`, find:
```html
<div class="portrait-card">
  <div class="portrait-monogram">M</div>
  <div class="portrait-overlay mono-text">MUBEEN M // BENGALURU</div>
</div>
```
Replace with:
```html
<div class="portrait-card">
  <img src="assets/images/portrait.jpg" alt="Mubeen M — Game Developer">
  <div class="portrait-overlay mono-text">MUBEEN M // BENGALURU</div>
</div>
```

---

### D. Case Study Drawer Images & GIFs
Inside `script.js`, within `caseStudiesData`, you can add image screenshots to any case study section:
```javascript
prose: 'Full screenshot breakdown...',
diagram: [...],
image: 'assets/images/campus99-breakdown.png'
```
