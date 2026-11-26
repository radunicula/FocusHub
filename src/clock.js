import { saveState, state } from './state.js';
import { updateWorldClocksInDom } from './widgets/clocks.js';

// ==========================================================================
// 3. DIGITAL CLOCK (24H), DATE, WEEK NUMBER, AND GREETING
// ==========================================================================

const clockTimeEl = document.getElementById('clock-time');
const clockSecondsEl = document.getElementById('clock-seconds');
const clockDateEl = document.getElementById('clock-date');
const clockWeekEl = document.getElementById('clock-week');
const greetingTextEl = document.getElementById('greeting-text');
const userNameEl = document.getElementById('user-name');

// Calculate the week number according to ISO 8601 (Monday = first day)
export function getISOWeekNumber(date) {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
}

export function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  clockTimeEl.textContent = `${hours}:${minutes}`;
  clockSecondsEl.textContent = seconds;

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  clockDateEl.textContent = dateFormatter.format(now);

  if (clockWeekEl) {
    const weekNo = getISOWeekNumber(now);
    clockWeekEl.textContent = `Week ${weekNo}`;
  }

  const hr = now.getHours();
  if (hr >= 5 && hr < 12) {
    greetingTextEl.textContent = 'Good morning';
  } else if (hr >= 12 && hr < 18) {
    greetingTextEl.textContent = 'Good afternoon';
  } else {
    greetingTextEl.textContent = 'Good evening';
  }

  updateWorldClocksInDom(now);
}

export function initGreetingAndFocus() {
  userNameEl.textContent = state.userName || 'Explorer';

  userNameEl.addEventListener('blur', () => {
    const cleaned = userNameEl.textContent.trim() || 'Explorer';
    state.userName = cleaned;
    userNameEl.textContent = cleaned;
    saveState();
  });

  userNameEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      userNameEl.blur();
    }
  });
}
