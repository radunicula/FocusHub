/**
 * FocusHub — application entry point.
 * Source modules live in src/ and are bundled into app.js with `npm run build:js`.
 */

import { saveMigratedStateIfNeeded } from './state.js';
import { renderWorkspacesBar } from './workspaces.js';
import { initGreetingAndFocus, updateClock } from './clock.js';
import { initGlobalSearchAndShortcuts } from './search.js';
import { initBackupControls } from './backup.js';
import { initMultiWidgetControls } from './widgets/manager.js';
import { initBackgroundAndVisualSettings } from './appearance.js';
import { initWeatherWidget } from './weather.js';
import { initQuotes } from './quotes.js';

// ==========================================================================
// 11. APPLICATION INITIALIZATION
// ==========================================================================

function init() {
  updateClock();
  setInterval(updateClock, 1000);

  renderWorkspacesBar();
  initGreetingAndFocus();
  initGlobalSearchAndShortcuts();
  initBackupControls();
  initBackgroundAndVisualSettings();
  initWeatherWidget();
  initMultiWidgetControls();
  initQuotes();
  saveMigratedStateIfNeeded();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
