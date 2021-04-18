import Color from 'jscolor';

export function getContrastingColor(color) {
    let d = 0;

    // Counting the perceptive luminance - human eye favors green color... 
    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

    if (luminance > 0.5)
        d = 0; // bright colors - black font
    else
        d = 255; // dark colors - white font

    d = rgbToHex(d, d, d); //convert d to hex
    return new Color(d);
}

export function random() {
    return Math.floor(Math.random() * 100) % 255;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
}
export function randomHex() {
    let r = getRandomInt(20, 200).toString(16);
    let g = getRandomInt(20, 200).toString(16);
    let b = getRandomInt(20, 200).toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
}

export function randomColor() {
    let color = new Color();
    color.r = getRandomInt(20, 200).toString(16);
    color.g = getRandomInt(20, 200).toString(16);
    color.b = getRandomInt(20, 200).toString(16);

    return color;
}

export function hex2hsl(hex) {
    let r = new Number("0x" + hex.substring(1, 3)).toString(10);
    let g = new Number("0x" + hex.substring(3, 5)).toString(10);
    let b = new Number("0x" + hex.substring(5, 7)).toString(10);

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 50).toFixed(1);

    return { h, s, l };
}

export function generateThemeColors(color) {
    console.log("generateThemeColors2");
    const primary = new Color(color.hex);
    const secondary = new Color(color.hex);
    const accent = new Color(color.hex)

    //for secondary color
    secondary.s = getRandomInt(5, 10);
    secondary.l = getRandomInt(95, 100);

    //for accent color
    const sign = Math.random([1, -1]);
    accent.h = primary.h + sign * getRandomInt(30, 40);
    accent.l = primary.l + getRandomInt(5, 10);

    return {
        primary, secondary, accent
    }
}
