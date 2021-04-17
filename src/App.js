import "./App.css";
import { useState } from "react";

function App() {
  const [primary, setPrimary] = useState(hex2hsl(randomHex()));
  const [secondary, setSecondary] = useState(hex2hsl(randomHex()));
  const [accent, setAccent] = useState(hex2hsl(randomHex()));
  const [stylePrimary, setStylePrimary] = useState(true);

  function random() {
    return Math.floor(Math.random() * 100) % 255;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomHex() {
    let r = random().toString(16);
    let g = random().toString(16);
    let b = random().toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
  }

  function hex2hsl(hex) {
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
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  }

  function hslString({ h, s, l }) {
    // h = ("0" + h).slice(-2);
    // s = ("0" + h).slice(-2);
    // l = ("0" + l).slice(-2);
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  function generateThemeColors(hexCode) {
    const { h, s, l } = hex2hsl(hexCode);

    //for secondary color
    let s2 = getRandomInt(5, 10);
    let l2 = getRandomInt(95, 100);

    //for accent color
    const sign = Math.random([1, -1]);
    let h3 = h - sign * getRandomInt(30, 40);
    let b3 = l + getRandomInt(5, 10);

    setPrimary({ h, s, l });
    setSecondary({ h, s: s2, l: l2 });
    setAccent({ h: h3, s: s, l: b3 });
  }

  function saveCurrentTheme() {
    let saved = JSON.parse(localStorage.getItem("colorinator") ?? {});
    let lastIndex = Object.keys(saved).length + 1;
    saved[lastIndex] = { primary, secondary, accent };
    localStorage.setItem("colorinator", JSON.stringify(saved));
  }

  function getContrastingColor(color) {
    // const blacks = ["#303030", "#2b2b2b", "1f1f1f", "1b1c1e"];
    const black = "1b1c1e";
    let newL = color.l - 40;
    if (newL < 0) newL += 100;
    return hslString({ h: color.h, s: Math.abs(color.s), l: newL });
  }

  const buttonCSS = {
    backgroundColor: hslString(accent),
    color: getContrastingColor(accent),
  };

  const AppCss = {
    backgroundColor: hslString(getSecondaryBg()),
  };

  const secondaryBgCss = { background: hslString(getSecondaryBg()), color: getContrastingColor(getSecondaryBg()) };

  function getPrimaryBg() {
    return stylePrimary ? primary : secondary;
  }

  function getSecondaryBg() {
    return stylePrimary ? secondary : primary;
  }

  return (
    <div className="App">
      {console.log(primary, secondary, accent)}

      <nav
        style={{
          backgroundColor: hslString(getPrimaryBg()),
          color: getContrastingColor(getPrimaryBg()),
        }}
      >
        <div className="nav-brand">Colorninator</div>
        <div className="nav-options">
          <div className="nav-option-item">Desktop</div>
          <div className="nav-option-item">Mobile</div>
        </div>
        <div
          className="nav-search-container"
          style={{ background: hslString(getSecondaryBg()) }}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter a Hexcode"
            onChange={(e) => {
              if (
                e.target.value &&
                e.target.value.length == 7 &&
                e.target.value.lastIndexOf("#") == 0
              )
                generateThemeColors(e.target.value);
            }}
          />

          <button
            onClick={(e) => {
              const newColor = randomHex();
              generateThemeColors(newColor);
            }}
            className="circle"
          >
            <i
              className="fas fa-random"
              style={{ color: hslString(accent) }}
            ></i>
          </button>
        </div>
      </nav>

      <section className="canvas" style={{ background: hslString(getPrimaryBg()), color: getContrastingColor(getPrimaryBg()) }}>
        <h3 className="canvas-h2">Hi, Visitor</h3>
        <h2 className="canvas-h1">What do you want to learn today ?</h2>
        <div className="thumbnails">
          <div className="card" style={secondaryBgCss}>
            <i className="fab fa-bitcoin card-icon"></i>
            <p className="card-title">Blockchain</p>
            <p className="card-sub-title">48 Students</p>
          </div>

          <div className="card" style={secondaryBgCss}>
            <i className="fas fa-palette card-icon"></i>
            <p className="card-title">Photoshop</p>
            <p className="card-sub-title">69 Students</p>
          </div>

          <div className="card" style={secondaryBgCss}>
            <i className="fab fa-android card-icon"></i>
            <p className="card-title">Android Development</p>
            <p className="card-sub-title">58 Students</p>
          </div>
        </div>
        <p className="canvas-h1">Your History</p>
        <div className="history-container">
          <div className="history-item">
            <p className="history-item-title">Development</p>
            <p className="history-item-icon circle">32%</p>
            <p className="history-item-sub-title"></p>
          </div>
          <div className="history-item">
            <p className="history-item-title">Artificial Intelligence</p>
            <p className="history-item-icon circle"></p>
            <p className="history-item-sub-title"></p>
          </div>
          <div className="history-item">
            <p className="history-item-title">Illustrator</p>
            <p className="history-item-icon circle"></p>
            <p className="history-item-sub-title"></p>
          </div>
        </div>
      </section>

      <div
        className="controls-container"
        style={{
          backgroundColor: hslString(getSecondaryBg()),
          color: getContrastingColor(getSecondaryBg())
        }}
      >
        <button onClick={saveCurrentTheme} style={buttonCSS}>
          Save Theme
        </button>
      </div>
    </div>
  );
}

export default App;
