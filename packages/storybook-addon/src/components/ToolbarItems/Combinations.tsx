import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { COMBINATIONS_ACTIVE_ID } from "../../constants";

export const Combinations = () => {
  const [{ [COMBINATIONS_ACTIVE_ID] : addonActive }, updateGlobals] = useGlobals();

  const toggleCombinations = useCallback(
    () =>
      updateGlobals({
        [COMBINATIONS_ACTIVE_ID]: addonActive ? undefined : true,
      }),
    [addonActive]
  );

  return (
    <IconButton
      key={COMBINATIONS_ACTIVE_ID}
      active={addonActive}
      title="Enable Combinations"
      onClick={toggleCombinations}
    >
      <Icons icon="ellipsis"/>
    </IconButton>
  );
};
