# FocusHub 🎯

**FocusHub** este un panou de productivitate și pagină de start personalizabilă (Dashboard / New Tab), proiectat cu estetică modernă Glassmorphism, funcționare complet offline și organizare avansată a spațiului de lucru.

---

## ✨ Funcționalități principale

- 🗂️ **Spații de lucru (Workspaces)**: Comutare rapidă între spații separate (ex: *Principal*, *Muncă & Dev*) sau adăugare de spații noi cu nume personalizat.
- 🔗 **Scurtături rapide ultra-compacte**:
  - Organizare pe subgrupuri colapsabile.
  - Mod afișare compact (listă verticală rând cu rând) sau grilă.
  - **Drag & Drop** pentru reordonarea și mutarea link-urilor între subgrupuri și panouri.
  - Editare inline rapidă pentru titlu, URL și categorie.
- ✅ **Listă de sarcini (To-Do)**:
  - Nivele de prioritate (*Normală*, *Urgentă*, *Scăzută*).
  - Termene limită (*Due date*) cu etichete vizuale inteligente (*Azi*, *Mâine*, *Depășit*).
  - Drag & Drop între liste de sarcini diferite.
  - Filtre: *Toate*, *Active*, *Finalizate*.
- 📝 **Notițe rapide cu suport Markdown**:
  - Comutare între modul *Editează* și *Previzualizare Markdown*.
  - Suport pentru titluri (`#`, `##`), text îngroșat (`**`), cursiv, cod inline și liste de verificare interactive (`- [ ]`, `- [x]`) bifabile direct din previzualizare.
- 📅 **Mini-Calendar lunar**:
  - Afișează numărul săptămânilor din an conform standardului european **ISO 8601** (`Săpt.`).
  - Navigare între luni și evidențierea zilei curente.
- 🌦️ **Vreme & Prognoză pe 5 zile**:
  - Integrare automată cu Open-Meteo API pentru orașul ales (implicit **Sibiu**).
  - Fallback local (mock data) dacă nu există conexiune la internet.
- 🌍 **Ceasuri mondiale**:
  - Afișare simultană a orei exacte în fusuri orare diferite (București, Londra, New York, Tokyo etc.).
- ⏳ **Numărătoare inversă (Countdown)**:
  - Urmărirea zilelor și orelor rămase până la evenimente sau termene importante.
- 🎨 **Personalizare vizuală (Glassmorphism & Teme)**:
  - Comutare temă panouri: **Întunecată (Dark)** / **Luminoasă (Light)**.
  - 6 culori de accent: *Smarald*, *Albastru Celest*, *Violet Regal*, *Chihlimbar*, *Roz Coral*, *Turcoaz*.
  - Reglaj fin pentru opacitatea sticlei, blur și gradul de întunecare al fundalului.
  - Imagini 4K de pe Unsplash, gradiente minimaliste, URL-uri proprii sau încărcare directă de fișiere din calculator salvate în **IndexedDB** (fără limitarea de 5 MB din localStorage).
- ↩️ **Undo (Anulare ștergeri)**:
  - Buton dedicat „Anulează” și scurtătură rapidă de tastatură `Ctrl+Z` pentru restaurarea oricărui element șters.
- 🌐 **Căutare universală (Ctrl+K sau `/`)**:
  - Căutare instantanee în toate link-urile, sarcinile, notițele și evenimentele din dashboard sau căutare directă pe web (Google, DuckDuckGo, YouTube, GitHub).
- 💾 **Backup & Import**:
  - Export și restaurare completă a stării în format JSON.
  - **Import de Bookmark-uri din Browser (.html)**: convertește automat folderele exportate din Chrome / Firefox în subgrupuri de link-uri.
- ⚡ **100% Offline-First**:
  - Tailwind CSS și fonturile (Inter & JetBrains Mono) sunt găzduite local în proiect (`vendor/`), garantând încărcare instantanee fără dependențe externe.

---

## 🚀 Cum rulezi proiectul

Fiind o aplicație web statică (HTML5, Tailwind CSS, JavaScript Vanilla), nu necesită instalare de pachete sau build tools:

1. Clonează depozitul:
   ```bash
   git clone https://github.com/radunicula/FocusHub.git
   ```
2. Deschide `index.html` în orice browser modern (Chrome, Firefox, Brave, Edge) sau rulează un server local simplu:
   ```bash
   python3 -m http.server 8000
   ```
