import * as React from "react";

import themes from '../../resources/styles/storybookItemThemes.module.css'
import '../../resources/styles/text.css'

import PlusIcon from "../../resources/icons/plus.svg"
import "../../resources/styles/addStorybookForm.css"

interface AddStorybookButtonProps {
    theme: string;
}

export default function AddStorybookForm(props: AddStorybookButtonProps) {
    if (!themes[props.theme]) {
        console.warn(`Unknown theme - ${props.theme}`)
    }

    return <div className={`add-storybook-form ${themes[props.theme]}`}>
        <div className="add-storybook-form-inputs">
            <input type="text" className="name-input large-text" placeholder="Storybook Name"></input>
            <input type="text" className="link-input small-text" placeholder="link/to/storybook"></input>
        </div>
        <PlusIcon/>
    </div>
}