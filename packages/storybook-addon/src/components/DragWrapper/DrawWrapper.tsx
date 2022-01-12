import React from "react";

import { StoryContext } from "@storybook/addons";
import { useGlobals } from "@storybook/addons";
import { DRAG_ACTIVE_ID } from "../../constants"
import { DragComponent } from "./DragComponent";

export const DragWrapper = (StoryFn: any, context: StoryContext) => {
    const [{ [DRAG_ACTIVE_ID]: addonActive }] = useGlobals();

    const enabled = context.viewMode === "story" && addonActive;

    if(enabled) {
        return <DragComponent props={context.args} name="test">
            {StoryFn()}
        </DragComponent>
    } else {
        return StoryFn();
    }
};
