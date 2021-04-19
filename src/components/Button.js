import React from 'react';
import * as utils from '../utils';

export default function Button(props) {

    return (
        <button style={utils.getCss(props.style, props.theme, props.outline)} onClick={props.onClick} className={props.className ?? ""}>
            {props.icon}{(props.icon && <>&nbsp;&nbsp;&nbsp;</>)}{props.innerHtml}
            {props.children}
        </button>
    )
}
