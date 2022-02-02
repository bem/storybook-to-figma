import React from "react";

import { StoryContext } from "@storybook/addons";
import { useGlobals } from "@storybook/addons";
import { DRAG_ACTIVE_ID } from "../../constants"
import { DragComponent } from "./DragComponent";
import { useWrapperActive } from "../../hooks/useWrapperActive";

export const DragWrapper = (StoryFn: any, context: StoryContext) => {
    const wrapperEnabled = useWrapperActive(DRAG_ACTIVE_ID, ["story"], context);

    if (wrapperEnabled) {
        return <DragComponent props={context.args} name="test">
            {StoryFn()}
        </DragComponent>
    } else {
        return StoryFn();
    }
};
