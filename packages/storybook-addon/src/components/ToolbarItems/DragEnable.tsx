import React from "react";
import { Icons, IconButton } from "@storybook/components";

import { DRAG_ACTIVE_ID } from "../../constants";
import { useSingleGlobal } from "../../hooks/useSingleGlobal";

export const DragEnable = () => {
  let [dragActive, setDragActive] = useSingleGlobal(DRAG_ACTIVE_ID);

  return (
    <IconButton
      key={DRAG_ACTIVE_ID}
      active={dragActive}
      title="Enable Drag'n'drop to Figma"
      onClick={() => { setDragActive(dragActive ? undefined : true) }}
    >
      <Icons icon="button"/>
    </IconButton>
  );
};
