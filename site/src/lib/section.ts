/** The drawing: an exploded isometric of the office, its floors pulled apart,
 *  and the lots its data travels to. Docs/knowledge/design/the-section-drawing.md
 *  is the brief; the references were an exploded floor-by-floor axonometric
 *  and a circulation diagram with bold routes and dotted drops between floors.
 *
 *  The model is 3D, in metres: x along the street (the office first, then
 *  the data centre, the AI data centre and the third party), y into the
 *  depth of each building, z up. Floors are exploded: the office's levels
 *  are drawn 13 m apart rather than 3.6, so each plate can be read on its
 *  own. Below ground the lots are pulled down the same way and the buried
 *  ducts run beneath them. Nothing here is at true height; plan dimensions
 *  are.
 *
 *  `iso` projects a model point to the drawing's 2D units (still metres,
 *  y down), once, at build time. Everything downstream (the trace's legs,
 *  the camera, the copy marks) works in those 2D units, as before.
 */

export type P3 = [number, number, number];
export type P2 = [number, number];

const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
/** Isometric projection: x runs down-right, y down-left, z up. */
export const iso = ([x, y, z]: P3): P2 => [(x - y) * C, (x + y) * S - z];

/* ── The office ───────────────────────────────────────────────────────── */

export const OFFICE = { x0: 0, x1: 24, y0: 0, y1: 14 };
/** Plate (slab) thickness, and the height walls are cut at so rooms read. */
export const PLATE = 0.45;
export const WALL = 1.1;
/** Where each floor's plate sits in the exploded drawing. */
export const LEVELS = [
  { name: 'Ground', note: 'Entrance', z: 0 },
  { name: 'Level 1', note: 'Offices', z: 13 },
  { name: 'Level 2', note: 'Comms room', z: 26 },
];
/** Height of a route above its plate, so it reads as on the floor. */
const H = 0.3;

/** Walls on each floor, as segments in plan: [x0, y0, x1, y1]. The outer
 *  walls leave the front door open on the ground floor. */
export type Seg = [number, number, number, number];
const outer = (door = false): Seg[] => [
  [0, 0, 24, 0], [24, 0, 24, 14], [0, 0, 0, 14],
  ...(door ? [[0, 14, 3.2, 14], [5.2, 14, 24, 14]] as Seg[] : [[0, 14, 24, 14]] as Seg[]),
];
/** The riser cupboard, on every floor. */
export const RISER = { x0: 16, x1: 17.6, y0: 5, y1: 7.2 };
const riser: Seg[] = [[16, 5, 17.6, 5], [17.6, 5, 17.6, 7.2], [16, 5, 16, 7.2], [16, 7.2, 16.4, 7.2], [17.2, 7.2, 17.6, 7.2]];
export const WALLS: Seg[][] = [
  [...outer(true), ...riser, [0, 9.5, 3.5, 9.5], [6.5, 9.5, 10, 9.5], [10, 9.5, 10, 14]],
  [...outer(), ...riser, [0, 7, 7, 7]],
  [...outer(), ...riser, [18.4, 0, 18.4, 3.6], [18.4, 5.2, 18.4, 7.2], [18.4, 7.2, 24, 7.2]],
];
/** Furniture: boxes in plan [x0, y0, x1, y1, height]. Just enough to read as
 *  an office. */
export type Box = [number, number, number, number, number];
export const FURNITURE: Box[][] = [
  [[6.5, 11, 9, 11.9, 1.0]],
  [[2, 9.5, 8, 10.9, 0.75], [2, 11.6, 8, 13, 0.75], [10, 9.5, 14, 10.9, 0.75], [19, 9.5, 23, 10.9, 0.75], [2, 1.5, 6, 4.5, 0.75]],
  [[2, 9.5, 8, 10.9, 0.75], [2, 11.6, 8, 13, 0.75]],
];

/** The equipment the trace passes. */
export const RACK: Box = [21, 1.6, 21.9, 2.5, 2.0];
export const CONTROLLER: Box = [16.3, 5.3, 17.0, 5.8, 1.3];
export const READER: Box = [5.4, 13.75, 5.6, 13.95, 1.2];
export const CAMERA: Box = [3.6, 13.6, 4.1, 13.95, 1.05];

/* ── Below ground, and the other lots ─────────────────────────────────── */

/** Lots are drawn below the ground floor, and the ducts below the lots. */
export const LOT_Z = -6;
export const DUCT = { trunk: -12, deep: -15 };

export interface Lot { id: string; name: string; x0: number; x1: number; y0: number; y1: number }
/** The office's lot is its property line: inside it, custody is the
 *  building's walls; outside it, a contract. */
export const PROPERTY: Lot = { id: 'office', name: 'Property line', x0: -3, x1: 27, y0: -3, y1: 17 };

export interface Site { id: string; name: string; x0: number; x1: number; y0: number; y1: number; kind: 'datacentre' | 'office' }
export const SITES: Site[] = [
  { id: 'cloud', name: 'Data centre', x0: 40, x1: 60, y0: 0, y1: 14, kind: 'datacentre' },
  { id: 'cloud-ai', name: 'AI data centre', x0: 70, x1: 90, y0: 0, y1: 14, kind: 'datacentre' },
  { id: 'third-party', name: 'Their office', x0: 100, x1: 112, y0: 2, y1: 12, kind: 'office' },
];
/** Rack rows in each data centre: [x0, y0, x1, y1, height]. */
export const ROWS: Record<string, Box[]> = {
  cloud: [3.2, 6.4, 9.6].map((y) => [43, y, 57, y + 0.9, 2.2] as Box),
  'cloud-ai': [2, 4.6, 7.2, 9.8].map((y) => [73, y, 87, y + 0.8, 2.6] as Box),
};
/** Break marks on the ducts between lots: kilometres, not metres. */
export const BREAKS = [33.5, 65, 95];

/* ── Where things are ─────────────────────────────────────────────────── */

export interface Place { at: P3; label: string; where: string; dx?: number; dy?: number; compact?: boolean }

/** Each component's anchor: the point the event stops at, on its floor.
 *  `dx`/`dy` place the label (in drawing units) relative to the anchor; a
 *  leader line joins them. */
export const PLACES: Record<string, Place> = {
  door:          { at: [5.5, 13.2, H], label: 'Reader', where: 'Front entrance', dx: 2.2, dy: -2.4 },
  camera:        { at: [3.85, 13.2, H], label: 'Camera', where: 'Over the entrance', dx: -3.8, dy: -3.4 },
  controller:    { at: [16.65, 6.2, H], label: 'Controller', where: 'Riser cupboard', dx: 2.6, dy: 2.4 },
  'head-end':    { at: [21.45, 3.2, 26 + H], label: 'Server (head-end)', where: 'Comms room', dx: 3.2, dy: -1.8, compact: true },
  'local-ai':    { at: [21.85, 3.2, 26 + H], label: 'Local AI', where: 'Comms room', dx: 2.85, dy: -1.3, compact: true },
  recorder:      { at: [21.05, 3.2, 26 + H], label: 'Video recorder', where: 'Comms room', dx: 3.55, dy: -0.2, compact: true },
  cloud:         { at: [52, 5.3, H], label: 'Cloud service', where: 'A data centre', dx: 2.6, dy: -2.4 },
  'cloud-ai':    { at: [82, 6.3, H], label: 'Cloud AI', where: 'A model provider’s data centre', dx: 2.6, dy: -2.6 },
  'third-party': { at: [106, 7, H], label: 'Third party', where: 'The owner’s choice', dx: 2.4, dy: -2.2 },
};

/* ── Routes ───────────────────────────────────────────────────────────── */

/** A route between two components, as the cable runs: across a floor, then
 *  straight down or up between floors (drawn dotted), along a duct. */
export interface Run {
  from: string; to: string; points: P3[];
  stream: 'event' | 'sensitive';
  /** Drawn only in one archetype. */
  only?: 'composite' | 'governed';
}

const L2 = LEVELS[2].z;
const at = (id: string) => PLACES[id].at;
/* Lanes through the riser, so routes that share it stay apart. */
const LANE = { camera: [16.3, 6.7], footage: [16.6, 6.7], out: [16.9, 6.7], in: [17.2, 6.7] } as const;

export const RUNS: Run[] = [
  /* The door event: the path the trace follows. */
  { from: 'door', to: 'controller', stream: 'event', points: [
    at('door'), [5.5, 8.5, H], [17.2, 8.5, H], [17.2, 6.2, H], at('controller')] },
  { from: 'controller', to: 'head-end', stream: 'event', points: [
    at('controller'), [...LANE.in, H], [...LANE.in, L2 + H], [17.2, 4.4, L2 + H], [21.45, 4.4, L2 + H], at('head-end')] },
  /* Out along its own line, so it does not draw over the way in. */
  { from: 'head-end', to: 'cloud', stream: 'event', points: [
    at('head-end'), [16.9, 3.2, L2 + H], [...LANE.out, L2 + H], [...LANE.out, DUCT.trunk],
    [41.5, 6.7, DUCT.trunk], [41.5, 5.3, DUCT.trunk], [41.5, 5.3, H], at('cloud')] },
  /* Up into the aisles between rack rows, never through a row. */
  { from: 'cloud', to: 'cloud-ai', stream: 'event', points: [
    at('cloud'), [58.5, 5.3, H], [58.5, 5.3, DUCT.trunk], [71.5, 5.3, DUCT.trunk], [71.5, 6.3, DUCT.trunk], [71.5, 6.3, H], at('cloud-ai')] },
  { from: 'cloud', to: 'third-party', stream: 'event', points: [
    at('cloud'), [52, 8.45, H], [59, 8.45, H], [59, 8.45, DUCT.deep], [101.5, 8.45, DUCT.deep], [101.5, 8.45, H], [101.5, 7, H], at('third-party')] },

  /* The camera: the sensitive stream, up the riser to the recorder. */
  { from: 'camera', to: 'recorder', stream: 'sensitive', points: [
    at('camera'), [3.85, 9.2, H], [16.3, 9.2, H], [...LANE.camera, H], [...LANE.camera, L2 + H], [16.3, 4.8, L2 + H], [21.05, 4.8, L2 + H], at('recorder')] },
  /* The footage leaving with the event: the composite stack only. In the
     governed path it stops at the recorder (Docs/knowledge/thesis/leave-it-alone.md). */
  { from: 'recorder', to: 'cloud', stream: 'sensitive', only: 'composite', points: [
    at('recorder'), [20.6, 3.6, L2 + H], [16.6, 3.6, L2 + H], [...LANE.footage, L2 + H], [...LANE.footage, DUCT.trunk - 1],
    [41, 6.7, DUCT.trunk - 1], [41, 4.75, DUCT.trunk - 1], [41, 4.75, H], [51.4, 4.75, H]] },
];

/** Where the footage would cross the property line underground: the
 *  governed path's "stays on site" mark. */
export const FOOTAGE_LINE: P3 = [PROPERTY.x1, 6.7, DUCT.trunk - 1];

/* ── Checks and extent ────────────────────────────────────────────────── */

/** Every component the trace needs must have a place in the drawing.
 *  Throws at build time rather than drawing a path with a hole in it. */
export function assertPlaced(componentIds: string[]): void {
  const missing = componentIds.filter((id) => !PLACES[id]);
  if (missing.length) throw new Error(`section.ts has no place for: ${missing.join(', ')}`);
  for (const r of RUNS) for (const id of [r.from, r.to]) if (!PLACES[id]) throw new Error(`a run names “${id}”, which has no place`);
}

/** The whole drawing's 2D extent, from the corners of everything drawn,
 *  with room for labels. */
export const EXTENT = (() => {
  const pts: P2[] = [];
  const corners = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].forEach(([x, y]) => pts.push(iso([x, y, z])));
  corners(PROPERTY.x0, PROPERTY.y0, PROPERTY.x1, PROPERTY.y1, LOT_Z - PLATE);
  corners(OFFICE.x0, OFFICE.y0, OFFICE.x1, OFFICE.y1, LEVELS[2].z + WALL + 3);
  for (const s of SITES) { corners(s.x0 - 2, s.y0 - 2, s.x1 + 2, s.y1 + 2, LOT_Z - PLATE); corners(s.x0, s.y0, s.x1, s.y1, 4); }
  pts.push(iso([0, 0, DUCT.deep]), iso([112, 14, DUCT.deep - 3]));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const pad = 4;
  const x = Math.min(...xs) - pad, y = Math.min(...ys) - pad;
  return { x, y, w: Math.max(...xs) + pad + 6 - x, h: Math.max(...ys) + pad - y };
})();
