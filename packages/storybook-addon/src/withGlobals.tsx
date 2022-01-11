import { StoryFn as StoryFunction, StoryContext } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import React from "react";
import { ComponentWrapper } from './components/ComponentWrapper/ComponentWrapper';
import { ADDON_ACTIVE_ID } from "./constants"
import useCombine from "./hooks/useCombine";

// TODO: Dirty fix was used here to resolve issues with types
export const withGlobals = (StoryFn: any, context: StoryContext) => {
  const [{ [ADDON_ACTIVE_ID] : addonActive }] = useGlobals();

  const enabled = context.viewMode === "story" && addonActive;
  if (!enabled) {
    return StoryFn();
  }

  let multipliedComponet = useCombine(StoryFn, context, context.args);

  return (  
      <ComponentWrapper props={context.args} name="test">
        {multipliedComponet}
      </ComponentWrapper>
  );
};
