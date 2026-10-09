/** The trace's motion (components/Trace.astro renders everything it touches).
 *
 *  State is one number, `s`: metres travelled along the event's route. Where
 *  the event is, which stop it has reached, what the ledger says and which
 *  marks are drawn all follow from `s` and the archetype, so scrubbing,
 *  switching and playing cannot disagree with each other.
 *
 *  Lessons carried over (SPEC §7, design/motion.md):
 *  - Brake into each stop at constant deceleration: the fastest the event may
 *    go with d metres left is √(2ad). Ease up from rest.
 *  - The card waits ~450 ms after arrival so the camera has settled.
 *  - requestAnimationFrame stops on hidden tabs and in some panes, so a
 *    throttled timer keeps state converging, and no transition waits on a
 *    frame: classes are set after a forced reflow.
 *  - Screen positions come from the SVG's own matrix, so letterboxing and
 *    resizing cannot put the stop names in the wrong place.
 */
import { along, type Pt } from '../lib/geometry';
import { radioGroup } from './radiogroup';

type Path = 'composite' | 'governed';
interface Totals { copies: number; hands: number; seams: number; chosenHands: number; chosenSeams: number; handList: string[] }
interface Data {
  legs: { points: Pt[]; length: number; jump: boolean; segs: { from: number; len: number; fast: boolean }[] }[];
  at: number[];
  stops: { n: number; x: number; y: number }[];
  crossLeg: number; cross: number;
  extent: { x: number; y: number; w: number; h: number };
  hops: { n: number; component: string; place: string; label: string }[];
  paths: Record<Path, { totals: Totals[]; chain: string[]; holders: string[] }>;
  owed: string[][];
  footage: { onSite: Record<Path, { holders: string[]; copies: number }>; beyond: Record<Path, { holders: string[]; copies: number; leaves_site: boolean }> };
}

const root = document.querySelector<HTMLElement>('[data-trace]');
if (root) init(root);

function init(root: HTMLElement) {
  const D: Data = JSON.parse(document.getElementById('trace-data')!.textContent!);
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const stage = $('[data-stage]');
  const svg = $<SVGSVGElement>('svg.section');
  const eventDot = $<SVGCircleElement>('[data-event]');
  const travelled = $$<SVGLineElement>('.travelled');
  const tags = $('[data-tags]');
  const tagEls = $$('[data-tag]');
  const modal = $('[data-modal]');
  const scrim = $('[data-scrim]');
  const cards = $$('[data-card]');
  const go = $<HTMLButtonElement>('[data-go]');
  const endActions = $('[data-end-actions]');
  const autoBox = $<HTMLInputElement>('[data-autoplay]');
  const timerFill = $('[data-timer-fill]');
  const playBtn = $<HTMLButtonElement>('[data-play]');
  const scrub = $('[data-scrub]');
  const fill = $('[data-progress]');
  const thumb = $('[data-thumb]');
  const readout = $('[data-readout]');
  const note = $('[data-note]');

  const last = D.hops.length - 1;
  const total = D.at[D.at.length - 1];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Pace. Metres of drawing per second; the building is about 28 m deep. ── */
  const V = 4.2;
  /** Dropping between exploded floors, or running in a duct, there is
   *  nothing to look at, so the event goes faster there. */
  const V_FAST = 14;
  const fastAt = (x: number) => {
    const i = legAt(x), into = x - D.at[i];
    return D.legs[i].segs.find((s) => into >= s.from && into <= s.from + s.len)?.fast ?? false;
  };
  const BRAKE_S = 1.3;          // full pace to rest
  const A = V / BRAKE_S;        // so the braking distance is V²/2A
  const CARD_DELAY = 450;
  const AUTOPLAY_MS = 10_000;

  /* ── State ── */
  let s = 0;                    // metres along the route
  let v = 0;                    // current speed
  let target = 0;               // the stop being travelled to, in metres
  let playing = false;
  let mode: 'card' | 'travel' | 'paused' | 'finale' = 'paused';
  let path: Path = 'composite';
  let hop = -1;                 // last stop arrived at (as drawn)
  let switched = false;
  let cardTimer = 0, autoTimer = 0, autoStart = 0;

  /* ── Where the event is ── */
  function legAt(x: number): number {
    // Arriving exactly at a stop belongs to the leg that arrives there.
    for (let i = 0; i < D.legs.length; i++) if (x <= D.at[i + 1] + 1e-6) return i;
    return D.legs.length - 1;
  }
  function position(x: number) {
    if (x <= 0) return { p: [D.stops[0].x, D.stops[0].y] as Pt, dir: [0, -1] as Pt, leg: -1, into: 0 };
    const i = legAt(x), into = x - D.at[i];
    return { ...along(D.legs[i].points, into), leg: i, into };
  }
  const stopAt = (x: number) => { let n = 0; for (let i = 0; i <= last; i++) if (x >= D.at[i] - 1e-6) n = i; return n; };

  /* ── The camera ── */
  let W = 1, H = 1;
  const cam = { x: D.stops[0].x, y: D.stops[0].y, w: 24 };
  const look: Pt = [0, -1];
  /** Working zoom: 16 units across a phone, 32 px a unit on anything wider. */
  const workingW = () => (W < 700 ? 16 : W / 32);
  function camTarget() {
    if (mode === 'finale') {
      const e = D.extent, w = Math.max(e.w, e.h * W / H) * 1.04;
      return { x: e.x + e.w / 2, y: e.y + e.h / 2, w };
    }
    const { p } = position(s);
    const w = workingW(), h = w * H / W;
    // Set the event back from the centre, against its direction of travel,
    // so most of the view is what comes next; then keep the view on the
    // drawing rather than the empty paper around it.
    const e = D.extent;
    const clamp = (c: number, half: number, lo: number, span: number) =>
      half * 2 >= span ? lo + span / 2 : Math.min(lo + span - half, Math.max(lo + half, c));
    return {
      x: clamp(p[0] + look[0] * w * 0.2, w / 2, e.x, e.w),
      y: clamp(p[1] + look[1] * h * 0.2, h / 2, e.y, e.h),
      w,
    };
  }
  function applyCamera() {
    const h = cam.w * H / W;
    svg.setAttribute('viewBox', `${cam.x - cam.w / 2} ${cam.y - h / 2} ${cam.w} ${h}`);
    eventDot.setAttribute('r', String(7 * cam.w / W));
    const ppm = W / cam.w;
    const showTags = ppm < 20;
    tags.classList.toggle('on', showTags);
    if (showTags) placeTags();
  }
  function placeTags() {
    const m = svg.getScreenCTM(), r = stage.getBoundingClientRect();
    if (!m) return;
    const pt = svg.createSVGPoint();
    D.stops.forEach((st, i) => {
      pt.x = st.x; pt.y = st.y;
      const q = pt.matrixTransform(m);
      tagEls[i].style.transform = `translate(${q.x - r.left + 10}px, ${q.y - r.top}px) translateY(-50%)`;
    });
  }
  new ResizeObserver(() => {
    const r = stage.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    const t = camTarget(); if (mode !== 'travel') Object.assign(cam, t);
    applyCamera();
  }).observe(stage);

  /* ── Drawing the state ── */
  function drawRoute() {
    const { p, leg, into } = position(s);
    // Each segment of the route is its own line: full, partial, or hidden.
    travelled.forEach((ln) => {
      const i = Number(ln.dataset.leg), k = Number(ln.dataset.seg);
      const sg = D.legs[i].segs[k];
      const x1 = Number(ln.getAttribute('x1')), y1 = Number(ln.getAttribute('y1'));
      const bx = Number(ln.dataset.x2), by = Number(ln.dataset.y2);
      const done = i < leg ? 1 : i > leg ? 0 : Math.max(0, Math.min(1, (into - sg.from) / sg.len));
      ln.setAttribute('visibility', done > 0 ? 'visible' : 'hidden');
      ln.setAttribute('x2', String(x1 + (bx - x1) * done));
      ln.setAttribute('y2', String(y1 + (by - y1) * done));
    });
    eventDot.setAttribute('cx', String(p[0]));
    eventDot.setAttribute('cy', String(p[1]));
    // A jump (the copy to the third party leaves from the cloud): fade in.
    eventDot.style.opacity = leg >= 0 && D.legs[leg].jump ? String(Math.min(1, into / 0.8)) : '1';
    // The footage crosses the property line when the event does.
    const crossed = s >= D.at[D.crossLeg - 1] + D.cross - 1e-6;
    const fs = s >= D.at[2] - 1e-6 ? (crossed ? 'beyond' : 'onsite') : 'none';
    if (root.dataset.footage !== fs) {
      const was = root.dataset.footage;
      root.dataset.footage = fs;
      $$('.footage.onsite').forEach((e) => e.classList.toggle('on', fs !== 'none'));
      $$('.footage.beyond, .footage.stays').forEach((e) => e.classList.toggle('on', fs === 'beyond'));
      if (fs === 'beyond' && was === 'onsite' && !reduced.matches) {
        const stays = $('.footage.stays'); stays.classList.remove('flash'); void (stays as unknown as HTMLElement).getBoundingClientRect(); stays.classList.add('flash');
      }
      footageLine();
    }
    const frac = s / total;
    fill.style.width = `${frac * 100}%`;
    thumb.style.left = `${frac * 100}%`;
    const n = stopAt(s);
    if (n !== hop) { hop = n; drawStop(); }
  }

  function drawStop() {
    root.dataset.hop = String(hop);
    $$('.copy, .seam').forEach((e) => e.classList.toggle('on', Number((e as HTMLElement).dataset.n) <= hop));
    const h = D.hops[hop];
    readout.textContent = `Stop ${hop} · ${h.label}`;
    scrub.setAttribute('aria-valuenow', String(hop));
    scrub.setAttribute('aria-valuetext', `Stop ${hop}, ${h.label}`);
    $('[data-where-stop]').textContent = `Stop ${hop} · ${h.place}`;
    $('[data-where-name]').textContent = (cards[hop].querySelector('.title')?.textContent ?? h.label);
    ledger();
    const owed = $('[data-owed]'); owed.replaceChildren(...(D.owed[hop].length ? D.owed[hop] : ['Nothing new at this stop.']).map((t) => li(t)));
  }

  function ledger() {
    const t = D.paths[path].totals[hop];
    $('[data-where-held]').textContent = D.paths[path].holders[hop];
    $('[data-copies]').textContent = String(t.copies);
    $('[data-hands]').textContent = String(t.hands);
    $('[data-seams]').textContent = String(t.seams);
    $('[data-copies-sub]').textContent = ' ';
    $('[data-hands-sub]').textContent = t.handList.join(' · ') + (t.chosenHands ? ` + ${t.chosenHands} chosen` : '') || ' ';
    $('[data-seams-sub]').textContent = t.chosenSeams ? `+ ${t.chosenSeams} chosen` : ' ';
    const chain = $('[data-chain]');
    chain.replaceChildren(...D.hops.slice(0, hop + 1).map((h, i) => {
      const el = document.createElement('li');
      const b = document.createElement('b'); b.textContent = h.label;
      el.append(b, ` · ${D.paths[path].chain[i]}`);
      return el;
    }));
    footageLine();
  }

  function footageLine() {
    const fs = root.dataset.footage ?? 'none';
    const f = fs === 'beyond' ? D.footage.beyond[path] : D.footage.onSite[path];
    const where = fs === 'beyond' ? (f.holders.length && (f as { leaves_site?: boolean }).leaves_site ? 'has left the site' : 'stays on site') : 'on site';
    const who = f.holders.length ? `${f.holders.length} ${f.holders.length === 1 ? 'company' : 'companies'}` : 'held by the owner';
    $('[data-footage]').textContent = fs === 'none' ? 'Not recorded yet.' : `${f.copies} ${f.copies === 1 ? 'copy' : 'copies'} · ${who} · ${where}`;
  }

  const li = (t: string) => { const e = document.createElement('li'); e.textContent = t; return e; };

  /* ── Cards ── */
  function showCard(n: number | 'end') {
    clearTimeout(cardTimer); clearAuto();
    cards.forEach((c) => (c.hidden = c.dataset.card !== String(n)));
    modal.setAttribute('aria-labelledby', `card-title-${n}`);
    const isEnd = n === 'end';
    endActions.hidden = !isEnd;
    go.hidden = isEnd;
    go.textContent = n === 0 ? 'Follow it →' : n === last ? 'See the whole path →' : 'Continue →';
    modal.querySelector('.modal-scroll')!.scrollTop = 0;
    // Classes after a forced reflow, never on the next frame (rAF can be frozen).
    void modal.offsetWidth;
    modal.inert = false;
    modal.classList.add('on'); scrim.classList.add('on');
    modal.setAttribute('aria-hidden', 'false');
    (isEnd ? (endActions.querySelector('a, button') as HTMLElement | null) : go)?.focus({ preventScroll: true });
    if (!isEnd && autoBox.checked) startAuto();
  }
  function hideCard() {
    clearTimeout(cardTimer); clearAuto();
    // A closed card must not take keyboard focus while invisible; if focus
    // was inside it, hand it to the play button rather than lose it.
    const had = modal.contains(document.activeElement);
    modal.classList.remove('on'); scrim.classList.remove('on');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    if (had) playBtn.focus({ preventScroll: true });
  }
  const cardOpen = () => modal.classList.contains('on');

  function startAuto() {
    autoStart = performance.now();
    autoTimer = window.setTimeout(next, AUTOPLAY_MS);
  }
  function clearAuto() { clearTimeout(autoTimer); autoTimer = 0; timerFill.style.width = '0'; }

  /* ── Moving ── */
  function travelTo(n: number) {
    hideCard();
    target = D.at[n];
    mode = 'travel'; playing = true; setPlay();
    if (reduced.matches) { s = target; arrive(); }
  }
  function next() {
    if (mode === 'finale') return;
    const n = stopAt(s);
    if (n >= last) return finale();
    travelTo(n + 1);
  }
  function arrive() {
    v = 0; mode = 'card'; playing = false; setPlay();
    drawRoute();
    const n = stopAt(s);
    history.replaceState(null, '', `?hop=${n}&path=${path}`);
    cardTimer = window.setTimeout(() => showCard(n), reduced.matches ? 0 : CARD_DELAY);
  }
  function finale() {
    hideCard();
    mode = 'finale'; playing = false; setPlay();
    cardTimer = window.setTimeout(() => showCard('end'), reduced.matches ? 0 : 1400);
  }
  function setPlay() {
    playBtn.textContent = playing ? '❚❚' : '▶';
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }

  function step(dt: number) {
    if (mode === 'travel' && playing) {
      const d = target - s;
      const brake = Math.sqrt(2 * A * Math.max(0, d));
      const cruise = s > 0 && fastAt(s) ? V_FAST : V;
      // Slow down on leaving the duct as smoothly as on arriving at a stop.
      v = Math.min(v + A * dt, Math.max(cruise, v - A * dt), brake);
      s = Math.min(target, s + Math.max(v, 0.05) * dt);
      const { dir } = position(s);
      // Ease the heading so the camera does not snap at each corner.
      const k = 1 - Math.exp(-dt / 0.6);
      look[0] += (dir[0] - look[0]) * k; look[1] += (dir[1] - look[1]) * k;
      drawRoute();
      if (target - s < 1e-4) arrive();
    }
    // The camera converges on its target whatever the mode.
    const t = camTarget();
    const a = reduced.matches ? 1 : 1 - Math.exp(-dt / 0.45);
    cam.x += (t.x - cam.x) * a; cam.y += (t.y - cam.y) * a;
    cam.w = Math.exp(Math.log(cam.w) + (Math.log(t.w) - Math.log(cam.w)) * a);
    applyCamera();
    if (autoTimer) timerFill.style.width = `${Math.min(100, (performance.now() - autoStart) / AUTOPLAY_MS * 100)}%`;
  }

  /* One loop on rAF, and a slow timer that takes over when frames stop. */
  let lastT = performance.now(), lastFrame = lastT;
  const frame = (now: number) => { step(Math.min(0.1, (now - lastT) / 1000)); lastT = now; lastFrame = now; requestAnimationFrame(frame); };
  requestAnimationFrame(frame);
  setInterval(() => {
    const now = performance.now();
    if (now - lastFrame > 300) { step(Math.min(0.25, (now - lastT) / 1000)); lastT = now; }
  }, 200);

  /* ── Controls ── */
  go.addEventListener('click', next);
  $('[data-again]').addEventListener('click', () => { mode = 'paused'; s = 0; v = 0; look[0] = 0; look[1] = -1; drawRoute(); hideCard(); showCard(0); mode = 'card'; });
  playBtn.addEventListener('click', () => {
    if (mode === 'finale') return;
    if (playing) { playing = false; mode = 'paused'; setPlay(); return; }
    if (cardOpen() || mode === 'card') return next();
    // Resume towards the next stop from wherever the scrubber left it.
    const n = stopAt(s);
    if (s < D.at[n] + 1e-6 && n < last) travelTo(n + 1);
    else if (n < last) { target = D.at[n + 1]; mode = 'travel'; playing = true; setPlay(); }
    else finale();
  });
  autoBox.addEventListener('change', () => {
    try { localStorage.setItem('trace-autoplay', autoBox.checked ? '1' : '0'); } catch { /* storage may be unavailable */ }
    if (autoBox.checked && cardOpen() && !go.hidden) startAuto(); else clearAuto();
  });
  try { autoBox.checked = localStorage.getItem('trace-autoplay') === '1'; } catch { /* ignore */ }

  // The scrubber: drag anywhere along it; arrow keys step stop to stop.
  const fromPointer = (e: PointerEvent) => {
    const r = scrub.getBoundingClientRect();
    s = Math.min(total, Math.max(0, (e.clientX - r.left) / r.width * total));
    const { dir } = position(s); look[0] = dir[0]; look[1] = dir[1];
    drawRoute();
  };
  scrub.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary) return;
    scrub.setPointerCapture(e.pointerId);
    hideCard(); playing = false; mode = 'paused'; setPlay(); fromPointer(e);
  });
  scrub.addEventListener('pointermove', (e) => { if (e.isPrimary && scrub.hasPointerCapture(e.pointerId)) fromPointer(e); });
  scrub.addEventListener('keydown', (e) => {
    const n = stopAt(s);
    const goStop = (m: number) => { e.preventDefault(); hideCard(); s = D.at[m]; v = 0; drawRoute(); arrive(); };
    if (e.key === 'ArrowRight' && n < last) goStop(s > D.at[n] + 1e-6 ? n + 1 : n + 1);
    else if (e.key === 'ArrowLeft') goStop(s > D.at[n] + 1e-6 ? n : Math.max(0, n - 1));
    else if (e.key === 'Home') goStop(0);
    else if (e.key === 'End') goStop(last);
  });

  // The archetype switch: same stop, the other system.
  const switchBtns = $$<HTMLButtonElement>('[data-set-path]');
  function setPath(p: Path) {
    path = p; root.dataset.path = p;
    switchBtns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.setPath === p)));
    if (hop < 0) return;          // before the first stop is drawn (from the URL)
    ledger();
    if (!switched && hop > 0) { switched = true; note.hidden = false; }
    history.replaceState(null, '', `?hop=${hop}&path=${p}`);
  }
  const syncSwitch = radioGroup(switchBtns, (b) => setPath(b.dataset.setPath as Path));
  switchBtns.forEach((b) => b.addEventListener('click', () => { setPath(b.dataset.setPath as Path); syncSwitch(); }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cardOpen() && mode !== 'finale') { hideCard(); mode = 'paused'; }
  });

  /* ── Start: from the URL if it names a stop, else at the door. ── */
  const q = new URLSearchParams(location.search);
  if (q.get('path') === 'governed') { setPath('governed'); syncSwitch(); }
  const start = Math.min(last, Math.max(0, Number(q.get('hop')) || 0));
  s = D.at[start];
  // Look along the leg about to be travelled (or the one just arrived by).
  { const { dir } = start > 0 ? position(s) : along(D.legs[0].points, 3); look[0] = dir[0]; look[1] = dir[1]; }
  drawRoute(); drawStop();
  Object.assign(cam, camTarget()); applyCamera();
  mode = 'card';
  cardTimer = window.setTimeout(() => showCard(start), reduced.matches ? 0 : 300);
}
