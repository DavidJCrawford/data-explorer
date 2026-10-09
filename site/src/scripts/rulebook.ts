/** The rulebook's behaviour (components/Rulebook.astro renders everything).
 *
 *  State is three things: the jurisdiction, the day, and the selected row.
 *  All three live in the URL (`?j=uk&at=2027-01-12&sel=leave`), so any view
 *  can be linked to, and the trace's cards link straight to a right.
 *  Moving the date is the rulebook's one piece of content motion: the law
 *  arriving, row by row. Nothing animates on its own.
 */
import { stateOn, phaseLine, longDate, type Phase } from '../lib/phases';
import { radioGroup } from './radiogroup';

interface Data {
  range: { from: string; to: string };
  dates: string[];
  views: { id: string; rows: { key: string; phases: Phase[] }[] }[];
}

const root = document.querySelector<HTMLElement>('[data-rulebook]');
if (root) init(root);

function init(root: HTMLElement) {
  const D: Data = JSON.parse(document.getElementById('rulebook-data')!.textContent!);
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const slider = $<HTMLInputElement>('[data-date]');
  const readout = $('[data-readout]');
  const drawer = $('[data-drawer]');
  const t0 = Date.parse(D.range.from), t1 = Date.parse(D.range.to);
  const toDay = (f: number) => new Date(t0 + f * (t1 - t0)).toISOString().slice(0, 10);
  const toFrac = (iso: string) => (Date.parse(iso) - t0) / (t1 - t0);
  const clampDay = (iso: string) => (iso < D.range.from ? D.range.from : iso > D.range.to ? D.range.to : iso);
  const today = clampDay(new Date().toISOString().slice(0, 10));
  const names: Record<string, string> = Object.fromEntries($$('[data-set-j]').map((b) => [b.dataset.setJ!, b.textContent!]));
  const fullName = (j: string) => ({ eu: 'European Union', uk: 'United Kingdom', nz: 'New Zealand', au: 'Australia', us: 'United States' } as Record<string, string>)[j] ?? names[j];

  let j = D.views[0].id;
  let day = today;
  let sel = '';
  let chosen = false;            // only a row the reader picked goes in the URL

  function render() {
    root.dataset.j = j;
    $$('[data-view]').forEach((v) => (v.hidden = v.dataset.view !== j));
    $$('[data-set-j]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.setJ === j)));
    const view = D.views.find((v) => v.id === j)!;
    const rowsEl = $(`[data-view="${j}"]`);
    for (const r of view.rows) {
      const el = rowsEl.querySelector<HTMLElement>(`[data-row="${r.key}"]`);
      if (!el || el.classList.contains('absent')) continue;
      el.dataset.state = stateOn(r.phases, day).state;
      const when = el.querySelector('[data-when]');
      if (when) when.textContent = phaseLine(r.phases, day);
      // Keep the words a screen reader hears in step with the colours.
      const said = el.querySelector<HTMLElement>('[data-said]');
      if (said) said.textContent = said.textContent!.replace(/^[^,]+/, ({ full: 'In force', partial: 'Partly in force', future: 'Not yet in force' } as Record<string, string>)[el.dataset.state]);
    }
    slider.value = String(toFrac(day));
    slider.setAttribute('aria-valuetext', longDate(day));
    readout.textContent = `${fullName(j)} · ${longDate(day)}${day === today ? ' (today)' : ''}`;
    select(sel && view.rows.some((r) => r.key === sel) ? sel : view.rows[0].key, false);
    const q = new URLSearchParams();
    if (j !== D.views[0].id) q.set('j', j);
    if (day !== today) q.set('at', day);
    if (chosen && sel) q.set('sel', sel);
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
  }

  function select(key: string, open = true) {
    sel = key;
    $$('[data-row]').forEach((r) => r.setAttribute('aria-current', String(r.dataset.row === key && r.closest('[data-view]')?.getAttribute('data-view') === j)));
    $$('[data-detail]').forEach((d) => (d.hidden = d.dataset.detail !== `${j}:${key}`));
    if (open) {
      drawer.classList.add('open');
      drawer.scrollTop = 0;
    }
    inertDrawer();
  }

  /* On a phone the drawer is a sheet off the bottom of the screen when
     closed; it must not take keyboard focus there. */
  const phone = matchMedia('(max-width: 760px)');
  function inertDrawer() { drawer.inert = phone.matches && !drawer.classList.contains('open'); }
  phone.addEventListener('change', inertDrawer);

  /* ── Controls ── */
  const jBtns = $$<HTMLButtonElement>('[data-set-j]');
  const syncJ = radioGroup(jBtns, (b) => { j = b.dataset.setJ!; render(); });
  jBtns.forEach((b) => b.addEventListener('click', () => { j = b.dataset.setJ!; render(); syncJ(); }));
  slider.addEventListener('input', () => {
    // Snap to a date something comes into force when close to one, so the
    // milestones are easy to land on by hand.
    let d = toDay(Number(slider.value));
    const near = D.dates.find((x) => Math.abs(toFrac(x) - Number(slider.value)) < 0.006);
    if (near) d = near;
    day = d; render();
  });
  slider.addEventListener('keydown', (e) => {
    // Arrow keys step from one date things change to the next.
    const ds = [D.range.from, ...D.dates.filter((x) => x > D.range.from && x < D.range.to), D.range.to];
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); day = ds.find((x) => x > day) ?? day; render(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); day = [...ds].reverse().find((x) => x < day) ?? day; render(); }
  });
  $('[data-today]').addEventListener('click', () => { day = today; render(); });
  $$('[data-row]').forEach((r) => r.addEventListener('click', () => { chosen = true; select(r.dataset.row!); render(); }));
  const closeDrawer = () => {
    const row = root.querySelector<HTMLElement>(`[data-view="${j}"] [data-row="${sel}"]`);
    drawer.classList.remove('open'); inertDrawer();
    if (phone.matches) row?.focus({ preventScroll: true });
  };
  $('[data-close]').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer(); });

  /* ── Start from the URL ── */
  const q = new URLSearchParams(location.search);
  const qj = q.get('j');
  if (qj && D.views.some((v) => v.id === qj)) j = qj;
  const at = q.get('at');
  if (at && /^\d{4}-\d{2}-\d{2}$/.test(at)) day = clampDay(at);
  sel = q.get('sel') ?? '';
  chosen = !!sel;
  render();
  syncJ();
  // A link that names a row opens its detail, on a phone as well.
  if (q.get('sel')) select(sel);
}
