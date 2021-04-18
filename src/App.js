import "./App.css";
import { useState } from "react";
import * as utils from "./utils";
import { ReactComponent as ColorSchemeSvg } from "./colorSchemes.svg";
import PaletteItem from "./PaletteItem";

function App() {

  const [stylePrimary, setStylePrimary] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(utils.generateThemeColors(utils.randomColor()));
  const [savedThemePalettes, setSavedThemePalettes] = useState(fetchSavedThemes);

  function saveCurrentTheme() {
    const saved = JSON.parse(localStorage.getItem("colorinator") ?? "{}");
    const lastIndex = Object.keys(saved).length + 1;
    const primary = currentTheme.primary.hex;
    const secondary = currentTheme.secondary.hex;
    const accent = currentTheme.accent.hex;
    saved[lastIndex] = {
      primary, secondary, accent
    };
    localStorage.setItem("colorinator", JSON.stringify(saved));
    setSavedThemePalettes(fetchSavedThemes());
  }

  const primaryBgCss = {
    background: currentTheme.primary.hex,
    color: utils.getContrastingColor(currentTheme.primary).hex,
  };

  const secondaryBgCss = {
    background: currentTheme.secondary.hex,
    color: utils.getContrastingColor(currentTheme.secondary).hex,
  };

  const accentBgCss = {
    background: currentTheme.accent.hex,
    color: utils.getContrastingColor(currentTheme.accent).hex,
  };

  function getPrimaryStyle() {
    return stylePrimary ? primaryBgCss : secondaryBgCss;
  }

  function getSecondaryStyle() {
    return stylePrimary ? secondaryBgCss : primaryBgCss;
  }

  function fetchSavedThemes() {
    if (localStorage.getItem("colorinator")) {
      return Object.values(
        JSON.parse(localStorage.getItem("colorinator") ?? "{}")
      ).map((value) => {
        return <PaletteItem key={value.primary.hex} theme={value} />;
      });
    }

    return <p>You haven't added any themes to your palette yet !</p>;
  }

  return (
    <div className="App" style={getPrimaryStyle()}>

      {console.log("currentTheme", currentTheme)}

      {/* Header */}
      <header>
        <h1 className="nav-brand"> Colorinator</h1>
      </header>

      {/* Illustration */}
      <section className="svg">
        <ColorSchemeSvg />
      </section>

      {/* Input Section */}
      <section className="controls">
        <h2 className="tag">Generate themes for your project quickly!</h2>
        <input
          type="text"
          className="colorpicker"
          placeholder="Enter Hex Code"
          style={getSecondaryStyle()}
        />
        <div className="controls">
          <button
            style={accentBgCss}
            className="control-item"
            onClick={() => setStylePrimary(!stylePrimary)}
          >
            {stylePrimary ? (
              <i className="far fa-window-maximize"></i>
            ) : (
              <i className="fas fa-window-maximize"></i>
            )}
          </button>
          <button className="control-item" style={accentBgCss} onClick={() => setCurrentTheme(utils.generateThemeColors(utils.randomColor()))}>
            <i className="fas fa-random"></i>
          </button>
        </div>

        <button className="save" style={accentBgCss} onClick={saveCurrentTheme}>
          <i className="fas fa-bookmark"></i>&nbsp;&nbsp;&nbsp;Add to palette
        </button>
      </section>

      {/* Palette Section  */}
      <section className="pallete">
        <h2>Saved Themes</h2>
        <div className="pallete-items">{savedThemePalettes}</div>
      </section>
    </div>
  );
}

export default App;
