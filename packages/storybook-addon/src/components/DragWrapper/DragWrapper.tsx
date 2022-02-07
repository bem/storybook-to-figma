import React from "react";
import { StoryContext } from "@storybook/addons";

import { DRAG_ACTIVE_ID } from "../../constants"
import { DragComponent } from "./DragComponent";
import { useIsWrapperEnabled } from "../../hooks/useIsWrapperEnabled";

export const DragWrapper = (StoryFn: any, context: StoryContext) => {
    const wrapperEnabled = useIsWrapperEnabled(DRAG_ACTIVE_ID, ["story"], context);

    if (wrapperEnabled) {
        return <DragComponent props={context.args} name="test">
            {StoryFn()}
        </DragComponent>
    } else {
        return StoryFn();
    }
};
