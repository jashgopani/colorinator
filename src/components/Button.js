import React, { useState } from "react";
import contrast, * as utils from "../utils";
export default function Button(props) {
    const [hovered, setHovered] = useState(!props.outline);
    function handleMouseHover(e) {
        setHovered(!hovered)
    }
    return (
        <>
            <button
                style={utils.getCss(props.style, props.theme, !hovered)}
                onClick={props.onClick}
                className={props.className ?? ""}
                onPointerEnter={handleMouseHover}
                onPointerLeave={handleMouseHover}
            >
                {props.icon}
                {props.innerHtml}
                {props.children}
                {props.tooltip && <div className="tooltip rounded">{props.tooltip}</div>}

            </button>
        </>
    );
}
