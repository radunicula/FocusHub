import { pushUndoState, saveState } from '../state.js';
import { draggedTodoPayload, moveTodoViaDragDrop, setDraggedTodoPayload } from '../canvas.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- B. TO-DO LIST WIDGET (PRIORITY, DUE DATE & DRAG-DROP) --------------------
// YYYY-MM-DD in local time (toISOString() would shift the day for timezones ahead of UTC).
function localIsoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatShortDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).format(d);
}

function formatDueDateBadge(dueDateStr) {
  if (!dueDateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${dueDateStr}T00:00:00`);
  if (Number.isNaN(due.getTime())) return null;

  const diffDays = Math.round((due - today) / 86400000);
  if (diffDays < 0) {
    return {
      label: `Overdue (${Math.abs(diffDays)}d)`,
      cls: 'bg-rose-500/20 text-rose-300 border-rose-400/35',
    };
  }
  if (diffDays === 0) {
    return {
      label: 'Today',
      cls: 'bg-amber-500/20 text-amber-300 border-amber-400/35',
    };
  }
  if (diffDays === 1) {
    return {
      label: 'Tomorrow',
      cls: 'bg-sky-500/20 text-sky-300 border-sky-400/35',
    };
  }
  const shortFmt = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(due);
  return {
    label: shortFmt,
    cls: 'bg-white/10 text-white/65 border-white/15',
  };
}

export function buildTodoWidgetContent(widget, cardEl) {
  const items = Array.isArray(widget.data.items) ? widget.data.items : [];
  const filter = widget.data.filter || 'all';

  const actionsFrag = document.createDocumentFragment();
  const filterWrap = document.createElement('div');
  filterWrap.className = 'flex items-center rounded-xl bg-black/30 p-0.5 text-[10px]';

  [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ].forEach((f) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = f.label;
    b.className = `todo-filter-btn px-2 py-0.5 rounded-lg transition-colors ${
        filter === f.key ? 'active' : ''
      }`;
    b.addEventListener('click', () => {
      widget.data.filter = f.key;
      saveState();
      renderAllWidgets();
    });
    filterWrap.appendChild(b);
  });
  actionsFrag.appendChild(filterWrap);

  const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `;

  const header = createWidgetHeader(
    widget,
    'bg-accent-400/15 text-accent-300 border-accent-400/25',
    iconSvg,
    actionsFrag
  );

  const form = document.createElement('form');
  form.className = 'mb-2.5 space-y-1.5';
  form.innerHTML = `
      <div class="relative flex items-center gap-1.5">
        <input
          type="text"
          name="todoText"
          maxlength="140"
          placeholder="Add a new task..."
          class="flex-1 rounded-xl bg-black/25 border border-white/15 px-3 py-1.5 text-xs text-white placeholder-white/45 focus:border-accent-400/70 focus:bg-black/35 focus:outline-none select-text"
        />
        <button
          type="submit"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 transition-colors"
          title="Add task"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div class="flex items-center gap-1.5 text-[11px]">
        <select
          name="priority"
          class="rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Task priority"
        >
          <option value="normal" class="bg-slate-900">⚪ Normal</option>
          <option value="high" class="bg-slate-900">🔴 Urgent</option>
          <option value="low" class="bg-slate-900">🔵 Low</option>
        </select>
        <select
          name="dueQuick"
          class="rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Due date (optional)"
        >
          <option value="" class="bg-slate-900">📅 No due date</option>
          <option value="0" class="bg-slate-900">Today · ${formatShortDate(0)}</option>
          <option value="1" class="bg-slate-900">Tomorrow · ${formatShortDate(1)}</option>
          <option value="7" class="bg-slate-900">In a week · ${formatShortDate(7)}</option>
          <option value="pick" class="bg-slate-900">Pick a date…</option>
        </select>
        <input
          type="date"
          name="dueDate"
          class="hidden rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Due date"
        />
      </div>
    `;

  const dueQuickSelect = form.querySelector('select[name="dueQuick"]');
  const dueDateInput = form.querySelector('input[name="dueDate"]');
  dueQuickSelect.addEventListener('change', () => {
    const picking = dueQuickSelect.value === 'pick';
    dueDateInput.classList.toggle('hidden', !picking);
    if (!picking) {
      dueDateInput.value = '';
      return;
    }
    dueDateInput.focus();
    try {
      dueDateInput.showPicker?.();
    } catch {
      // showPicker() can throw without user activation; the visible input still works.
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textInput = form.querySelector('input[name="todoText"]');
    const prioritySelect = form.querySelector('select[name="priority"]');
    const text = textInput.value.trim();
    if (!text) return;

    const dueChoice = dueQuickSelect.value;
    const dueDate =
      dueChoice === 'pick'
        ? dueDateInput.value || ''
        : dueChoice === ''
          ? ''
          : localIsoDate(Number(dueChoice));

    widget.data.items.unshift({
      id: `td-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      completed: false,
      priority: prioritySelect.value || 'normal',
      dueDate,
    });
    saveState();
    renderAllWidgets();
  });

  const ul = document.createElement('ul');
  ul.className = 'todo-list-dropzone flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1 rounded-xl transition-colors';

  // Enable Drag & Drop across the entire to-do list
  ul.addEventListener('dragover', (e) => {
    if (!draggedTodoPayload) return;
    e.preventDefault();
    ul.classList.add('drag-over-todo-list');
  });

  ul.addEventListener('dragleave', (e) => {
    if (!ul.contains(e.relatedTarget)) {
      ul.classList.remove('drag-over-todo-list');
    }
  });

  ul.addEventListener('drop', (e) => {
    if (!draggedTodoPayload) return;
    e.preventDefault();
    e.stopPropagation();
    ul.classList.remove('drag-over-todo-list');
    moveTodoViaDragDrop(widget.id, null);
  });

  const filtered = items.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className =
      'py-8 text-center text-xs text-white/45 border border-dashed border-white/10 rounded-xl';
    emptyLi.textContent =
      filter === 'completed'
        ? 'No completed tasks in this list.'
        : 'No active tasks. Add one above or drag one from another list!';
    ul.appendChild(emptyLi);
  } else {
    filtered.forEach((todo) => {
      const li = document.createElement('li');
      li.draggable = true;
      li.className =
        'todo-item-row group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] hover:bg-white/[0.09] border border-white/10 px-2.5 py-1.5 transition-all animate-item';

      li.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        setDraggedTodoPayload({
          sourceWidgetId: widget.id,
          todoId: todo.id,
        });
        li.classList.add('is-todo-dragging');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', todo.text);
        }
      });

      li.addEventListener('dragend', () => {
        li.classList.remove('is-todo-dragging');
        setDraggedTodoPayload(null);
        document
          .querySelectorAll('.drag-over-target, .drag-over-todo-list')
          .forEach((el) => el.classList.remove('drag-over-target', 'drag-over-todo-list'));
      });

      li.addEventListener('dragover', (e) => {
        if (!draggedTodoPayload || draggedTodoPayload.todoId === todo.id) return;
        e.preventDefault();
        e.stopPropagation();
        li.classList.add('drag-over-target');
      });

      li.addEventListener('dragleave', () => {
        li.classList.remove('drag-over-target');
      });

      li.addEventListener('drop', (e) => {
        if (!draggedTodoPayload) return;
        e.preventDefault();
        e.stopPropagation();
        li.classList.remove('drag-over-target');
        ul.classList.remove('drag-over-todo-list');
        moveTodoViaDragDrop(widget.id, todo.id);
      });

      const leftWrap = document.createElement('div');
      leftWrap.className = 'flex items-center gap-1.5 flex-1 min-w-0';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = Boolean(todo.completed);
      cb.className = 'custom-checkbox';
      cb.addEventListener('change', () => {
        todo.completed = cb.checked;
        saveState();
        renderAllWidgets();
      });

      // Priority indicator (click to change)
      const prioBtn = document.createElement('button');
      prioBtn.type = 'button';
      const prio = todo.priority || 'normal';
      prioBtn.className = 'text-[10px] leading-none shrink-0 opacity-85 hover:scale-110 transition-transform';
      prioBtn.title = 'Click to change priority (Normal / Urgent / Low)';
      prioBtn.textContent = prio === 'high' ? '🔴' : prio === 'low' ? '🔵' : '⚪';
      prioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        todo.priority = prio === 'normal' ? 'high' : prio === 'high' ? 'low' : 'normal';
        saveState();
        renderAllWidgets();
      });

      const span = document.createElement('span');
      span.className = `text-xs truncate flex-1 cursor-pointer rounded px-1 -mx-0.5 transition-all ${
          todo.completed ? 'line-through text-white/40' : 'text-white/90'
        }`;
      span.title = 'Click to check or double-click to edit the text';
      span.textContent = todo.text;

      const startEditingTodo = () => {
        span.contentEditable = 'true';
        span.spellcheck = false;
        span.classList.remove('truncate', 'line-through', 'text-white/40');
        span.classList.add('bg-black/45', 'ring-1', 'ring-accent-400/60', 'text-white');
        span.focus();
      };

      span.addEventListener('click', () => {
        if (span.isContentEditable) return;
        todo.completed = !todo.completed;
        saveState();
        renderAllWidgets();
      });

      span.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        startEditingTodo();
      });

      span.addEventListener('blur', () => {
        if (!span.isContentEditable) return;
        span.contentEditable = 'false';
        const newText = span.textContent.trim();
        if (newText) {
          todo.text = newText;
        }
        saveState();
        renderAllWidgets();
      });

      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          span.blur();
        } else if (e.key === 'Escape') {
          span.textContent = todo.text;
          span.blur();
        }
      });

      leftWrap.appendChild(cb);
      leftWrap.appendChild(prioBtn);
      leftWrap.appendChild(span);

      const rightWrap = document.createElement('div');
      rightWrap.className = 'flex items-center gap-1 shrink-0';

      const dueBadge = formatDueDateBadge(todo.dueDate);
      if (dueBadge && !todo.completed) {
        const badgeEl = document.createElement('span');
        badgeEl.className = `text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${dueBadge.cls}`;
        badgeEl.textContent = dueBadge.label;
        rightWrap.appendChild(badgeEl);
      }

      const actionsWrap = document.createElement('div');
      actionsWrap.className =
        'row-actions flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className =
        'p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10 transition-all';
      editBtn.title = 'Edit task';
      editBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        `;
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startEditingTodo();
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className =
        'p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-all';
      delBtn.title = 'Delete task';
      delBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
      delBtn.addEventListener('click', () => {
        pushUndoState(`Task “${todo.text.slice(0, 28)}”`);
        widget.data.items = items.filter((t) => t.id !== todo.id);
        saveState();
        renderAllWidgets();
      });

      actionsWrap.appendChild(editBtn);
      actionsWrap.appendChild(delBtn);
      rightWrap.appendChild(actionsWrap);

      li.appendChild(leftWrap);
      li.appendChild(rightWrap);
      ul.appendChild(li);
    });
  }

  const total = items.length;
  const completedCount = items.filter((t) => t.completed).length;
  const activeCount = total - completedCount;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const footer = document.createElement('div');
  footer.className =
    'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50';
  footer.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div class="h-full bg-accent-400 transition-all duration-300" style="width: ${percent}%"></div>
        </div>
        <span>${activeCount} remaining (${percent}%)</span>
      </div>
    `;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'hover:text-rose-300 transition-colors';
  clearBtn.textContent = 'Clear completed';
  clearBtn.addEventListener('click', () => {
    if (completedCount === 0) return;
    pushUndoState(`${completedCount} completed tasks`);
    widget.data.items = items.filter((t) => !t.completed);
    saveState();
    renderAllWidgets();
  });
  footer.appendChild(clearBtn);

  cardEl.appendChild(header);
  cardEl.appendChild(form);
  cardEl.appendChild(ul);
  cardEl.appendChild(footer);

  return header;
}
