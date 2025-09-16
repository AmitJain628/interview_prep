// #ff3ff

const fullHex = (hex) => {
    const hexColor = hex.replace('#', '');
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    return {r, g, b};
}

console.log(fullHex("#ff33ff"));

const convert = (val) => {
  const hex = val.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + convert(r) +  convert(g) + convert(b);
}

console.log(rgbToHex(255, 51, 255));