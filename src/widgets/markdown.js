import { escapeHtml } from '../utils.js';

// -------------------- C. QUICK NOTES WIDGET (MARKDOWN & INTERACTIVE CHECKBOXES) --------------------
function formatInlineMarkdown(text) {
  let safe = escapeHtml(text);
  // Code inline `cod`
  safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold **text**
  safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic *text*
  safe = safe.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Links [title](https://...)
  safe = safe.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return safe;
}

export function renderMarkdownToElement(container, rawText, onToggleCheckboxLine) {
  container.innerHTML = '';
  const text = (rawText || '').trim();
  if (!text) {
    const empty = document.createElement('p');
    empty.className = 'text-white/40 italic text-xs';
    empty.textContent = 'Empty note — click “Edit” to start writing.';
    container.appendChild(empty);
    return;
  }

  const lines = rawText.split('\n');
  let currentList = null;

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      currentList = null;
      return;
    }

    if (trimmed.startsWith('### ')) {
      currentList = null;
      const h3 = document.createElement('h3');
      h3.innerHTML = formatInlineMarkdown(trimmed.slice(4));
      container.appendChild(h3);
      return;
    }
    if (trimmed.startsWith('## ')) {
      currentList = null;
      const h2 = document.createElement('h2');
      h2.innerHTML = formatInlineMarkdown(trimmed.slice(3));
      container.appendChild(h2);
      return;
    }
    if (trimmed.startsWith('# ')) {
      currentList = null;
      const h1 = document.createElement('h1');
      h1.innerHTML = formatInlineMarkdown(trimmed.slice(2));
      container.appendChild(h1);
      return;
    }

    if (trimmed.startsWith('> ')) {
      currentList = null;
      const bq = document.createElement('blockquote');
      bq.innerHTML = formatInlineMarkdown(trimmed.slice(2));
      container.appendChild(bq);
      return;
    }

    // Checkbox Markdown: - [ ] sau - [x]
    const taskMatch = trimmed.match(/^[-*•]\s+\[([ xX])\]\s+(.*)$/);
    if (taskMatch) {
      if (!currentList) {
        currentList = document.createElement('ul');
        container.appendChild(currentList);
      }
      const isChecked = taskMatch[1].toLowerCase() === 'x';
      const itemText = taskMatch[2];

      const li = document.createElement('li');
      li.className = 'md-task-item';

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = isChecked;
      cb.className = 'custom-checkbox';
      cb.addEventListener('change', () => {
        onToggleCheckboxLine(lineIdx, cb.checked);
      });

      const span = document.createElement('span');
      span.className = isChecked ? 'line-through opacity-50' : '';
      span.innerHTML = formatInlineMarkdown(itemText);

      li.appendChild(cb);
      li.appendChild(span);
      currentList.appendChild(li);
      return;
    }

    // Unordered list: - , * , •
    const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.tagName !== 'UL') {
        currentList = document.createElement('ul');
        container.appendChild(currentList);
      }
      const li = document.createElement('li');
      li.innerHTML = formatInlineMarkdown(ulMatch[1]);
      currentList.appendChild(li);
      return;
    }

    // Ordered list: 1.
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.tagName !== 'OL') {
        currentList = document.createElement('ol');
        container.appendChild(currentList);
      }
      const li = document.createElement('li');
      li.innerHTML = formatInlineMarkdown(olMatch[1]);
      currentList.appendChild(li);
      return;
    }

    currentList = null;
    const p = document.createElement('p');
    p.innerHTML = formatInlineMarkdown(trimmed);
    container.appendChild(p);
  });
}
