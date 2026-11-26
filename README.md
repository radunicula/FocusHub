# FocusHub 🎯

**FocusHub** is a customizable productivity dashboard and start page (Dashboard / New Tab), designed with a modern Glassmorphism aesthetic, fully offline functionality, and advanced workspace organization.

---

## ✨ Key Features

- 🗂️ **Workspaces**: Quickly switch between separate workspaces (e.g., *Main*, *Work & Dev*) or add new workspaces with custom names.
- 🔗 **Ultra-compact quick links**:
  - Organize links into collapsible subgroups.
  - Choose compact vertical list or grid view.
  - **Drag & Drop** to reorder and move links between subgroups and panels.
  - Quickly edit titles, URLs, and categories inline.
- ✅ **To-do lists**:
  - Priority levels (*Normal*, *Urgent*, *Low*).
  - Due dates with quick picks (*Today*, *Tomorrow*, *In a week*, or any date) and smart visual labels (*Today*, *Tomorrow*, *Overdue*).
  - Drag & Drop tasks between different lists.
  - Filters: *All*, *Active*, *Completed*.
- 📝 **Quick notes with Markdown support**:
  - Notes show as formatted Markdown; click a note to edit it and click outside to return to the preview.
  - Supports headings (`#`, `##`), **bold**, *italic*, inline code, and interactive checklists (`- [ ]`, `- [x]`) that can be checked directly in the preview.
- 📅 **Monthly mini calendar**:
  - Shows the week number according to the **ISO 8601** standard (`Wk`).
  - Navigate between months and highlight the current day.
- 🌦️ **Weather & 5-day forecast**:
  - Automatically integrates with the Open-Meteo API for the selected city (**Sibiu** by default).
  - Uses local fallback data if there is no internet connection.
- 🌍 **World clocks**:
  - Display the current time in multiple time zones simultaneously (Bucharest, London, New York, Tokyo, etc.).
- ⏳ **Countdowns**:
  - Track the days and hours remaining until important events or deadlines.
- 🎨 **Visual customization (Glassmorphism & themes)**:
  - Switch panel themes: **Dark** / **Light**.
  - Six accent colors: *Emerald*, *Sky Blue*, *Royal Violet*, *Amber*, *Coral Pink*, and *Turquoise*.
  - Fine-tune glass opacity, blur, and background dimming.
  - **Hide widgets** (footer) to keep only the clock and search over the background.
  - Use 4K Unsplash images (Automotive, Software, Radar, or calm **Nature** landscapes), minimalist gradients, custom URLs, or upload local files saved in **IndexedDB** (without localStorage's 5 MB limit).
- ↩️ **Undo deletions**:
  - Use the dedicated **Undo** button or the `Ctrl+Z` keyboard shortcut to restore deleted items.
- 🌐 **Universal search (Ctrl+K or `/`)**:
  - Instantly search all links, tasks, notes, and events in the dashboard, or search the web directly (Google, DuckDuckGo, YouTube, GitHub).
- 💾 **Backup & Import**:
  - Export and restore the complete state in JSON format.
  - **Import browser bookmarks (.html)**: automatically converts folders exported from Chrome / Firefox into link subgroups.
- ⚡ **100% offline-first**:
  - Tailwind CSS (precompiled into `vendor/tailwind.css`) and fonts (Inter & JetBrains Mono) are hosted locally in the project (`vendor/`), ensuring instant loading without external dependencies.

---

## 🚀 How to Run

As a static web application (HTML5, Tailwind CSS, Vanilla JavaScript), it requires no package installation or build tools to run:

1. Clone the repository:
   ```bash
   git clone https://github.com/radunicula/FocusHub.git
   ```
2. Open `index.html` in any modern browser (Chrome, Firefox, Brave, Edge), or run a simple local server:
   ```bash
   python3 -m http.server 8000
   ```

## 🛠️ Development

The source code lives in ES modules under `src/`. Two generated files are committed so the app runs without any build step (including when `index.html` is opened directly from disk):

- `app.js` — bundle of `src/` produced by [esbuild](https://esbuild.github.io/). **Do not edit it by hand.**
- `vendor/tailwind.css` — precompiled Tailwind CSS.

After changing anything in `src/` or `index.html`, rebuild:

```bash
npm install
npm run build       # build:js + build:css
npm run watch:js    # rebuild app.js automatically while editing
npm run watch:css   # rebuild vendor/tailwind.css automatically while editing
```

Tailwind only picks up class names that appear literally in `index.html` and `src/**/*.js` (see `tailwind.config.js`), so avoid building class names dynamically (e.g. `` `bg-${color}-500` ``).

### Project structure

```text
src/
├── main.js             # entry point: initializes all features
├── constants.js        # storage keys, backgrounds, palettes, cities, quotes
├── defaults.js         # default workspaces and widgets
├── state.js            # persistence, migrations, undo (Ctrl+Z)
├── utils.js            # escaping, URL helpers, toasts, debounce
├── storage/            # IndexedDB backgrounds, auto-sync to a file
├── workspaces.js       # workspace tabs
├── clock.js            # clock, date, greeting
├── search.js           # global search (Ctrl+K or /)
├── backup.js           # JSON export/import, bookmark import
├── canvas.js           # widget layout, drag, resize, link/task drag & drop
├── appearance.js       # background, theme, accent color, glass effect
├── weather.js          # header weather
├── quotes.js           # footer quotes
└── widgets/            # one module per widget type + manager.js (render/add widgets)
```

Imported ES module bindings are read-only, so shared mutable values are changed through setters exported by their owning module (e.g. `setState()` in `state.js`).
