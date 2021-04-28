import React from "react";
import * as utils from "./utils";
import Color from "jscolor";
import { useState } from "react";
import Button from "./components/Button";

export default function PaletteItem({ theme, stylePrimary }) {
    const primary = new Color(theme.primary);
    const secondary = new Color(theme.secondary);
    const accent = new Color(theme.accent);

    const [pHoverd, setPHoverd] = useState(false);
    const [sHoverd, setSHoverd] = useState(false);
    const [aHoverd, setAHoverd] = useState(false);

    const primaryBgCss = {
        background: primary.hex,
        color: utils.getContrastingColor(primary).hex,
    };

    const secondaryBgCss = {
        background: secondary.hex,
        color: utils.getContrastingColor(secondary).hex,
    };

    const accentBgCss = {
        background: accent.hex,
        color: utils.getContrastingColor(accent).hex,
    };
    return (
        <div className="palette-item-container" style={{ backgroundColor: secondary.hex }}>

            <div className="pallete-colors">
                <div
                    className="pallete-item-primary"
                    style={primaryBgCss}
                    onMouseEnter={() => setPHoverd(true)}
                    onMouseLeave={() => setPHoverd(false)}
                >60%<br />{primary.hex}</div>
                <div
                    className="pallete-item-secondary"
                    style={secondaryBgCss}
                    onMouseEnter={() => setSHoverd(true)}
                    onMouseLeave={() => setPHoverd(false)}
                >30% <br />{secondary.hex}</div>
                <div
                    className="pallete-item-accent"
                    style={accentBgCss}
                    onMouseEnter={() => setAHoverd(true)}
                    onMouseLeave={() => setPHoverd(false)}
                >10% <br />{accent.hex}</div>
            </div>

            <div className="palette-controls-container">
                <Button theme={{ primary, secondary, accent }} style="primary" >
                    <i className="fa fa-trash"></i>
                </Button>
                <Button theme={{ primary, secondary, accent }} style="accent">
                    <i className="fa fa-copy"></i>
                </Button>
            </div>

        </div>
    );
}
