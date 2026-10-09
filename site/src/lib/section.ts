/** The section: the building cut vertically, the cloud above it.
 *  Docs/knowledge/design/the-section-drawing.md is the brief.
 *
 *  Everything here is in metres, measured up from the ground floor's finished
 *  floor level (z) and across from the entrance façade (x). The drawing flips
 *  z into SVG's downward y in one place, `Y`. Inside the property line the
 *  building is drawn to scale: a four-storey office, 28 m deep in section,
 *  4.5 m ground floor and 3.6 m upper floors, which is ordinary commercial
 *  construction. Above the property line the drawing stops being a building
 *  and becomes a diagram, and says so with a scale break. Nothing out there is
 *  at a true size or distance, and the cloud is "up" only because that is how
 *  people already picture it.
 *
 *  Which component sits where comes from the knowledge base
 *  (building/the-building.md); this file only says how to draw it. Every
 *  component the trace or the building names must have a place here, and
 *  `section()` throws at build time if one does not.
 */

export const Y = (z: number) => -z;

/* ── The building ─────────────────────────────────────────────────────── */

export const WIDTH = 28;
export const SLAB = 0.3;
/** Suspended ceiling below each slab: the void conduits run in. */
export const VOID = 0.6;

export interface Floor { name: string; z: number; h: number }
export const FLOORS: Floor[] = [
  { name: 'Ground', z: 0, h: 4.5 },
  { name: 'Level 1', z: 4.5, h: 3.6 },
  { name: 'Level 2', z: 8.1, h: 3.6 },
  { name: 'Level 3', z: 11.7, h: 3.6 },
];
export const ROOF = 15.3;
/** Plant enclosure on the roof, set back from both façades. */
export const PLANT = { x0: 12, x1: 24, h: 2.6 };
/** The ceiling line of a floor: where the void begins. */
export const ceiling = (f: Floor) => f.z + f.h - SLAB - VOID;
/** Height inside the ceiling void, for conduits. */
export const voidZ = (f: Floor) => f.z + f.h - SLAB - VOID / 2;

/** The lift and stair core, drawn hatched, and the riser beside it. */
export const CORE = { x0: 13, x1: 17 };
export const RISER = { x0: 17, x1: 18.6 };

/** Partitions and the rooms they make. A room's label sits at its top left. */
export interface Room { name: string; floor: number; x0: number; x1: number }
export const ROOMS: Room[] = [
  { name: 'Entrance', floor: 0, x0: 0, x1: 8 },
  { name: 'Main switchboard', floor: 0, x0: RISER.x1, x1: 23 },
  { name: 'FM office', floor: 1, x0: 0, x1: 9 },
  { name: 'Comms room', floor: 2, x0: RISER.x1, x1: 25 },
];

/** The front door: an opening in the entrance façade. */
export const DOOR = { z0: 0, z1: 2.4 };

/* ── The property line ────────────────────────────────────────────────── */

/** The custody boundary, drawn around the site. Inside it the building's own
 *  walls are the boundary; outside it custody is a contract. */
export const PROPERTY = { x0: -3, x1: 31, z0: -1.2, z1: 20 };

/** The scale break: past it, the drawing is a diagram. */
export const BREAK = { z: 22 };

/* ── Where things are ─────────────────────────────────────────────────── */

export interface Place { x: number; z: number; label: string; where: string; side?: 'left' | 'right'; compact?: boolean }

/** Each component's anchor: the point the event stops at, or the point a
 *  background stream starts from. Labels give the knowledge base's name and
 *  place in the building. */
export const PLACES: Record<string, Place> = {
  door:         { x: 0.55, z: 1.2,  label: 'Reader', where: 'Front entrance', side: 'right' },
  camera:       { x: 1.2,  z: 3.45, label: 'Camera', where: 'Over the entrance', side: 'right' },
  controller:   { x: 17.8, z: 1.6,  label: 'Controller', where: 'Riser cupboard', side: 'left' },
  meter:        { x: 20.4, z: 1.5,  label: 'Energy meter', where: 'Main switchboard', side: 'right' },
  'web-client': { x: 4.2,  z: 5.55, label: 'Web client', where: 'FM office', side: 'right' },
  occupancy:    { x: 11,   z: 7.2,  label: 'Occupancy sensor', where: 'Level 1 ceiling', side: 'left' },
  /* On the rear façade: Level 3 is open plan and has no other wall there. */
  air:          { x: 27.85, z: 13.2, label: 'Air sensor', where: 'Level 3', side: 'left' },
  /* Three units in one rack: one-line labels, or they would overlap. */
  'head-end':   { x: 21.5, z: 9.55, label: 'Server (head-end)', where: 'Comms room', side: 'right', compact: true },
  'local-ai':   { x: 21.5, z: 9.15, label: 'Local AI', where: 'Comms room', side: 'right', compact: true },
  cloud:        { x: 14,   z: 28.5, label: 'Cloud service', where: 'A data centre', side: 'right' },
  'cloud-ai':   { x: 11,   z: 38.5, label: 'Cloud AI', where: 'A model provider', side: 'right' },
  'third-party':{ x: 28,   z: 35,   label: 'Third party', where: 'The owner’s choice', side: 'right' },
};

/** Sensors repeated on other floors, drawn but not labelled. */
export const ALSO: { component: string; x: number; z: number }[] = [
  { component: 'occupancy', x: 6, z: ceiling(FLOORS[2]) },
  { component: 'occupancy', x: 6, z: ceiling(FLOORS[3]) },
  { component: 'occupancy', x: 24, z: ceiling(FLOORS[1]) },
  { component: 'air', x: 12.9, z: FLOORS[1].z + 1.5 },
];

/** The rack in the comms room, and the units the drawing names in it. */
export const RACK = { x: 21.5, w: 0.6, z0: FLOORS[2].z, h: 2.0 };
export const RECORDER = { z: 8.75, label: 'Video recorder' };

/* ── Conduits ─────────────────────────────────────────────────────────── */

/** A run of conduit between two components, as the cable would actually go:
 *  up into the ceiling void, along it, into the riser, up or down the riser.
 *  `lane` offsets runs that share the riser so they do not draw on top of
 *  each other. */
export interface Run { from: string; to: string; points: [number, number][]; stream: 'event' | 'background' | 'sensitive' }

const g = FLOORS[0], l1 = FLOORS[1], l2 = FLOORS[2], l3 = FLOORS[3];
/* Lanes in the riser, left to right. The event gets the one nearest the
   comms room so its path reads cleanly at the top. */
const LANE = { sensors: 17.25, camera: 17.5, web: 17.75, meter: 18.0, event: 18.3 };

export const RUNS: Run[] = [
  /* The door event: the path the trace follows. */
  { from: 'door', to: 'controller', stream: 'event', points: [[0.55, 1.2], [0.55, voidZ(g)], [LANE.event, voidZ(g)], [LANE.event, 1.6], [17.8, 1.6]] },
  { from: 'controller', to: 'head-end', stream: 'event', points: [[17.8, 1.6], [LANE.event, 1.6], [LANE.event, 9.55], [21.5, 9.55]] },
  { from: 'head-end', to: 'cloud', stream: 'event', points: [[21.5, 9.55], [21.5, voidZ(l2)], [LANE.event, voidZ(l2)], [LANE.event, PROPERTY.z1], [LANE.event, BREAK.z + 1.5], [14, 27], [14, 28.5]] },
  { from: 'cloud', to: 'cloud-ai', stream: 'event', points: [[14, 28.5], [14, 33], [11, 37], [11, 38.5]] },
  { from: 'cloud', to: 'third-party', stream: 'event', points: [[14, 28.5], [20, 30.5], [28, 33.5], [28, 35]] },

  /* The camera: the sensitive stream. Down the riser to the recorder; in the
     composite stack it then leaves with the event (phase 4 decides when it
     is drawn). */
  { from: 'camera', to: 'head-end', stream: 'sensitive', points: [[1.2, 3.45], [1.2, voidZ(g) - 0.15], [LANE.camera, voidZ(g) - 0.15], [LANE.camera, RECORDER.z], [21.5, RECORDER.z]] },

  /* Everything else the building says, drawn quietly. */
  { from: 'occupancy', to: 'controller', stream: 'background', points: [[11, 7.2], [11, voidZ(l1)], [LANE.sensors, voidZ(l1)], [LANE.sensors, 1.75], [17.8, 1.75]] },
  { from: 'air', to: 'controller', stream: 'background', points: [[27.85, 13.2], [27.85, voidZ(l3)], [LANE.sensors, voidZ(l3)], [LANE.sensors, voidZ(l1)]] },
  { from: 'meter', to: 'head-end', stream: 'background', points: [[20.4, 1.5], [20.4, voidZ(g) + 0.15], [LANE.meter, voidZ(g) + 0.15], [LANE.meter, 9.35], [21.5, 9.35]] },
  { from: 'web-client', to: 'head-end', stream: 'background', points: [[4.2, 5.55], [4.2, voidZ(l1)], [LANE.web, voidZ(l1)], [LANE.web, 9.75], [21.5, 9.75]] },
];

/* ── Checks ───────────────────────────────────────────────────────────── */

/** Every component the knowledge base puts in the building or on the trace
 *  must have a place in the drawing. Called at build time with the ids the
 *  collections hold; throws rather than drawing a building with a hole in it. */
export function assertPlaced(componentIds: string[]): void {
  const missing = componentIds.filter((id) => !PLACES[id]);
  if (missing.length) throw new Error(`section.ts has no place for: ${missing.join(', ')}`);
  for (const r of RUNS) for (const id of [r.from, r.to]) if (!PLACES[id]) throw new Error(`a run names “${id}”, which has no place`);
}

/** The whole drawing's extent, with room for labels. */
export const EXTENT = { x0: -6, x1: 37, z0: -2.4, z1: 42 };
