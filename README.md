# 🛡️ HAVEN — Anti-AI Privacy Social Network Prototype

> **Course Assignment**: Lightweight, Privacy-Focused Social Media Prototype  
> **Tech Stack**: HTML5, Vanilla CSS3, Vanilla JavaScript (No backend, no database, no external dependencies)

---

## 📖 1. Project Overview & Mission

Artificial Intelligence models are trained on massive datasets scraped across traditional social media platforms—often taking private conversations, personal thoughts, and creative works without user consent.

**Haven** is a multi-page, lightweight web prototype built from scratch to demonstrate how a privacy-first social platform can empower human connection. It prioritizes user security, data privacy, and freedom of expression using 100% client-side technologies.

### Key Highlights:
- **Zero AI Model Harvesting**: Client-side markup and headers designed to resist automated scraping bots.
- **Client-Side Sandbox (`localStorage`)**: Realistic authentication, profile editing, and post creation without exposing personal telemetry to a remote server.
- **Metadata Scrubbing**: Removes tracking cookies and EXIF location tags before rendering posts.
---

## 📁 2. Repository Structure

The project strictly follows the requested course layout:

```text
.
├── index.html                   # Landing page introducing the mission & platform features
├── pages/
│   ├── login.html               # Authentication page (with demo credentials)
│   ├── signup.html              # Account registration with client-side validation
│   ├── feed.html                # Main community feed (post composer, likes, replies, filters)
│   ├── profile.html             # User profile (editable bio, privacy score, personal posts)
│   ├── about.html               # The Haven Manifesto & interactive privacy audit scanner
│   └── privacy.html             # Privacy dashboard (anti-scraper toggles & data purge)
├── src/
│   ├── css/
│   │   └── style.css            # Plain, simple, beginner-friendly CSS layout matching lecture notes
│   └── js/
│       └── main.js              # Pure Vanilla JS: auth, alert(), console.log(), document.location.href
├── assets/
│   └── img/
│       ├── logo.svg             # Vector shield logo
│       └── default-avatar.svg   # Vector privacy avatar
└── README.md                    # Complete project documentation and code guide
```

---

## 🚀 3. How to Run the Application

This is a static web application that requires **no build tools, no Node.js server, and no database installation**.

### Option A: Direct Browser Launch (Easiest)
1. Navigate to the project folder (`sample/`).
2. Double-click on `index.html` (or right-click → **Open With** → Google Chrome / Microsoft Edge / Firefox).
3. The application will immediately run in your browser.

### Option B: Using VS Code Live Server
1. Open the project folder in Visual Studio Code.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"**.

---

## 🔑 4. Demo Login Credentials

For testing and instructor grading, the prototype is pre-seeded with sample credentials:

- **Username**: `qwer`
- **Password**: `1234`

*(You can also click **"Sign Up"** to create any new user account. It will immediately save to your browser's local storage and log you in!)*

---

## 💻 5. Features & Page Breakdown

### 1. Landing Page (`index.html`)
- Displays the **Anti-AI Manifesto** headline.
- Highlights the four core architectural benefits: *Zero AI Web Scraping*, *Local Privacy Sandbox*, *Automatic Metadata Stripping*, and *Ephemeral Freedom*.
- Provides direct navigation to Login, Signup, or Public Feed.

### 2. Login Page (`pages/login.html`)
- Clean, accessible login form.
- Contains a handy **Demo Credentials Box** for easy grading.
- Connects to `loginUser()` in `main.js`, verifying credentials against `localStorage`.

### 3. Signup Page (`pages/signup.html`)
- Full registration form (Display Name, Unique Username, Password, Confirm Password).
- Validates password length and matching confirmation fields before storing the new account.

### 4. Main Feed (`pages/feed.html`)
- **Post Composer**: Users can write updates and select a privacy tag:
  - 🛡️ *AI Shielded*
  - 🚫 *Zero-Scrape Tag*
  - ⏱️ *Ephemeral (24h)*
- **Live Feed List**: Dynamically loaded from `localStorage`.
- **Interactive Likes**: Users can like/unlike posts in real time; likes are stored per user.
- **Threaded Comments**: Users can add immediate replies to any post.
- **Feed Filters**: Quick filter buttons to view *All*, *Shielded*, *Zero-Scrape*, or *Ephemeral* posts.
- **Security Sidebar**: Shows active protection status (AI scraper blocked, 0 cookies stored).

### 5. Profile Page (`pages/profile.html`)
- Displays banner, avatar, user handle, and "100% Shielded" badge.
- **Inline Bio Editor**: Click "✏️ Edit Bio" to change your description; updates are immediately saved to `localStorage`.
- **Privacy Score & Metrics**: Tracks protected posts and 0 leaked trackers.
- **My Posts**: Displays only the posts authored by the currently logged-in user.

### 6. About Us Page (`pages/about.html`)
- Full narrative explaining the problem of corporate AI mass-harvesting personal data.
- Detail on the **Three Pillars of Defense**.
- **Interactive AI Tracker Scanner**: An interactive button that tests the DOM to simulate scanning for 3rd-party trackers and AI scraper hooks.

### 7. Privacy Tools & Security Dashboard (`pages/privacy.html`)
- Interactive toggle switches for:
  - Block AI Scraper Bots
  - Scrub EXIF & Telemetry Metadata
  - Default to Ephemeral Posts (24-Hour Expiry)
  - Stealth Anti-Fingerprinting Mode
- **Zero-Knowledge Data Purge**: A red "Purge All My Data" button that completely resets `localStorage` to test complete data deletion.

---

## 🧠 6. Step-by-Step Code Walkthrough (For Students & Grading)

### A. How Data Persistence Works Without a Database
Instead of relying on a backend server like Node.js or Python, the app uses the browser's native **`localStorage` API**:
```javascript
// Reading data:
const posts = JSON.parse(localStorage.getItem('haven_posts') || '[]');

// Saving data:
localStorage.setItem('haven_posts', JSON.stringify(posts));
```
This allows the application to behave like a full-stack social media app—saving posts, remembering login sessions, and updating bios—while remaining 100% static and private to the user's browser.

### B. How Authentication is Simulated
When `loginUser(username, password)` runs:
1. It retrieves the list of users from `localStorage`.
2. It looks for a match with `.find()`.
3. If valid, it writes the user object into `haven_current_user`.
4. The page redirects to `feed.html` using `window.location.href`.

### C. Clean CSS Architecture
`src/css/style.css` is structured using **CSS Custom Properties (Variables)** for consistent colors, padding, and fonts:
```css
:root {
  --bg-main: #0b1120;
  --bg-surface: #131c31;
  --primary: #10b981;
  --accent-cyan: #06b6d4;
  --text-main: #f8fafc;
}
```
All components (cards, buttons, forms, navbars) use these tokens, making the design modern, dark-themed, and responsive across desktops, tablets, and phones.

---

## 📜 7. License & Academic Integrity
Created for educational purposes as part of the Web Development course curriculum. Free to use, adapt, and build upon.
