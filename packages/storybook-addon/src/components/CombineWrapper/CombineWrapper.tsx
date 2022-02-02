import { StoryContext } from "@storybook/addons";
import { useGlobals } from "@storybook/addons";
import { addons } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import * as React from "react";
import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID, CURRENT_STORY_FN_ID, SEND_VARIANTS_TO_FIGMA_ID } from "../../constants"
import { sendSingleToFigma } from "../../figma/figma";
import { combineComponent } from "../../utils/combineComponent";
import { useWrapperActive } from "../../hooks/useWrapperActive";
import { sendVariantsToFigma } from "../../figma/sendVariantsToFigma";

export const CombineWrapper = (StoryFn: any, context: StoryContext) => {
  let ref = React.useRef(null);
  const wrapperEnabled = useWrapperActive(COMBINATIONS_ACTIVE_ID, ["story"], context);
  let [fieldsToCombine] = useAddonState(COMBINATIONS_GLOBAL_ID, {});
  let channel = addons.getChannel();

  let [combinedComponents, props] = combineComponent(StoryFn, context, fieldsToCombine);

  channel.removeAllListeners("sendVariantsToFigma");
  channel.on("sendVariantsToFigma", (componentName) => {
    if (ref.current !== null) {
      sendVariantsToFigma({
        elements: Array.from(ref.current.children) as HTMLElement[],
        props: props,
        componentName: componentName,
      })
    }
  })

  return wrapperEnabled ? <div ref={ref}>
    {combinedComponents}
  </div> : StoryFn();
};