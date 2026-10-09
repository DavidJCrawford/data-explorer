/** The mark: a circle split at the property line.
 *
 *  The left of the circle is the customer's own domain (patina), the right is
 *  everywhere the data goes after it leaves the building (the instrument's
 *  grey), and the split falls where the trace's hops cross the property line:
 *  three hops inside, three beyond, so half and half. If the trace changes, so
 *  does the mark. Like the siblings' marks, it is the data, not a picture.
 *
 *  Hex rather than OKLCH because the PNG icons are drawn pixel by pixel
 *  (lib/icon-png.ts). Approximations of --ks-patina and --ks-instrument-raised.
 */
import { trace } from './knowledge';

export interface Stop { at: number; colour: string }

const INSIDE = '#3aafa9';
const BEYOND = '#3d3d3d';

export async function logoStops(): Promise<Stop[]> {
  const hops = (await trace()).hops;
  const line = hops.findIndex((h) => h.crosses_property_line) / hops.length;
  return [
    { at: 0, colour: INSIDE }, { at: line, colour: INSIDE },
    { at: line, colour: BEYOND }, { at: 1, colour: BEYOND },
  ];
}

/** The circle as a standalone SVG document, for the favicon. */
export async function logoSvg(): Promise<string> {
  const stops = (await logoStops()).map((s) => `<stop offset="${s.at.toFixed(4)}" stop-color="${s.colour}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`
    + `<defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">${stops}</linearGradient></defs>`
    + `<circle cx="32" cy="32" r="32" fill="url(#g)"/></svg>`;
}
