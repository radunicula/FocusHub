import { saveState } from '../state.js';
import { showToast } from '../utils.js';
import { createWidgetHeader } from './header.js';

// -------------------- WIDGET 10: ENGINEERING CONVERTERS (HEX/BIN/ENDIAN/RF/UNITS) --------------------
export function buildConvertersWidgetContent(widget, cardEl) {
  if (!widget.data) {
    widget.data = { activeTab: 'radix', value: 255, bits: 16 };
  }
  const d = widget.data;
  if (!d.activeTab) d.activeTab = 'radix';
  if (typeof d.value !== 'number' || !Number.isFinite(d.value)) d.value = 255;
  if (![8, 16, 32].includes(d.bits)) d.bits = 16;

  const header = createWidgetHeader(
    widget,
    'bg-indigo-400/20 text-indigo-300',
    `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>`
  );

  const tabsWrap = document.createElement('div');
  tabsWrap.className = 'grid grid-cols-2 gap-1 rounded-xl bg-black/25 p-1 mb-2.5';
  const tabRadixBtn = document.createElement('button');
  tabRadixBtn.type = 'button';
  tabRadixBtn.className = `todo-filter-btn rounded-lg py-1 text-[11px] ${d.activeTab === 'radix' ? 'active' : ''}`;
  tabRadixBtn.textContent = 'Hex / Dec / Bin';

  const tabUnitsBtn = document.createElement('button');
  tabUnitsBtn.type = 'button';
  tabUnitsBtn.className = `todo-filter-btn rounded-lg py-1 text-[11px] ${d.activeTab === 'units' ? 'active' : ''}`;
  tabUnitsBtn.textContent = 'RF & Automotive Units';

  tabsWrap.appendChild(tabRadixBtn);
  tabsWrap.appendChild(tabUnitsBtn);

  const contentWrap = document.createElement('div');
  contentWrap.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-0.5';

  function renderTab() {
    tabRadixBtn.classList.toggle('active', d.activeTab === 'radix');
    tabUnitsBtn.classList.toggle('active', d.activeTab === 'units');
    contentWrap.innerHTML = '';

    if (d.activeTab === 'radix') {
      const bitWidthRow = document.createElement('div');
      bitWidthRow.className = 'flex items-center justify-between text-[11px]';
      bitWidthRow.innerHTML = `<span class="text-white/60">Bit width</span>`;
      const bitBtns = document.createElement('div');
      bitBtns.className = 'flex gap-1';
      [8, 16, 32].forEach((b) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `px-2 py-0.5 rounded-md font-mono text-[10px] ${
            d.bits === b ? 'bg-accent-500/25 text-accent-300 font-semibold' : 'bg-white/10 text-white/60'
          }`;
        btn.textContent = `${b}-bit`;
        btn.addEventListener('click', () => {
          d.bits = b;
          d.value = maskVal(d.value, d.bits);
          saveState();
          renderTab();
        });
        bitBtns.appendChild(btn);
      });
      bitWidthRow.appendChild(bitBtns);

      const maskVal = (val, bits) => {
        const v = Math.max(0, Math.floor(Number(val) || 0));
        if (bits === 8) return v & 0xff;
        if (bits === 16) return v & 0xffff;
        return v >>> 0;
      };

      const swapEndian = (val, bits) => {
        const v = maskVal(val, bits);
        if (bits === 8) return v;
        if (bits === 16) return ((v & 0xff) << 8) | ((v >> 8) & 0xff);
        return (
          (((v & 0xff) << 24) |
            ((v & 0xff00) << 8) |
            ((v >>> 8) & 0xff00) |
            ((v >>> 24) & 0xff)) >>>
          0
        );
      };

      const makeField = (label, prefix) => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-1.5';
        row.innerHTML = `<span class="w-9 text-[11px] font-mono text-white/60 shrink-0">${label}</span>`;
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className =
          'flex-1 min-w-0 rounded-lg bg-black/25 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text';
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'px-1.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-white/75';
        copyBtn.textContent = '📋';
        copyBtn.title = `Copy ${label}`;
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`${prefix}${inp.value}`);
            showToast(`✓ Copied ${prefix}${inp.value}`);
          }
        });
        row.appendChild(inp);
        row.appendChild(copyBtn);
        return { row, inp };
      };

      const hexF = makeField('HEX', '0x');
      const decF = makeField('DEC', '');
      const binF = makeField('BIN', '0b');

      const endianInfo = document.createElement('div');
      endianInfo.className =
        'rounded-xl bg-black/20 border border-white/10 px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono';

      const bitsGrid = document.createElement('div');
      bitsGrid.className = 'grid grid-cols-8 gap-1 pt-1';

      const syncFields = (source = null) => {
        const v = maskVal(d.value, d.bits);
        d.value = v;
        const hexPad = d.bits / 4;
        if (source !== 'hex') hexF.inp.value = v.toString(16).toUpperCase().padStart(hexPad, '0');
        if (source !== 'dec') decF.inp.value = String(v);
        if (source !== 'bin') binF.inp.value = v.toString(2).padStart(d.bits, '0');

        const swapped = swapEndian(v, d.bits).toString(16).toUpperCase().padStart(hexPad, '0');
        endianInfo.innerHTML = `<span class="text-white/55">Byte-Swap (Endian):</span><span class="text-accent-300">0x${swapped}</span>`;

        bitsGrid.innerHTML = '';
        const displayBits = Math.min(d.bits, 16);
        for (let bit = displayBits - 1; bit >= 0; bit--) {
          const isOne = ((v >>> bit) & 1) === 1;
          const bBtn = document.createElement('button');
          bBtn.type = 'button';
          bBtn.className = `converter-bit-btn py-0.5 ${isOne ? 'is-one' : ''}`;
          bBtn.title = `Toggle bit ${bit} (1 << ${bit} = 0x${(1 << bit).toString(16).toUpperCase()})`;
          bBtn.innerHTML = `<span class="block text-[8px] opacity-55">b${bit}</span><span>${isOne ? '1' : '0'}</span>`;
          bBtn.addEventListener('click', () => {
            d.value = (v ^ (1 << bit)) >>> 0;
            saveState();
            syncFields();
          });
          bitsGrid.appendChild(bBtn);
        }
      };

      hexF.inp.addEventListener('input', () => {
        const cleaned = hexF.inp.value.replace(/^0x/i, '').replace(/[^0-9a-f]/gi, '');
        if (cleaned) {
          d.value = maskVal(parseInt(cleaned, 16), d.bits);
          syncFields('hex');
          saveState();
        }
      });
      decF.inp.addEventListener('input', () => {
        const cleaned = decF.inp.value.replace(/[^0-9]/g, '');
        if (cleaned) {
          d.value = maskVal(parseInt(cleaned, 10), d.bits);
          syncFields('dec');
          saveState();
        }
      });
      binF.inp.addEventListener('input', () => {
        const cleaned = binF.inp.value.replace(/^0b/i, '').replace(/[^01]/g, '');
        if (cleaned) {
          d.value = maskVal(parseInt(cleaned, 2), d.bits);
          syncFields('bin');
          saveState();
        }
      });

      contentWrap.appendChild(bitWidthRow);
      contentWrap.appendChild(hexF.row);
      contentWrap.appendChild(decF.row);
      contentWrap.appendChild(binF.row);
      contentWrap.appendChild(endianInfo);
      contentWrap.appendChild(bitsGrid);
      syncFields();
    } else {
      // Automotive & RF Radar unit converters
      const buildPairCard = (title, unitA, unitB, aToB, bToA, initA) => {
        const box = document.createElement('div');
        box.className = 'rounded-xl bg-black/20 border border-white/10 p-2 space-y-1.5';
        box.innerHTML = `<div class="text-[10px] font-semibold uppercase tracking-wider text-white/60">${title}</div>`;
        const row = document.createElement('div');
        row.className = 'flex items-center gap-1.5';

        const inpA = document.createElement('input');
        inpA.type = 'number';
        inpA.step = 'any';
        inpA.value = String(initA);
        inpA.className =
          'w-full min-w-0 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text';

        const lblA = document.createElement('span');
        lblA.className = 'text-[11px] font-mono text-accent-300 shrink-0';
        lblA.textContent = unitA;

        const eq = document.createElement('span');
        eq.className = 'text-white/40 text-xs';
        eq.textContent = '⇄';

        const inpB = document.createElement('input');
        inpB.type = 'number';
        inpB.step = 'any';
        inpB.value = Number(aToB(initA)).toFixed(4).replace(/\.?0+$/, '');
        inpB.className =
          'w-full min-w-0 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text';

        const lblB = document.createElement('span');
        lblB.className = 'text-[11px] font-mono text-sky-300 shrink-0';
        lblB.textContent = unitB;

        inpA.addEventListener('input', () => {
          const v = parseFloat(inpA.value);
          if (!Number.isNaN(v)) {
            inpB.value = Number(aToB(v)).toFixed(4).replace(/\.?0+$/, '');
          }
        });
        inpB.addEventListener('input', () => {
          const v = parseFloat(inpB.value);
          if (!Number.isNaN(v)) {
            inpA.value = Number(bToA(v)).toFixed(4).replace(/\.?0+$/, '');
          }
        });

        row.appendChild(inpA);
        row.appendChild(lblA);
        row.appendChild(eq);
        row.appendChild(inpB);
        row.appendChild(lblB);
        box.appendChild(row);
        return box;
      };

      contentWrap.appendChild(
        buildPairCard('Speed (Automotive)', 'km/h', 'm/s', (v) => v / 3.6, (v) => v * 3.6, 100)
      );
      contentWrap.appendChild(
        buildPairCard(
          'RF Power (Radar)',
          'dBm',
          'mW',
          (dbm) => Math.pow(10, dbm / 10),
          (mw) => (mw > 0 ? 10 * Math.log10(mw) : 0),
          10
        )
      );
      contentWrap.appendChild(
        buildPairCard(
          'Radar Wavelength (c = 299.79 mm·GHz)',
          'GHz',
          'mm',
          (ghz) => (ghz > 0 ? 299.792458 / ghz : 0),
          (mm) => (mm > 0 ? 299.792458 / mm : 0),
          77
        )
      );
      contentWrap.appendChild(
        buildPairCard('Temperature', '°C', '°F', (c) => (c * 9) / 5 + 32, (f) => ((f - 32) * 5) / 9, 25)
      );
    }
  }

  tabRadixBtn.addEventListener('click', () => {
    d.activeTab = 'radix';
    saveState();
    renderTab();
  });
  tabUnitsBtn.addEventListener('click', () => {
    d.activeTab = 'units';
    saveState();
    renderTab();
  });

  renderTab();

  cardEl.appendChild(header);
  cardEl.appendChild(tabsWrap);
  cardEl.appendChild(contentWrap);

  return header;
}
