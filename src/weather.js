import { WEATHER_CITIES } from './constants.js';
import { saveState, state } from './state.js';
import { renderAllWidgets } from './widgets/manager.js';

// ==========================================================================
// 9. WIDGET VREME (SIBIU IMPLICIT, OPEN-METEO API + FALLBACK MOCK-UP)
// ==========================================================================

const weatherIconEl = document.getElementById('weather-icon');
const weatherTempEl = document.getElementById('weather-temp');
const weatherDescEl = document.getElementById('weather-desc');
const weatherCityEl = document.getElementById('weather-city');
const weatherWindEl = document.getElementById('weather-wind');
const weatherCityBtn = document.getElementById('weather-city-btn');
const weatherCityPopover = document.getElementById('weather-city-popover');
const weatherCityList = document.getElementById('weather-city-list');

export function mapWmoCodeToRo(code) {
  if (code === 0) return { desc: 'Clear', icon: '☀️' };
  if (code === 1 || code === 2) return { desc: 'Partly cloudy', icon: '⛅' };
  if (code === 3) return { desc: 'Overcast', icon: '☁️' };
  if (code >= 45 && code <= 48) return { desc: 'Fog', icon: '🌫️' };
  if (code >= 51 && code <= 67) return { desc: 'Light rain', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { desc: 'Snowfall', icon: '❄️' };
  if (code >= 80 && code <= 82) return { desc: 'Averse', icon: '🌦️' };
  if (code >= 95) return { desc: 'Thunderstorm', icon: '⛈️' };
  return { desc: 'Variabil', icon: '🌤️' };
}

export async function updateWeather() {
  const cityObj =
    WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];

  weatherCityEl.textContent = cityObj.name;
  weatherTempEl.textContent = `${cityObj.mockTemp}°C`;
  weatherDescEl.textContent = cityObj.mockDesc;
  weatherWindEl.textContent = `${cityObj.mockWind} km/h`;
  weatherIconEl.textContent = cityObj.mockIcon;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&current_weather=true`;
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    if (data && data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const wind = Math.round(data.current_weather.windspeed);
      const mapped = mapWmoCodeToRo(data.current_weather.weathercode);

      weatherTempEl.textContent = `${temp}°C`;
      weatherWindEl.textContent = `${wind} km/h`;
      weatherDescEl.textContent = mapped.desc;
      weatherIconEl.textContent = mapped.icon;
    }
  } catch {
    // Keep displaying mock data when there is no internet connection
  }
}

export function initWeatherWidget() {
  weatherCityList.innerHTML = '';
  WEATHER_CITIES.forEach((city) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = city.name;
    btn.className =
      'px-2.5 py-1.5 rounded-xl text-left text-white/80 hover:text-white hover:bg-white/15 transition-colors';
    btn.addEventListener('click', () => {
      state.weatherCity = city.name;
      saveState();
      weatherCityPopover.classList.add('hidden');
      updateWeather();
      renderAllWidgets();
    });
    weatherCityList.appendChild(btn);
  });

  weatherCityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    weatherCityPopover.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!weatherCityPopover.contains(e.target) && e.target !== weatherCityBtn) {
      weatherCityPopover.classList.add('hidden');
    }
  });

  updateWeather();
}
