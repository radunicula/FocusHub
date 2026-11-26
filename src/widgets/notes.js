import { pushUndoState, saveState } from '../state.js';
import { debounce, showToast } from '../utils.js';
import { createWidgetHeader } from './header.js';
import { renderMarkdownToElement } from './markdown.js';
import { renderAllWidgets } from './manager.js';

// Edit mode is transient (not persisted): notes with content rest in the rendered Markdown
// preview and switch to the editor on click; leaving the editor returns to the preview.
// The set only keeps a note in edit mode across re-renders triggered by other widgets.
const editingNoteIds = new Set();

export function buildNotesWidgetContent(widget, cardEl) {
  const actionsFrag = document.createDocumentFragment();

  const toggleMdBtn = document.createElement('button');
  toggleMdBtn.type = 'button';
  toggleMdBtn.addEventListener('click', () => {
    if (textarea.classList.contains('hidden')) {
      startEditing();
    } else {
      flushContent();
      setPreviewMode(true);
    }
  });

  actionsFrag.appendChild(toggleMdBtn);

  const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    `;

  const header = createWidgetHeader(
    widget,
    'bg-amber-400/15 text-amber-300 border-amber-400/25',
    iconSvg,
    actionsFrag,
    {
      menuItems: [
        {
          label: 'Copy note',
          icon: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>`,
          onSelect: copyNote,
        },
        {
          label: 'Clear note',
          hint: 'Undo with Ctrl+Z',
          icon: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>`,
          onSelect: clearNote,
        },
      ],
    }
  );

  const textarea = document.createElement('textarea');
  textarea.className =
    'w-full flex-1 resize-none rounded-xl bg-black/25 border border-white/10 p-3 text-xs sm:text-sm leading-relaxed text-white/95 placeholder-white/40 focus:border-amber-400/60 focus:bg-black/35 focus:outline-none custom-scrollbar select-text';
  textarea.placeholder =
    'Write notes or use Markdown (# Heading, **bold**, - [ ] task)...';
  textarea.value = widget.data.content || '';

  const mdPreview = document.createElement('div');
  mdPreview.className =
    'markdown-body w-full flex-1 overflow-y-auto rounded-xl bg-black/20 border border-white/10 p-3 text-white/90 custom-scrollbar select-text cursor-text';
  mdPreview.title = 'Click to edit';

  const handleToggleCheckbox = (lineIdx, checked) => {
    const lines = (widget.data.content || '').split('\n');
    if (lines[lineIdx] !== undefined) {
      lines[lineIdx] = lines[lineIdx].replace(
        /^(\s*[-*•]\s+\[)[ xX](\])/,
        `$1${checked ? 'x' : ' '}$2`
      );
      widget.data.content = lines.join('\n');
      saveState();
      renderAllWidgets();
    }
  };

  // Switches mode in place (no full re-render, so clicks on other widgets are never lost).
  function setPreviewMode(preview) {
    const showPreview = preview && Boolean(textarea.value.trim());
    if (showPreview) {
      editingNoteIds.delete(widget.id);
      renderMarkdownToElement(mdPreview, textarea.value, handleToggleCheckbox);
    } else if (!preview) {
      editingNoteIds.add(widget.id);
    }
    textarea.classList.toggle('hidden', showPreview);
    mdPreview.classList.toggle('hidden', !showPreview);
    toggleMdBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-colors ${
      showPreview
        ? 'bg-white/10 text-white/75 border-white/10 hover:text-white'
        : 'bg-amber-400/25 text-amber-200 border-amber-400/40'
    }`;
    toggleMdBtn.title = showPreview ? 'Edit this note' : 'Show the formatted Markdown preview';
    toggleMdBtn.innerHTML = showPreview
      ? '✏️<span class="widget-action-label"> Edit</span>'
      : '👁️<span class="widget-action-label"> Preview</span>';
  }

  function startEditing() {
    setPreviewMode(false);
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  function flushContent() {
    if (widget.data.content !== textarea.value) {
      widget.data.content = textarea.value;
      saveState();
    }
  }

  mdPreview.addEventListener('click', (e) => {
    // Checkboxes and links inside the preview keep their own behavior; selecting text doesn't edit.
    if (e.target.closest('input, a, button')) return;
    if (window.getSelection()?.toString()) return;
    startEditing();
  });

  const footer = document.createElement('div');
  footer.className =
    'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';

  const countSpan = document.createElement('span');
  const savedSpan = document.createElement('span');
  savedSpan.textContent = widget.data.lastSaved || 'Synced locally';

  const updateMetrics = (txt) => {
    const chars = txt.length;
    const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
    countSpan.textContent = `${chars} characters • ${words} words`;
  };
  updateMetrics(textarea.value);

  const debouncedSave = debounce((val) => {
    widget.data.content = val;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    widget.data.lastSaved = `Saved at ${hh}:${mm}:${ss}`;
    savedSpan.textContent = widget.data.lastSaved;
    saveState();
  }, 280);

  textarea.addEventListener('input', () => {
    savedSpan.textContent = 'Saving...';
    updateMetrics(textarea.value);
    debouncedSave(textarea.value);
  });

  textarea.addEventListener('blur', (e) => {
    // Stay in edit mode when focus moves to this widget's own controls or another window.
    if (!document.hasFocus() || (e.relatedTarget && cardEl.contains(e.relatedTarget))) return;
    if (!textarea.value.trim()) return;
    flushContent();
    setPreviewMode(true);
  });

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(widget.data.content || '');
      savedSpan.textContent = '✓ Copied to clipboard!';
      showToast('✓ Note copied to clipboard!');
      setTimeout(() => {
        savedSpan.textContent = widget.data.lastSaved || 'Synced locally';
      }, 1600);
    } catch {
      textarea.select();
    }
  }

  function clearNote() {
    if (!(widget.data.content || '').trim()) return;
    pushUndoState(`Text in “${widget.title}”`);
    textarea.value = '';
    widget.data.content = '';
    widget.data.lastSaved = 'Note cleared';
    updateMetrics('');
    savedSpan.textContent = widget.data.lastSaved;
    saveState();
    renderAllWidgets();
  }

  footer.appendChild(countSpan);
  footer.appendChild(savedSpan);

  setPreviewMode(!editingNoteIds.has(widget.id));

  cardEl.appendChild(header);
  cardEl.appendChild(textarea);
  cardEl.appendChild(mdPreview);
  cardEl.appendChild(footer);

  return header;
}
