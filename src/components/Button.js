import React, { useState } from "react";
import contrast, * as utils from "../utils";
export default function Button(props) {
    const [buttonStyle, setButtonStyle] = useState();
    const [hovered, setHovered] = useState(!props.outline);
    function handleMouseHover(e) {
        //@TODO - update font color of button
    }
    return (
        <>
            <button
                style={utils.getBasicStyle(props.style, props.theme, null)}
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
