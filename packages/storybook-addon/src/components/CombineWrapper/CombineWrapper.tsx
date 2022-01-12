import { StoryContext } from "@storybook/addons";
import { useGlobals } from "@storybook/addons";
import { COMBINATIONS_ACTIVE_ID } from "../../constants"
import useCombine from "../../hooks/useCombine";

export const CombineWrapper = (StoryFn: any, context: StoryContext) => {
  const [{ [COMBINATIONS_ACTIVE_ID] : addonActive }] = useGlobals();

  const enabled = context.viewMode === "story" && addonActive;
  if (!enabled) {
    return StoryFn();
  }

  let multipliedComponent = useCombine(StoryFn, context, context.args);

  return multipliedComponent;
};
