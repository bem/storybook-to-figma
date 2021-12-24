import * as React from "react";

import themes from '../../resources/styles/storybookItemThemes.module.css'
import '../../resources/styles/text.css'
import '../../resources/styles/storybookItem.css'
import TrashIcon from '../../resources/icons/trash.svg';

interface StorybookItemProps {
    name  : string,
    link  : string,
    theme : string,
}

export default function StorybookItem(props : StorybookItemProps) {
    if(!themes[props.theme]) {
        console.warn(`Unknown theme - ${props.theme}`)
    }

    return <div className={`storybook-item ${themes[props.theme]}`}>
        <div className="storybook-item-text">
            <span className="large-text">{props.name}</span>
            <span className="small-text">{props.link}</span>
        </div>

        <TrashIcon/>
    </div>
}