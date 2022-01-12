import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { DRAG_ACTIVE_ID } from "../../constants";

export const DragEnable = () => {
  const [{ [DRAG_ACTIVE_ID] : addonActive }, updateGlobals] = useGlobals();

  const toggleDrag = useCallback(
    () =>
      updateGlobals({
        [DRAG_ACTIVE_ID]: addonActive ? undefined : true,
      }),
    [addonActive]
  );

  return (
    <IconButton
      key={DRAG_ACTIVE_ID}
      active={addonActive}
      title="Enable Drag'n'drop to Figma"
      onClick={toggleDrag}
    >
      <Icons icon="button"/>
    </IconButton>
  );
};
