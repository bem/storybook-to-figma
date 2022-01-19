import { Story, useStorybookApi, useStorybookState, useStoryPrepared } from "@storybook/api";
import { useCurrentStory } from "./useCurrentStory";

const STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;

export function useComponentName() {
    let [story, storyLoaded] = useCurrentStory();

    if(!storyLoaded) return "Undefined"

    return story.kind.split(STORY_KIND_PATH_SEPARATOR).pop();
}