import { getActiveWorkspace, saveState } from '../state.js';
import { showToast } from '../utils.js';
import { createWidgetHeader } from './header.js';

// -------------------- WIDGET 9: POMODORO / FOCUS TIMER --------------------
const activePomodoroIntervals = new Map();

function playPomodoroChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.36);
    });
  } catch {
    // Audio blocked or unavailable
  }
}

export function buildPomodoroWidgetContent(widget, cardEl) {
  if (!widget.data) {
    widget.data = {
      mode: 'focus', // 'focus' | 'short' | 'long'
      focusMin: 25,
      shortMin: 5,
      longMin: 15,
      remainingSec: 25 * 60,
      running: false,
      completedSessions: 0,
      linkedTask: '',
    };
  }

  const d = widget.data;
  const getDurationSec = (m) => {
    if (m === 'short') return (d.shortMin || 5) * 60;
    if (m === 'long') return (d.longMin || 15) * 60;
    return (d.focusMin || 25) * 60;
  };

  if (typeof d.remainingSec !== 'number' || d.remainingSec < 0) {
    d.remainingSec = getDurationSec(d.mode);
  }

  const header = createWidgetHeader(
    widget,
    'bg-rose-400/20 text-rose-300',
    `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
  );

  const body = document.createElement('div');
  body.className = 'flex-1 flex flex-col justify-between gap-2.5 overflow-y-auto custom-scrollbar pr-0.5';

  // Mode tabs
  const modesWrap = document.createElement('div');
  modesWrap.className = 'grid grid-cols-3 gap-1 rounded-xl bg-black/25 p-1';
  const modeDefs = [
    { id: 'focus', label: 'Focus', minKey: 'focusMin' },
    { id: 'short', label: 'Short', minKey: 'shortMin' },
    { id: 'long', label: 'Long', minKey: 'longMin' },
  ];
  const modeBtns = {};
  modeDefs.forEach((m) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `todo-filter-btn rounded-lg py-1 text-[11px] transition-colors ${d.mode === m.id ? 'active' : ''}`;
    btn.textContent = `${m.label} (${d[m.minKey]}m)`;
    btn.addEventListener('click', () => {
      stopTimer();
      d.mode = m.id;
      d.remainingSec = getDurationSec(m.id);
      saveState();
      updateDisplay();
    });
    modeBtns[m.id] = btn;
    modesWrap.appendChild(btn);
  });

  // Big clock + progress bar
  const clockBox = document.createElement('div');
  clockBox.className = 'flex flex-col items-center justify-center py-2';
  const timeEl = document.createElement('div');
  timeEl.className = 'font-mono text-4xl sm:text-5xl font-light tracking-tight text-white';

  const progressTrack = document.createElement('div');
  progressTrack.className = 'w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-3';
  const progressFill = document.createElement('div');
  progressFill.className = 'h-full bg-accent-400 transition-all duration-500';
  progressTrack.appendChild(progressFill);

  clockBox.appendChild(timeEl);
  clockBox.appendChild(progressTrack);

  // Controls
  const controls = document.createElement('div');
  controls.className = 'flex items-center justify-center gap-2';

  const startPauseBtn = document.createElement('button');
  startPauseBtn.type = 'button';
  startPauseBtn.className =
    'px-4 py-1.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold text-xs transition-colors';

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className =
    'px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 text-xs transition-colors';
  resetBtn.textContent = '↺ Reset';

  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className =
    'px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 text-xs transition-colors';
  skipBtn.textContent = '⏭ Next';

  controls.appendChild(startPauseBtn);
  controls.appendChild(resetBtn);
  controls.appendChild(skipBtn);

  // Linked task selector (pulls active tasks from To-Do widgets)
  const activeWs = getActiveWorkspace();
  const openTasks = [];
  activeWs.widgets.forEach((w) => {
    if (w.type === 'todo' && Array.isArray(w.data?.items)) {
      w.data.items.forEach((t) => {
        if (!t.completed) openTasks.push(t.text);
      });
    }
  });

  const taskRow = document.createElement('div');
  taskRow.className = 'space-y-1';
  const taskLabel = document.createElement('label');
  taskLabel.className = 'block text-[10px] uppercase tracking-wider text-white/50';
  taskLabel.textContent = 'Current focus task';

  const taskSelect = document.createElement('select');
  taskSelect.className =
    'w-full rounded-xl bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs text-white/90 focus:border-accent-400 focus:outline-none';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  emptyOpt.className = 'bg-slate-900';
  emptyOpt.textContent = '— Select an active To-Do task —';
  taskSelect.appendChild(emptyOpt);

  openTasks.forEach((txt) => {
    const opt = document.createElement('option');
    opt.value = txt;
    opt.className = 'bg-slate-900';
    opt.textContent = txt;
    if (d.linkedTask === txt) opt.selected = true;
    taskSelect.appendChild(opt);
  });

  taskSelect.addEventListener('change', () => {
    d.linkedTask = taskSelect.value;
    saveState();
  });

  taskRow.appendChild(taskLabel);
  taskRow.appendChild(taskSelect);

  const footer = document.createElement('div');
  footer.className =
    'pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/55';
  const sessionsSpan = document.createElement('span');
  const resetSessionsBtn = document.createElement('button');
  resetSessionsBtn.type = 'button';
  resetSessionsBtn.className = 'hover:text-white transition-colors';
  resetSessionsBtn.textContent = 'Reset count';
  resetSessionsBtn.addEventListener('click', () => {
    d.completedSessions = 0;
    saveState();
    updateDisplay();
  });
  footer.appendChild(sessionsSpan);
  footer.appendChild(resetSessionsBtn);

  function updateDisplay() {
    const mins = String(Math.floor(d.remainingSec / 60)).padStart(2, '0');
    const secs = String(d.remainingSec % 60).padStart(2, '0');
    timeEl.textContent = `${mins}:${secs}`;
    const total = Math.max(1, getDurationSec(d.mode));
    const pct = Math.min(100, Math.max(0, ((total - d.remainingSec) / total) * 100));
    progressFill.style.width = `${pct}%`;
    startPauseBtn.textContent = d.running ? '⏸ Pause' : '▶ Start';
    sessionsSpan.textContent = `🍅 ${d.completedSessions || 0} sessions completed`;
    Object.entries(modeBtns).forEach(([id, btn]) => {
      btn.classList.toggle('active', d.mode === id);
    });
  }

  function stopTimer() {
    d.running = false;
    const existing = activePomodoroIntervals.get(widget.id);
    if (existing) {
      clearInterval(existing);
      activePomodoroIntervals.delete(widget.id);
    }
  }

  function advanceMode() {
    stopTimer();
    if (d.mode === 'focus') {
      d.completedSessions = (d.completedSessions || 0) + 1;
      d.mode = d.completedSessions % 4 === 0 ? 'long' : 'short';
    } else {
      d.mode = 'focus';
    }
    d.remainingSec = getDurationSec(d.mode);
    saveState();
    updateDisplay();
  }

  function startTimer() {
    if (d.running) return;
    d.running = true;
    updateDisplay();
    const id = setInterval(() => {
      if (!document.body.contains(cardEl)) {
        stopTimer();
        return;
      }
      if (d.remainingSec > 0) {
        d.remainingSec -= 1;
        updateDisplay();
      } else {
        playPomodoroChime();
        const finishedLabel = d.mode === 'focus' ? 'Focus session complete! Take a break.' : 'Break finished! Ready to focus.';
        showToast(`🍅 ${finishedLabel}`);
        if (typeof Notification === 'function' && Notification.permission === 'granted') {
          new Notification('FocusHub Pomodoro', { body: finishedLabel });
        }
        advanceMode();
      }
    }, 1000);
    activePomodoroIntervals.set(widget.id, id);
  }

  startPauseBtn.addEventListener('click', () => {
    if (d.running) {
      stopTimer();
      saveState();
      updateDisplay();
    } else {
      if (typeof Notification === 'function' && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
      startTimer();
    }
  });

  resetBtn.addEventListener('click', () => {
    stopTimer();
    d.remainingSec = getDurationSec(d.mode);
    saveState();
    updateDisplay();
  });

  skipBtn.addEventListener('click', () => {
    advanceMode();
  });

  // Clear stale interval on re-render
  stopTimer();
  updateDisplay();

  body.appendChild(modesWrap);
  body.appendChild(clockBox);
  body.appendChild(controls);
  body.appendChild(taskRow);

  cardEl.appendChild(header);
  cardEl.appendChild(body);
  cardEl.appendChild(footer);

  return header;
}
