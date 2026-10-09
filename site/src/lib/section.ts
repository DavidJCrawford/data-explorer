/** The section: a street-level cut through four buildings, and the ground
 *  between them. Docs/knowledge/design/the-section-drawing.md is the brief.
 *
 *  Everything here is in metres: z up from ground level (negative is below
 *  ground), x across from the office's entrance façade. The drawing flips z
 *  into SVG's downward y in one place, `Y`.
 *
 *  The office is drawn to scale and kept simple: three storeys, the entrance
 *  with its reader and camera, the controller in the riser, the comms room
 *  with its rack. Everything else in the building is in the knowledge base
 *  and the rulebook, not here (the drawing is the path, not the inventory).
 *
 *  The data leaves the way it really does: down the riser to the building's
 *  cable entry, out under the property line, and along buried ducts to a
 *  cloud data centre, an AI data centre and the third party's office. Each
 *  building is drawn to its own scale, but the real distances between them
 *  are kilometres, so the ground between sites carries a break mark and says
 *  so. Nothing goes up into the sky.
 *
 *  Every component on the trace (and the camera, and the local-AI
 *  alternative) must have a place here; `assertPlaced` throws at build time
 *  if one does not.
 */

export const Y = (z: number) => -z;

/* ── The office ───────────────────────────────────────────────────────── */

export const WIDTH = 20;
export const SLAB = 0.3;
/** Suspended ceiling below each slab: the void conduits run in. */
export const VOID = 0.6;

export interface Floor { name: string; z: number; h: number }
export const FLOORS: Floor[] = [
  { name: 'Ground', z: 0, h: 4.5 },
  { name: 'Level 1', z: 4.5, h: 3.6 },
  { name: 'Level 2', z: 8.1, h: 3.6 },
];
export const ROOF = 11.7;
export const ceiling = (f: Floor) => f.z + f.h - SLAB - VOID;
export const voidZ = (f: Floor) => f.z + f.h - SLAB - VOID / 2;

/** The riser: where the building's cables run between floors. */
export const RISER = { x0: 13, x1: 14.4 };

export interface Room { name: string; floor: number; x0: number; x1: number }
export const ROOMS: Room[] = [
  { name: 'Entrance', floor: 0, x0: 0, x1: 7 },
  { name: 'Comms room', floor: 2, x0: RISER.x1, x1: WIDTH },
];

/** The front door: an opening in the entrance façade. */
export const DOOR = { z0: 0, z1: 2.4 };

/** The rack in the comms room, and the units the drawing names in it. */
export const RACK = { x: 17.2, w: 0.6, z0: FLOORS[2].z, h: 2.0 };
export const RECORDER = { z: 8.75, label: 'Video recorder' };

/* ── Below ground ─────────────────────────────────────────────────────── */

/** Duct depths: the trunk to the cloud, and the deeper run that passes under
 *  the AI data centre on its way to the third party. */
export const DUCT = { trunk: -1.2, deep: -2.2 };
/** Where the office's cables leave the building: the cable entry. */
export const ENTRY = { x: WIDTH, z: DUCT.trunk };

/* ── The property line ────────────────────────────────────────────────── */

/** The custody boundary around the office's site, above and below ground.
 *  Inside it the building's own walls are the boundary; outside it custody is
 *  a contract. The data crosses it underground, at x1. */
export const PROPERTY = { x0: -3, x1: 23, z0: -3.2, z1: 13.6 };

/* ── The other sites ──────────────────────────────────────────────────── */

export interface Site { id: string; x0: number; x1: number; h: number; kind: 'datacentre' | 'office' }
export const SITES: Site[] = [
  { id: 'cloud', x0: 30, x1: 48, h: 7, kind: 'datacentre' },
  { id: 'cloud-ai', x0: 58, x1: 76, h: 8, kind: 'datacentre' },
  { id: 'third-party', x0: 84, x1: 96, h: 7.8, kind: 'office' },
];
/** The raised floor in a data centre, with cables beneath it. */
export const RAISED = 0.6;
/** Break marks in the ground between sites: kilometres, not metres. */
export const BREAKS = [26, 53, 80];

/* ── Where things are ─────────────────────────────────────────────────── */

export interface Place { x: number; z: number; label: string; where: string; side?: 'left' | 'right'; compact?: boolean }

/** Each component's anchor: the point the event stops at. Labels give the
 *  knowledge base's name and place. */
export const PLACES: Record<string, Place> = {
  door:          { x: 0.55, z: 1.2,  label: 'Reader', where: 'Front entrance', side: 'right' },
  camera:        { x: 1.2,  z: 3.45, label: 'Camera', where: 'Over the entrance', side: 'right' },
  controller:    { x: 13.7, z: 1.6,  label: 'Controller', where: 'Riser cupboard', side: 'left' },
  /* Three units in one rack: one-line labels, or they would overlap. */
  'head-end':    { x: RACK.x, z: 9.55, label: 'Server (head-end)', where: 'Comms room', side: 'right', compact: true },
  'local-ai':    { x: RACK.x, z: 9.15, label: 'Local AI', where: 'Comms room', side: 'right', compact: true },
  cloud:         { x: 38, z: 1.4, label: 'Cloud service', where: 'A data centre', side: 'right' },
  'cloud-ai':    { x: 66, z: 1.4, label: 'Cloud AI', where: 'A model provider’s data centre', side: 'right' },
  'third-party': { x: 89, z: 1.2, label: 'Third party', where: 'The owner’s choice', side: 'right' },
};

/* ── Conduits ─────────────────────────────────────────────────────────── */

/** A run of cable between two components, as it would actually go. In the
 *  office: up into the ceiling void, along it, into the riser. Out of it:
 *  down the riser, under the slab to the cable entry, along a buried duct,
 *  up under a data centre's raised floor. */
export interface Run {
  from: string; to: string; points: [number, number][];
  stream: 'event' | 'sensitive';
  /** Drawn only in one archetype. */
  only?: 'composite' | 'governed';
}

const g = FLOORS[0];
/* Lanes in the riser, left to right, so runs that share it do not draw on
   top of each other: the camera's footage up, the footage out (composite
   only), the event out, the event in. */
export const LANE = { camera: 13.3, footage: 13.6, out: 13.9, in: 14.15 };
const [cloud, ai, third] = SITES;

export const RUNS: Run[] = [
  /* The door event: the path the trace follows. */
  { from: 'door', to: 'controller', stream: 'event', points: [[0.55, 1.2], [0.55, voidZ(g)], [LANE.in, voidZ(g)], [LANE.in, 1.6], [13.7, 1.6]] },
  { from: 'controller', to: 'head-end', stream: 'event', points: [[13.7, 1.6], [LANE.in, 1.6], [LANE.in, 9.55], [RACK.x, 9.55]] },
  { from: 'head-end', to: 'cloud', stream: 'event', points: [
    [RACK.x, 9.55], [RACK.x, 9.35], [LANE.out, 9.35], [LANE.out, DUCT.trunk], [ENTRY.x, DUCT.trunk],
    [cloud.x0 + 1, DUCT.trunk], [cloud.x0 + 1, RAISED / 2], [38, RAISED / 2], [38, 1.4]] },
  { from: 'cloud', to: 'cloud-ai', stream: 'event', points: [
    [38, 1.4], [38.3, 1.4], [38.3, RAISED / 2], [cloud.x1 - 1, RAISED / 2], [cloud.x1 - 1, DUCT.trunk],
    [ai.x0 + 1, DUCT.trunk], [ai.x0 + 1, RAISED / 2], [66, RAISED / 2], [66, 1.4]] },
  { from: 'cloud', to: 'third-party', stream: 'event', points: [
    [38, 1.4], [38.6, 1.4], [38.6, RAISED / 4], [cloud.x1 - 0.6, RAISED / 4], [cloud.x1 - 0.6, DUCT.deep],
    [third.x0 + 1, DUCT.deep], [third.x0 + 1, 0.3], [89, 0.3], [89, 1.2]] },

  /* The camera: the sensitive stream, up the riser to the recorder. */
  { from: 'camera', to: 'head-end', stream: 'sensitive', points: [[1.2, 3.45], [1.2, voidZ(g) - 0.15], [LANE.camera, voidZ(g) - 0.15], [LANE.camera, RECORDER.z], [RACK.x - RACK.w / 2, RECORDER.z]] },
  /* The footage leaving with the event: the composite stack only. In the
     governed path it stops at the recorder (Docs/knowledge/thesis/leave-it-alone.md). */
  { from: 'head-end', to: 'cloud', stream: 'sensitive', only: 'composite', points: [
    [RACK.x - RACK.w / 2, RECORDER.z + 0.1], [LANE.footage, RECORDER.z + 0.1], [LANE.footage, DUCT.trunk - 0.25],
    [cloud.x0 + 0.7, DUCT.trunk - 0.25], [cloud.x0 + 0.7, RAISED / 2 + 0.15], [37.4, RAISED / 2 + 0.15], [37.4, 1.0]] },
];

/** Where the footage would cross the property line, for the governed path's
 *  "stays on site" mark. */
export const FOOTAGE_LINE = { x: PROPERTY.x1, z: DUCT.trunk - 0.25 };

/* ── Checks ───────────────────────────────────────────────────────────── */

/** Every component the trace needs must have a place in the drawing. Called
 *  at build time; throws rather than drawing a path with a hole in it. */
export function assertPlaced(componentIds: string[]): void {
  const missing = componentIds.filter((id) => !PLACES[id]);
  if (missing.length) throw new Error(`section.ts has no place for: ${missing.join(', ')}`);
  for (const r of RUNS) for (const id of [r.from, r.to]) if (!PLACES[id]) throw new Error(`a run names “${id}”, which has no place`);
}

/** The whole drawing's extent, with room for labels. */
export const EXTENT = { x0: -6, x1: 100, z0: -4.2, z1: 14.2 };
