import { QUOTES } from './constants.js';
import { saveState, state } from './state.js';

// ==========================================================================
// 10. MOTIVATIONAL QUOTES IN THE FOOTER
// ==========================================================================

const dailyQuoteEl = document.getElementById('daily-quote');
const nextQuoteBtn = document.getElementById('next-quote-btn');

export function renderQuote() {
  const q = QUOTES[state.quoteIndex % QUOTES.length];
  dailyQuoteEl.textContent = q;
}

export function initQuotes() {
  renderQuote();
  nextQuoteBtn.addEventListener('click', () => {
    state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
    saveState();
    renderQuote();
  });
}
