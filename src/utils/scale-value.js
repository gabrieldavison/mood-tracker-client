export default function scaleValue(value, from, to) {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
}

// export default function scaleValue(value, r1, r2) {
//   return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
// }

// const scaleValue = (value, x1, y1, x2, y2) =>
//   ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

// export default scaleValue;
