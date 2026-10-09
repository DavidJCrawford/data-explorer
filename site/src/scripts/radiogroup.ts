/** A row of buttons acting as one radio group (WAI-ARIA radio pattern): one
 *  tab stop, arrow keys move and select, Home and End jump. Used by the
 *  trace's system switch and the rulebook's jurisdiction switch. `select` is
 *  the page's own handler; this only manages focus and keys. */
export function radioGroup(buttons: HTMLButtonElement[], select: (b: HTMLButtonElement) => void): () => void {
  const sync = () => buttons.forEach((b) => (b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1));
  buttons.forEach((b, i) => b.addEventListener('keydown', (e) => {
    const n = buttons.length;
    const to = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % n
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + n) % n
      : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    buttons[to].focus();
    select(buttons[to]);
    sync();
  }));
  sync();
  return sync;
}
