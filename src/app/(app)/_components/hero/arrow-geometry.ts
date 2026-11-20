export interface Point {
  x: number
  y: number
}

export function arrowBetween(start: Point, end: Point, bend: number) {
  const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }
  const dx = end.x - start.x
  const dy = end.y - start.y
  const length = Math.hypot(dx, dy) || 1

  return arrowVia(start, end, {
    x: mid.x - (dy / length) * bend,
    y: mid.y + (dx / length) * bend,
  })
}

export function arrowVia(start: Point, end: Point, control: Point) {
  const tx = end.x - control.x
  const ty = end.y - control.y
  const tangent = Math.hypot(tx, ty) || 1
  const ux = tx / tangent
  const uy = ty / tangent
  const size = 11
  const spread = 0.55

  const left = {
    x: end.x - size * (ux * Math.cos(spread) - uy * Math.sin(spread)),
    y: end.y - size * (uy * Math.cos(spread) + ux * Math.sin(spread)),
  }

  const right = {
    x: end.x - size * (ux * Math.cos(-spread) - uy * Math.sin(-spread)),
    y: end.y - size * (uy * Math.cos(-spread) + ux * Math.sin(-spread)),
  }

  return {
    shaft: `M${start.x} ${start.y} Q ${control.x} ${control.y}, ${end.x} ${end.y}`,
    head: `M${left.x} ${left.y} L${end.x} ${end.y} L${right.x} ${right.y}`,
  }
}
