import "./App.css";
import { useState } from "react";
import * as utils from "./utils";
import { ReactComponent as ColorSchemeSvg } from "./colorPalette.svg";
import PaletteItem from "./PaletteItem";
import ColorSchemeImage from "./colorScheme.png";
import Button from "./components/Button";

function App() {
  const [stylePrimary, setStylePrimary] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(utils.randomTheme());
  const [savedThemePalettes, setSavedThemePalettes] = useState(
    fetchSavedThemes
  );
  const [history, setHistory] = useState({
    index: 0,
    themes: [currentTheme],
  });

  function saveCurrentTheme() {
    const saved = JSON.parse(localStorage.getItem("colorinator") ?? "{}");
    const lastIndex = Object.keys(saved).length + 1;
    const primary = currentTheme.primary.hex;
    const secondary = currentTheme.secondary.hex;
    const accent = currentTheme.accent.hex;
    saved[lastIndex] = {
      primary,
      secondary,
      accent,
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

  function getButtonTheme() {
    return stylePrimary ? "secondary" : "primary";
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
      <nav>
        <h1 className="nav-brand"> Colorinator</h1>
      </nav>

      <section className="header-strip">
        {/* Illustration */}
        <section className="svg">
          <ColorSchemeSvg />
        </section>

        {/* Input Section */}
        <section className="controls">
          <h2 className="tag">Generate quick themes for your projects !</h2>
          <input
            type="text"
            className="colorpicker"
            placeholder="Enter Hex Code"
            style={utils.getCss(
              stylePrimary ? "secondary" : "primary",
              currentTheme,
              true
            )}
          />
          <div className="controls">
            <Button
              theme={currentTheme}
              className="circle"
              style={stylePrimary ? "primary" : "secondary"}
              onClick={() => {
                const newIndex =
                  history.index - 1 < 0 ? history.index : history.index - 1;
                setHistory({
                  ...history,
                  index: newIndex,
                });
                setCurrentTheme(history.themes[newIndex]);
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </Button>
            <Button
              theme={currentTheme}
              className="control-item rounded"
              style={getButtonTheme()}
              onClick={() => {
                setStylePrimary(!stylePrimary);
              }}
              icon={
                stylePrimary ? (
                  <i className="far fa-window-maximize"></i>
                ) : (
                  <i className="fas fa-window-maximize"></i>
                )
              }
              innerHtml="Invert theme"
            />
            <Button
              theme={currentTheme}
              className="control-item"
              style={getButtonTheme()}
              outline
              onClick={() => {
                const newTheme = utils.randomTheme();
                setHistory({
                  index: history.index + 1,
                  themes: [...history.themes, newTheme],
                });
                setCurrentTheme(newTheme);
              }}
            >
              <i className="fas fa-random"></i>&nbsp;&nbsp;&nbsp;Shuffle Colors
            </Button>

            <Button
              theme={currentTheme}
              className="circle"
              style={stylePrimary ? "primary" : "secondary"}
              onClick={() => {
                const newIndex = (history.index + 1) % history.themes.length;
                setHistory({
                  ...history,
                  index: newIndex,
                });

                setCurrentTheme(history.themes[newIndex]);
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>

          <Button
            theme={currentTheme}
            className="save"
            style="accent"
            onClick={saveCurrentTheme}
          >
            <i className="fas fa-bookmark"></i>&nbsp;&nbsp;&nbsp;Add to palette
          </Button>
        </section>
      </section>

      {/* Palette Section  */}
      <section className="palette">
        <h1>Saved Themes</h1>
        <div className="pallete-items">{savedThemePalettes}</div>
      </section>
      <div></div>
    </div>
  );
}

export default App;
