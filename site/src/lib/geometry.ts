/** Polyline geometry, shared by the build (lib/trace-data.ts) and the browser
 *  (scripts/trace.ts). Pure: no imports, so it can ship to the client. */

export type Pt = [number, number];

export const dist = (a: Pt, b: Pt): number => Math.hypot(b[0] - a[0], b[1] - a[1]);

export const length = (pts: Pt[]): number => pts.slice(1).reduce((s, p, i) => s + dist(pts[i], p), 0);

/** The point a distance `d` along a polyline, the direction of travel there,
 *  and the vertices passed so far (for drawing the route up to that point). */
export function along(pts: Pt[], d: number): { p: Pt; dir: Pt; passed: Pt[] } {
  const passed: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const seg = dist(pts[i - 1], pts[i]);
    if (d <= seg || i === pts.length - 1) {
      const u = seg ? Math.min(1, Math.max(0, d / seg)) : 0;
      const [a, b] = [pts[i - 1], pts[i]];
      const p: Pt = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
      return { p, dir: seg ? [(b[0] - a[0]) / seg, (b[1] - a[1]) / seg] : [0, -1], passed: [...passed, p] };
    }
    d -= seg;
    passed.push(pts[i]);
  }
  const last = pts[pts.length - 1];
  return { p: last, dir: [0, -1], passed };
}
