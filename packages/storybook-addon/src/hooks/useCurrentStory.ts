import { Story, useStorybookApi, useStorybookState } from "@storybook/api";

export function useCurrentStory() : [story : Story, storyLoaded : boolean] {
    let state = useStorybookState();
    let api = useStorybookApi();
    let storyId = state.storyId;

    let story = api.resolveStory(storyId) as Story;

    return story ? [story, true] : [undefined, false];
}