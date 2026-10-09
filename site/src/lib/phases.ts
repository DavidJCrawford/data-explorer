/** When a row of the rulebook is in force. Pure, so the build's first paint
 *  (lib/rulebook-data.ts) and the scrubber (scripts/rulebook.ts) agree. */

export type Phase = { date: string; what: string };
export type State = 'future' | 'partial' | 'full';

/** A row's state on a day (ISO dates compare as strings): not yet, partly,
 *  or fully in force; the phase in force now, and the next one. A row with
 *  no dated phases is simply in force. */
export function stateOn(phases: Phase[], day: string): { state: State; now?: Phase; next?: Phase } {
  if (!phases.length) return { state: 'full' };
  const k = phases.filter((p) => p.date <= day).length;
  return { state: k === 0 ? 'future' : k < phases.length ? 'partial' : 'full', now: phases[k - 1], next: phases[k] };
}

/** "12 January 2027", from an ISO date, read in UTC. */
export const longDate = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** The line under a row's label for a day. */
export function phaseLine(phases: Phase[], day: string): string {
  const { now, next } = stateOn(phases, day);
  if (!phases.length) return 'No fixed dates';
  const parts: string[] = [];
  if (now) parts.push(`Since ${longDate(now.date)}: ${now.what}`);
  if (next) parts.push(`${now ? 'From' : 'Not yet. From'} ${longDate(next.date)}: ${next.what}`);
  return parts.join(' · ');
}
