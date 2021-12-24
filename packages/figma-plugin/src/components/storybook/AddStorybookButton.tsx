import * as React from "react";

import PlusIcon from "../../resources/icons/plus.svg"
import "../../resources/styles/addStorybookButton.css"

export default function AddStorybookButton() {
    return <div className="add-storybook-button">
        <div className="add-storybook-button-container">
            <span className="large-text-large-line">Add a new Storybook</span>
        </div>
        <PlusIcon/>
    </div>
}