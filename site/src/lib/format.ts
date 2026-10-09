/** How numbers and dates are written in prose (Docs/knowledge/policies/editorial-voice.md). */

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

/** Small counts as words in running text ("four organisations"); figures
 *  past ten, and every figure in a stat or a table, as numerals. */
export const words = (n: number): string => WORDS[n] ?? String(n);

/** "12 January 2027". Dates are calendar days, so read them in UTC; in local
 *  time west of Greenwich a midnight-UTC date prints as the day before. */
export const day = (d: Date): string =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** "September 2025". */
export const month = (d: Date): string =>
  d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/** "once", "twice", "four times". */
export const times = (n: number): string => (n === 1 ? 'once' : n === 2 ? 'twice' : `${words(n)} times`);

/** "Three", for the start of a sentence. */
export const Words = (n: number): string => words(n)[0].toUpperCase() + words(n).slice(1);
