import React, { useState } from "react";
import contrast, * as utils from "../utils";
export default function Button(props) {
    const [hovered, setHovered] = useState(!props.outline);
    function handleMouseHover(e) {
        setHovered(!hovered)
        console.log("button hover", props.style, props.theme, hovered)
    }
    return (
        <button
            style={utils.getCss(props.style, props.theme, !hovered)}
            onClick={props.onClick}
            className={props.className ?? ""}
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseHover}
        >
            {props.icon}
            {props.icon && <>&nbsp;&nbsp;&nbsp;</>}
            {props.innerHtml}
            {props.children}
        </button>
    );
}
