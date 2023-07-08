const chroma = require("chroma-js");

// Start with a base color
let baseColor = chroma("blue");

// Generate the tetradic color scheme
let colorPalette = [
  baseColor,
  chroma(baseColor).set("hsl.h", (baseColor.get("hsl.h") + 90) % 360),
  chroma(baseColor).set("hsl.h", (baseColor.get("hsl.h") + 180) % 360),
  chroma(baseColor).set("hsl.h", (baseColor.get("hsl.h") + 270) % 360),
];

console.log(colorPalette.map((color) => color.hex()));
