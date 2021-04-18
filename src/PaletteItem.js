import React from "react";
import * as utils from './utils';
import Color from 'jscolor';

export default function PaletteItem({ theme }) {
    const primary = new Color(theme.primary);
    const secondary = new Color(theme.secondary);
    const accent = new Color(theme.accent);
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
        <div className="pallete-item">
            <div className="pallete-item-primary" style={primaryBgCss}></div>
            <div className="pallete-item-secondary" style={secondaryBgCss}></div>
            <div className="pallete-item-accent" style={accentBgCss}></div>
        </div>
    );
}
