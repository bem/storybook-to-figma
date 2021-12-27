import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID, ADDON_ACTIVE_ID } from "./constants";

export const Tool = () => {
  const [{ [ADDON_ACTIVE_ID] : addonActive }, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        [ADDON_ACTIVE_ID]: addonActive ? undefined : true,
      }),
    [addonActive]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={addonActive}
      title="Enable Storybook-To-Figma"
      onClick={toggleMyTool}
    >
      <Icons icon="grid" />
    </IconButton>
  );
};
