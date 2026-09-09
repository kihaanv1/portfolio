# 🚀 Personal Portfolio Website

Welcome to your modern, responsive personal portfolio website! This project was built completely from scratch using clean **HTML5**, **CSS3**, and **JavaScript** with zero complex build tools or dependencies required.

You can edit every single piece of content directly in **Visual Studio Code** or any text editor.

---

## 📂 Project Structure

```text
Desktop/project/
├── index.html        # Main HTML structure and text content
├── styles.css        # Styling, colors, dark/light theme, and layout
├── script.js         # Interactivity (Theme toggle, mobile menu, filters)
├── preview.bat       # Quick Windows shortcut to launch and preview
└── README.md         # Customization guide (this file)
```

---

## ⚡ Quick Start: Preview Your Website

There are two super easy ways to preview your website locally:

### Option A: Double-Click `preview.bat`
Simply double-click `preview.bat` inside this folder. It will launch a local server and open your browser automatically.

### Option B: Open Directly in Browser
Right-click `index.html` -> **Open with** -> Select **Google Chrome** (or Edge/Brave/Firefox).

### Option C: VS Code Live Server (Recommended)
If you have the **Live Server** extension installed in Visual Studio Code:
1. Open `index.html` in VS Code.
2. Right-click anywhere in the editor and choose **"Open with Live Server"**.

---

## ✏️ How to Customize Your Portfolio

All files have clear comments (such as `<!-- EDIT HERE: ... -->` and `/* EDIT HERE */`) to help you find and change things quickly.

### 1. Update Your Name & Titles
Open [index.html](index.html):
- **Page Title**: Search for `<title>` at line 7 and update your name.
- **Header Logo**: Change `BG` and `Bruce Leeo Gemilga` in the `.brand-logo` section.
- **Hero Greeting**: Look for `<h1 class="hero-title">` to change your name and subtitle.

### 2. Add Your Photo / Profile Picture
Inside the `.hero-visual` section:
1. Drop your photo (e.g. `profile.jpg`) into this folder.
2. Replace the `.avatar-placeholder` `<svg>` block with:
   ```html
   <img src="profile.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
   ```

### 3. Update Social & Contact Links
- In `index.html`, search for `hero-socials` and update the `href` links for GitHub, LinkedIn, and Twitter/X.
- Your personal email is already connected to `bruceleeogemilga@gmail.com`.
- **Direct Email Delivery**: The contact form is configured to send messages directly to your inbox via FormSubmit API with a seamless in-page notification. (Note: On the very first submission, check your inbox for an activation email from FormSubmit to confirm receipt).

### 4. Edit Your Projects
In `index.html` under `<!-- 5. PROJECTS SECTION -->`:
- Each project is wrapped in an `<article class="project-card">`.
- Update the **title**, **description**, **tags**, and links:
  ```html
  <a href="https://your-live-demo.com" target="_blank" class="btn btn-sm btn-primary">Live Demo</a>
  <a href="https://github.com/your-username/repo" target="_blank" class="btn btn-sm btn-outline">Code</a>
  ```
- To add a custom screenshot for a project, replace `.project-preview` with:
  ```html
  <div class="project-preview">
    <img src="your-project-screenshot.png" alt="Project preview" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  ```

### 5. Change Theme Colors & Accent Style
Open [styles.css](styles.css) and look at the `:root` block at the top:
```css
:root {
  --accent-primary: #6366f1;       /* Main brand color */
  --accent-secondary: #06b6d4;     /* Secondary accent */
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  ...
}
```
You can switch `#6366f1` to emerald green (`#10b981`), purple (`#8b5cf6`), rose pink (`#f43f5e`), or any color you love.

---

## 🌐 Deploying Your Website (Free)

When you are ready to put your portfolio on the internet for free:
1. **GitHub Pages**:
   - Push this folder to a GitHub repository named `username.github.io` (or any repository).
   - Go to **Settings** -> **Pages** -> Select **Branch: main** -> **Save**.
2. **Netlify**:
   - Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop).
3. **Vercel**:
   - Run `vercel` or connect your GitHub repo at [vercel.com](https://vercel.com).
