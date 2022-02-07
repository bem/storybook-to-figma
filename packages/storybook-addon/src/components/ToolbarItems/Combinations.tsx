import React from "react";
import { Icons, IconButton } from "@storybook/components";

import { COMBINATIONS_ACTIVE_ID } from "../../constants";
import { useSingleGlobal } from "../../hooks/useSingleGlobal";

export const Combinations = () => {
  let [combinationsActive, setCombinationsActive] = useSingleGlobal(COMBINATIONS_ACTIVE_ID);

  return (
    <IconButton
      key={COMBINATIONS_ACTIVE_ID}
      active={combinationsActive}
      title="Enable Combinations"
      onClick={() => { setCombinationsActive(combinationsActive ? undefined : true) }}
    >
      <Icons icon="ellipsis"/>
    </IconButton>
  );
};
