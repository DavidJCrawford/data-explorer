/** The ledger: running counts of copies, hands and seams along the trace.
 *
 *  Plain JavaScript so the site (through TypeScript's allowJs) and
 *  scripts/verify.mjs share one implementation. verify does not trust it: it
 *  compares what this computes with the totals written by hand in the trace's
 *  tables, and a disagreement fails the build.
 *
 *  Definitions are Docs/knowledge/thesis/copies-and-hands.md:
 *  - copies: durable copies made at a hop, summed;
 *  - hands: distinct organisations that have held a copy;
 *  - seams: hops whose holders include an organisation not holding the event
 *    at the hop before.
 *  A hop the owner chose (`by_right`) is counted apart, in `chosen`.
 */

/**
 * @typedef {{ holders: string[], copies: number }} Holding
 * @typedef {{ n: number, component: string, by_right?: boolean, composite: Holding, governed: Holding }} Hop
 * @typedef {{ copies: number, hands: number, seams: number, chosenHands: number, chosenSeams: number, handList: string[] }} Totals
 */

/** Running totals after each hop, for one archetype.
 *  @param {Hop[]} hops @param {'composite'|'governed'} path @returns {Totals[]} */
export function ledger(hops, path) {
  const out = [];
  const held = new Set(), chosen = new Set();
  let copies = 0, seams = 0, chosenSeams = 0;
  let prev = /** @type {string[]} */ ([]);
  for (const hop of hops) {
    const { holders, copies: made } = hop[path];
    copies += made;
    const fresh = holders.some((h) => !prev.includes(h));
    if (hop.n > 0 && fresh) hop.by_right ? chosenSeams++ : seams++;
    if (made > 0) for (const h of holders) (hop.by_right ? chosen : held).add(h);
    out.push({ copies, hands: held.size, seams, chosenHands: chosen.size, chosenSeams, handList: [...held] });
    prev = holders;
  }
  return out;
}
