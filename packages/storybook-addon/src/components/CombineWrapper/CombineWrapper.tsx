import { StoryContext } from "@storybook/addons";
import { useGlobals } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID, CURRENT_STORY_FN_ID } from "../../constants"
import combineComponent from "../../utils/combineComponent";

export const CombineWrapper = (StoryFn: any, context: StoryContext) => {
  const [{ [COMBINATIONS_ACTIVE_ID] : combinationsActive }] = useGlobals();
  let [fieldsToCombine] = useAddonState(COMBINATIONS_GLOBAL_ID, {});

  const enabled = context.viewMode === "story" && combinationsActive;

  return enabled ? combineComponent(StoryFn, context, fieldsToCombine) : StoryFn();
};
