import { WEATHER_CITIES } from '../constants.js';
import { state } from '../state.js';
import { escapeHtml } from '../utils.js';
import { createWidgetHeader } from './header.js';
import { mapWmoCodeToRo } from '../weather.js';

// -------------------- E. 5-DAY WEATHER FORECAST WIDGET (OPEN-METEO) --------------------
const forecastCache = {};

export function buildForecastWidgetContent(widget, cardEl) {
  const cityObj =
    WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];

  const actionsFrag = document.createDocumentFragment();
  const cityBadge = document.createElement('span');
  cityBadge.className =
    'px-2 py-0.5 rounded-lg bg-sky-400/15 text-sky-300 text-[11px] font-medium';
  cityBadge.textContent = `📍 ${cityObj.name}`;
  actionsFrag.appendChild(cityBadge);

  const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    `;

  const header = createWidgetHeader(
    widget,
    'bg-sky-400/15 text-sky-300 border-sky-400/25',
    iconSvg,
    actionsFrag
  );

  const listContainer = document.createElement('div');
  listContainer.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1';

  const renderDays = (days) => {
    listContainer.innerHTML = '';
    days.forEach((d, idx) => {
      const row = document.createElement('div');
      row.className =
        'flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2 text-xs';
      row.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-lg leading-none">${d.icon}</span>
            <div>
              <div class="font-medium text-white capitalize">${idx === 0 ? 'Today' : escapeHtml(d.dayName)}</div>
              <div class="text-[10px] text-white/50">${escapeHtml(d.desc)}</div>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-[10px] text-sky-300/85 font-mono" title="Chance of precipitation">💧 ${d.precip}%</span>
            <div class="font-mono text-xs">
              <span class="font-semibold text-white">${d.max}°</span>
              <span class="text-white/45 ml-1">${d.min}°</span>
            </div>
          </div>
        `;
      listContainer.appendChild(row);
    });
  };

  // Date implicite (fallback rapid)
  const fallbackDays = Array.from({ length: 5 }, (_, i) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + i);
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(dt);
    const mapped = mapWmoCodeToRo(i % 3 === 0 ? 0 : i % 2 === 0 ? 1 : 80);
    return {
      dayName,
      icon: mapped.icon,
      desc: mapped.desc,
      max: cityObj.mockTemp + (i % 3) - 1,
      min: cityObj.mockTemp - 7 + (i % 2),
      precip: i % 2 === 0 ? 10 : 35,
    };
  });

  if (forecastCache[cityObj.name]) {
    renderDays(forecastCache[cityObj.name]);
  } else {
    renderDays(fallbackDays);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=5`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.daily?.time) return;
        const liveDays = data.daily.time.slice(0, 5).map((isoDate, idx) => {
          const dt = new Date(`${isoDate}T12:00:00`);
          const dayName = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          }).format(dt);
          const mapped = mapWmoCodeToRo(data.daily.weathercode?.[idx] ?? 0);
          return {
            dayName,
            icon: mapped.icon,
            desc: mapped.desc,
            max: Math.round(data.daily.temperature_2m_max?.[idx] ?? cityObj.mockTemp),
            min: Math.round(data.daily.temperature_2m_min?.[idx] ?? cityObj.mockTemp - 6),
            precip: Math.round(data.daily.precipitation_probability_max?.[idx] ?? 0),
          };
        });
        forecastCache[cityObj.name] = liveDays;
        renderDays(liveDays);
      })
      .catch(() => {});
  }

  const footer = document.createElement('div');
  footer.className =
    'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
  footer.innerHTML = `
      <span>5-day forecast (${escapeHtml(cityObj.name)})</span>
      <span>Open-Meteo</span>
    `;

  cardEl.appendChild(header);
  cardEl.appendChild(listContainer);
  cardEl.appendChild(footer);

  return header;
}
