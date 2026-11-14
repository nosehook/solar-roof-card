/*
 * solar-roof-card - Home Assistant Lovelace card
 * Shows each panel (micro-inverter) on a roof map: W per panel, fill from the
 * bottom = % of panel max. Top-left block: total power, % of max and the
 * optimum moment (or optimum window) based on roof pitch + compass bearing.
 *
 * Layout (default): top row 2 panels landscape, right-aligned;
 *                   below 3 rows of 4 panels portrait.
 * Panel order in `panels`: top row left->right, then each row left->right.
 */
const PANEL_IMG = "data:image/jpeg;base64,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";
const VERSION = "0.1.0";

const RAD = Math.PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588, J2000 = 2451545, OBL = RAD * 23.4397;

// --- sun position (SunCalc formulas, azimuth converted to compass: 0 = N, 90 = E) ---
function sunPos(date, lat, lon) {
  const d = date.valueOf() / DAY_MS - 0.5 + J1970 - J2000;
  const M = RAD * (357.5291 + 0.98560028 * d);
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + RAD * 102.9372 + Math.PI;
  const dec = Math.asin(Math.sin(L) * Math.sin(OBL));
  const ra = Math.atan2(Math.sin(L) * Math.cos(OBL), Math.cos(L));
  const lw = RAD * -lon, phi = RAD * lat;
  const H = RAD * (280.16 + 360.9856235 * d) - lw - ra;
  const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
  const azS = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
  return { el: alt / RAD, az: (azS / RAD + 180 + 360) % 360 };
}

// cos of angle between panel normal and sun vector, 0..1 (0 when sun below horizon/behind roof)
function alignment(sun, pitch, bearing) {
  if (sun.el <= 0) return 0;
  const nEl = (90 - pitch) * RAD, nAz = bearing * RAD;
  const sEl = sun.el * RAD, sAz = sun.az * RAD;
  const dot =
    Math.cos(nEl) * Math.cos(sEl) * Math.cos(nAz - sAz) + Math.sin(nEl) * Math.sin(sEl);
  return Math.max(0, dot);
}

class SolarRoofCard extends HTMLElement {
  static getStubConfig(hass) {
    const panels = Object.keys(hass.states)
      .filter((e) => /^sensor\.inverter_\d+$/.test(e))
      .slice(0, 14);
    return { panels, roof_pitch: 35, azimuth: 180, panel_max: 300 };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "panels", required: true, selector: { entity: { multiple: true, domain: "sensor" } } },
        { name: "total_entity", selector: { entity: { domain: "sensor" } } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "roof_pitch", selector: { number: { min: 0, max: 90, step: 1, unit_of_measurement: "\u00b0", mode: "box" } } },
            { name: "azimuth", selector: { number: { min: 0, max: 359, step: 1, unit_of_measurement: "\u00b0", mode: "box" } } },
            { name: "optimal_window", selector: { number: { min: 0, max: 600, step: 15, unit_of_measurement: "min", mode: "box" } } },
            { name: "panel_max", selector: { number: { min: 1, max: 1000, step: 1, unit_of_measurement: "W", mode: "box" } } },
            { name: "max_power", selector: { number: { min: 0, max: 50000, step: 10, unit_of_measurement: "W", mode: "box" } } },
          ],
        },
        { name: "top_row", selector: { number: { min: 0, max: 6, step: 1, mode: "box" } } },
        { name: "columns", selector: { number: { min: 1, max: 8, step: 1, mode: "box" } } },
        { name: "show_timeline", selector: { boolean: {} } },
      ],
      computeLabel: (s) =>
        ({
          title: "Titel",
          panels: "Panelen (boven links \u2192 onder rechts)",
          total_entity: "Totaal vermogen (optioneel, anders som)",
          roof_pitch: "Dakhoek t.o.v. horizon",
          azimuth: "Kompaskoers panelen",
          optimal_window: "Optimaal venster (leeg = alleen tijdstip)",
          panel_max: "Max per paneel",
          max_power: "Max totaal (leeg = panelen \u00d7 max)",
          top_row: "Panelen bovenste rij (landscape)",
          columns: "Panelen per rij (portrait)",
          show_timeline: "Dagverloop tonen",
        })[s.name] || s.name,
    };
  }

  setConfig(config) {
    if (!config.panels || !config.panels.length) throw new Error("Geef 'panels' op (lijst met vermogenssensoren)");
    this._config = {
      roof_pitch: 35,
      azimuth: 180,
      panel_max: 300,
      top_row: 2,
      columns: 4,
      show_timeline: true,
      ...config,
    };
    this._day = null;
    this._built = false;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 7;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" };
  }

  // ---------- geometry ----------
  _layout() {
    const c = this._config;
    const n = c.panels.length;
    const cols = c.columns;
    const top = Math.min(c.top_row, n);
    const rows = Math.ceil((n - top) / cols);
    const r = 292 / 180; // panel aspect (h / w)
    const g = 0.07; // gap in panel widths
    const W = cols + (cols - 1) * g;
    const topH = top ? 1 : 0;
    const H = topH + (top ? g : 0) + rows * r + (rows - 1) * g;
    const items = [];
    // top row, landscape, right-aligned
    for (let i = 0; i < top; i++) {
      const x = W - (top - i) * r - (top - 1 - i) * g;
      items.push({ x, y: 0, w: r, h: 1, land: true });
    }
    const y0 = top ? 1 + g : 0;
    for (let i = 0; i < n - top; i++) {
      const row = Math.floor(i / cols), col = i % cols;
      items.push({ x: col * (1 + g), y: y0 + row * (r + g), w: 1, h: r, land: false });
    }
    const freeW = top ? W - top * r - (top - 1) * g - g : 0;
    return { items, W, H, freeW, topH };
  }

  // ---------- sun / optimum ----------
  _computeDay() {
    const c = this._config, hass = this._hass;
    const lat = c.latitude ?? hass.config.latitude;
    const lon = c.longitude ?? hass.config.longitude;
    const now = new Date();
    const key = `${now.toDateString()}|${c.roof_pitch}|${c.azimuth}|${c.optimal_window}`;
    if (this._day && this._day.key === key) return this._day;
    const start = new Date(now); start.setHours(0, 0, 0, 0);
    const step = 2; // minutes
    const pts = [];
    for (let m = 0; m <= 1440; m += step) {
      const t = new Date(start.getTime() + m * 60000);
      const s = sunPos(t, lat, lon);
      pts.push({ t, el: s.el, a: alignment(s, c.roof_pitch, c.azimuth) });
    }
    let best = 0;
    pts.forEach((p, i) => { if (p.a > pts[best].a) best = i; });
    let win = null;
    const wMin = Number(c.optimal_window) || 0;
    if (wMin > 0) {
      const k = Math.max(1, Math.round(wMin / step));
      let sum = 0, bestSum = -1, bestI = 0;
      for (let i = 0; i < pts.length; i++) {
        sum += pts[i].a;
        if (i >= k) sum -= pts[i - k].a;
        if (i >= k - 1 && sum > bestSum) { bestSum = sum; bestI = i - k + 1; }
      }
      win = { start: pts[bestI].t, end: new Date(pts[bestI].t.getTime() + wMin * 60000), avg: bestSum / k };
    }
    const up = pts.filter((p) => p.el > 0);
    this._day = {
      key, pts, opt: pts[best], win,
      rise: up.length ? up[0].t : null,
      set: up.length ? up[up.length - 1].t : null,
    };
    return this._day;
  }

  _fmtTime(d) {
    return d.toLocaleTimeString(this._hass.locale?.language || "nl-NL", {
      hour: "2-digit", minute: "2-digit", timeZone: this._hass.config.time_zone,
    });
  }
  _fmtNum(v, dec) {
    return Number(v).toLocaleString(this._hass.locale?.language || "nl-NL", {
      minimumFractionDigits: dec, maximumFractionDigits: dec,
    });
  }

  _watts(id) {
    const s = this._hass.states[id];
    if (!s) return null;
    const v = parseFloat(s.state);
    if (isNaN(v)) return null;
    const u = (s.attributes.unit_of_measurement || "W").toLowerCase();
    return u === "kw" ? v * 1000 : u === "mw" ? v * 1e6 : v;
  }

  // ---------- render ----------
  _build() {
    const c = this._config;
    const L = this._layout();
    this._L = L;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    const pct = (v, t) => (100 * v) / t + "%";
    const panels = L.items
      .map((p, i) => `
      <div class="panel ${p.land ? "land" : ""}" data-i="${i}"
           style="left:${pct(p.x, L.W)};top:${pct(p.y, L.H)};width:${pct(p.w, L.W)};height:${pct(p.h, L.H)}">
        <div class="img"></div>
        <div class="fill"></div>
        <div class="txt"><span class="w">\u2013</span><span class="p"></span></div>
      </div>`)
      .join("");
    const info = L.topH
      ? `<div class="info" style="left:0;top:0;width:${pct(L.freeW, L.W)};height:${pct(1, L.H)}">
           <div class="tot">\u2013</div>
           <div class="pmax">\u2013</div>
           <div class="opt"><span class="sun">\u2600</span> <span class="ol">optimum</span><span class="ot">\u2013</span></div>
         </div>`
      : "";
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; }
        ha-card { display:block; padding: 16px; overflow:hidden; box-sizing:border-box; }
        .title { font-size: 1.2em; font-weight: 500; margin: 0 0 12px; }
        .roof { position:relative; width:100%; aspect-ratio:${L.W} / ${L.H}; container-type: inline-size; }
        .panel { position:absolute; border-radius: 3px; overflow:hidden; cursor:pointer;
                 box-shadow: 0 1px 3px rgba(0,0,0,.35); background:#111; }
        .img { position:absolute; inset:0; background:url(${PANEL_IMG}) center/100% 100% no-repeat; }
        .land .img { inset:auto; left:50%; top:50%; width:${(100 / (292 / 180)).toFixed(3)}%;
                     height:${(100 * (292 / 180)).toFixed(3)}%; transform:translate(-50%,-50%) rotate(90deg); }
        .fill { position:absolute; left:0; right:0; bottom:0; height:0%;
                background: linear-gradient(to top, rgba(255,152,0,.62), rgba(255,193,7,.42));
                border-top: 2px solid rgba(255,214,90,.95);
                transition: height .8s ease; mix-blend-mode: normal; }
        .panel.zero .fill { border-top-color: transparent; }
        .panel.off { filter: grayscale(1) brightness(.6); }
        .txt { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center;
               justify-content:center; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,.9); line-height:1.1; }
        .w { font-weight:700; font-size: 4.2cqw; }
        .p { font-size: 2.6cqw; opacity:.9; }
        .info { position:absolute; display:flex; flex-direction:column; justify-content:center;
                gap: .6cqw; color: var(--primary-text-color); }
        .tot { font-size: 4.6cqw; font-weight:700; line-height:1; white-space:nowrap; }
        .pmax { font-size: 2.5cqw; color: var(--secondary-text-color); white-space:nowrap; }
        .opt { font-size: 2.5cqw; white-space:nowrap; color: var(--secondary-text-color); margin-top:.6cqw; }
        .ot { display:block; font-size: 2.9cqw; font-weight:600; color: var(--primary-text-color); }
        .opt.now .ot { color: var(--warning-color, #ff9800); }
                .sun { color: #ffb300; }
        .tl { margin-top: 14px; }
        .tl svg { width:100%; height:auto; display:block; overflow:visible; }
        .tl text { font-size: 10px; fill: var(--secondary-text-color); }
        .legend { display:flex; justify-content:space-between; font-size:12px; color:var(--secondary-text-color); margin-top:4px; }
      </style>
      <ha-card>
        ${c.title ? `<div class="title">${c.title}</div>` : ""}
        <div class="roof">${info}${panels}</div>
        ${c.show_timeline ? `<div class="tl"></div><div class="legend"><span class="l1"></span><span class="l2"></span></div>` : ""}
      </ha-card>`;
    this.shadowRoot.querySelectorAll(".panel").forEach((el) =>
      el.addEventListener("click", () => {
        const id = c.panels[+el.dataset.i];
        const ev = new Event("hass-more-info", { bubbles: true, composed: true });
        ev.detail = { entityId: id };
        this.dispatchEvent(ev);
      })
    );
    this._built = true;
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._built) this._build();
    const c = this._config, root = this.shadowRoot;
    const max = c.panel_max;

    let sum = 0;
    root.querySelectorAll(".panel").forEach((el) => {
      const w = this._watts(c.panels[+el.dataset.i]);
      const off = w === null;
      const p = off ? 0 : Math.max(0, Math.min(100, (100 * w) / max));
      if (!off) sum += w;
      el.classList.toggle("off", off);
      el.classList.toggle("zero", p === 0);
      el.querySelector(".fill").style.height = p + "%";
      el.querySelector(".w").textContent = off ? "n/b" : `${Math.round(w)} W`;
      el.querySelector(".p").textContent = off ? "" : `${Math.round(p)}%`;
    });

    const total = c.total_entity ? this._watts(c.total_entity) ?? sum : sum;
    const maxTot = Number(c.max_power) || max * c.panels.length;
    const day = this._computeDay();
    const now = new Date();
    const lat = c.latitude ?? this._hass.config.latitude;
    const lon = c.longitude ?? this._hass.config.longitude;
    const aNow = alignment(sunPos(now, lat, lon), c.roof_pitch, c.azimuth);

    const info = root.querySelector(".info");
    if (info) {
      info.querySelector(".tot").textContent =
        total >= 1000 ? `${this._fmtNum(total / 1000, 2)} kW` : `${Math.round(total)} W`;
      info.querySelector(".pmax").textContent = `${Math.round((100 * total) / maxTot)}% van max`;
      const ot = info.querySelector(".ot"), opt = info.querySelector(".opt");
      let inNow = false;
      if (day.win) {
        ot.textContent = `${this._fmtTime(day.win.start)}\u2013${this._fmtTime(day.win.end)}`;
        inNow = now >= day.win.start && now <= day.win.end;
      } else if (day.opt.a > 0) {
        ot.textContent = this._fmtTime(day.opt.t);
        inNow = Math.abs(now - day.opt.t) < 15 * 60000;
      } else ot.textContent = "\u2013";
      opt.classList.toggle("now", inNow);
      info.querySelector(".ol").textContent = inNow ? "nu optimaal" : day.win ? "beste venster" : "optimum";
      opt.title = `Optimum ${this._fmtTime(day.opt.t)} \u00b7 ${Math.round(day.opt.a * 100)}% uitlijning`;
    }

    if (c.show_timeline) this._timeline(day, now, aNow);
  }

  _timeline(day, now, aNow) {
    const root = this.shadowRoot;
    const tl = root.querySelector(".tl");
    if (!tl || !day.rise) { if (tl) tl.innerHTML = ""; return; }
    const W = 400, H = 56, pad = 2;
    const t0 = day.rise.getTime() - 20 * 60000, t1 = day.set.getTime() + 20 * 60000;
    const X = (t) => pad + ((t - t0) / (t1 - t0)) * (W - 2 * pad);
    const Y = (a) => H - 4 - a * (H - 10);
    const pts = day.pts.filter((p) => p.t >= t0 && p.t <= t1);
    const line = pts.map((p, i) => `${i ? "L" : "M"}${X(p.t).toFixed(1)},${Y(p.a).toFixed(1)}`).join("");
    const area = `${line}L${X(pts[pts.length - 1].t).toFixed(1)},${Y(0)}L${X(pts[0].t).toFixed(1)},${Y(0)}Z`;
    let band = "";
    if (day.win)
      band = `<rect x="${X(day.win.start)}" y="0" width="${X(day.win.end) - X(day.win.start)}" height="${H - 4}"
                fill="#ffb300" opacity=".16" rx="3"/>`;
    const ox = X(day.opt.t);
    const nx = now >= t0 && now <= t1 ? X(now) : null;
    tl.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${band}
        <line x1="0" x2="${W}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--divider-color,#555)" stroke-width="1"/>
        <path d="${area}" fill="#ffb300" opacity=".18"/>
        <path d="${line}" fill="none" stroke="#ffb300" stroke-width="1.6"/>
        <line x1="${ox}" x2="${ox}" y1="${Y(day.opt.a)}" y2="${Y(0)}" stroke="#ffb300" stroke-dasharray="2 2"/>
        ${nx !== null ? `<line x1="${nx}" x2="${nx}" y1="2" y2="${Y(0)}" stroke="var(--primary-color,#03a9f4)" stroke-width="1"/>
          <circle cx="${nx}" cy="${Y(aNow)}" r="3.2" fill="var(--primary-color,#03a9f4)" stroke="#fff" stroke-width="1"/>` : ""}
      </svg>`;
    root.querySelector(".l1").textContent = `\u2191 ${this._fmtTime(day.rise)}   \u2600 nu ${Math.round(aNow * 100)}% uitgelijnd`;
    root.querySelector(".l2").textContent = `optimum ${this._fmtTime(day.opt.t)} (${Math.round(day.opt.a * 100)}%)   \u2193 ${this._fmtTime(day.set)}`;
  }
}

customElements.define("solar-roof-card", SolarRoofCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "solar-roof-card",
  name: "Solar Roof Card",
  description: "Dakkaart met vermogen per paneel, vulling t.o.v. max en optimum o.b.v. dakhoek en kompaskoers.",
  preview: true,
});
console.info(`%c SOLAR-ROOF-CARD %c ${VERSION} `, "background:#ffb300;color:#000", "background:#333;color:#fff");
