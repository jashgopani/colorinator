import Color from "jscolor";

/*Get random Integer from a range*/
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a randomColor object
 * @returns Color
 */
export function randomColor() {
    let color = new Color();
    color.h = getRandomInt(0, 360);
    color.s = getRandomInt(20, 100);
    color.l = getRandomInt(20, 100);
    return color;
}

/**
 * Generate Theme Color from a given color
 * @param {Color} color Primary Color object of theme
 * @param {Boolean} oppositeAccent Should the accent color be contrasting
 * @returns Theme Object with primary,secondary and accent color objects
 */
export function generateThemeColors(color, oppositeAccent) {
    const primary = new Color(color.hex);
    const secondary = new Color(color.hex);
    const accent = new Color(color.hex);

    //for secondary color
    secondary.s = getRandomInt(5, 10);
    secondary.l = getRandomInt(95, 100);

    //for accent color
    const sign = Math.random([1, -1]);
    if (!oppositeAccent) accent.h = primary.h + sign * getRandomInt(30, 40);
    else accent.h = oppositeValueInRange(primary.h, 0, 255);
    accent.l = primary.l + getRandomInt(5, 10);

    return {
        primary,
        secondary,
        accent,
    };
}

/**
 * Generate Random theme using random colors utility methods
 * @returns Random Theme
 */
export function randomTheme() {
    return generateThemeColors(randomColor(), Math.random([true, false]));
}

/**
 * Get basic style for element based on the passed background color
 * @param {String} elementBackground color to be set as the background color of application[primary/secondary/accent]
 * @param {Object} currentTheme current theme of the application
 * @param {String} specificFontColor color to be used as font color for the element [primary/secondary/accent]
 * @returns Object containing CSS properties
 */
export function getBasicStyle(
    elementBackground,
    currentTheme,
    specificFontColor
) {
    //set current bg
    const backgroundColor = currentTheme[elementBackground].hex;

    //default font color will be contrasting color of background color
    //if we explicitly pass a color for font, we set that
    const oppositeStyle = getOppositeStyle(elementBackground);
    let fontColor = getContrastingColor(currentTheme[elementBackground]).hex;
    if (specificFontColor !== null) {
        fontColor = currentTheme[specificFontColor].hex;
    }

    return {
        backgroundColor,
        color: fontColor,
    };
}

/**
 * Convert RGB values to Hex String
 * @param {Number} r red(0-255)
 * @param {Number} g green(0-255)
 * @param {Number} b blue(0-255)
 * @returns String
 */
export function rgbToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
}


/**
 * Get contrasting color for a given color
 * @param {Color} color Color object
 * @returns Color
 */
export function getContrastingColor(color) {
    let d = 0;

    // Counting the perceptive luminance - human eye favors green color...
    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

    if (luminance > 0.5) d = 31;
    // bright colors - black font
    else d = 255; // dark colors - white font

    d = rgbToHex(d, d, d); //convert d to hex
    return new Color(d);
}

/**
 * Given a particular component of theme, get the contrasting one
 * @param {String} style String specifying existing style (primary/secondary/accent)
 * @returns String
 */
export function getOppositeStyle(style) {
    if (style === "primary") return "secondary";
    else if (style === "secondary") return "primary";
    return "secondary";
}


//might be discarded
export function getCss(style, theme, outline) {
    let backgroundColor, color;
    const oppositeColor =
        style === "primary"
            ? "secondary"
            : style === "accent"
                ? "accent"
                : "primary";
    if (style) {
        backgroundColor = outline ? "transparent" : theme[style].hex;
        color = outline
            ? theme[style].hex
            : getContrastingColor(
                style === oppositeColor ? theme[oppositeColor] : theme[style]
            ).hex;
    }

    if (style === "accent" && outline) {
        console.log("accent button util", outline);
        backgroundColor = getContrastingColor(theme.accent);
        color = theme.accent.hex;
    }

    return {
        backgroundColor,
        color,
        border: outline ? "2px solid " + color : "none",
    };
}

/**
 * Get opposite value of number in a given range
 * @param {Number} num Number whose opposite value is to be calculated
 * @param {Number} min Starting value of range
 * @param {Number} max Ending Value of range
 * @returns Number
 */
function oppositeValueInRange(num, min, max) {
    return min + (max - num);
}


/**
 * Get brightness value of color
 * @param {Color} color Color whose luminance is to be calculated
 * @returns Float
 */
function luminance(color) {
    const r = color.r;
    const g = color.g;
    const b = color.b;

    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate the contrast between 2 colors
 * @param {Color} color1 First Color Object
 * @param {Color} color2 Second Color Object
 * @returns Float
 */
function contrast(color1, color2) {
    var lum1 = luminance(color1);
    var lum2 = luminance(color2);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
