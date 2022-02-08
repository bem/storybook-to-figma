import { Story, useStorybookApi, useStorybookState } from "@storybook/api";

export function useCurrentStory() : [story : Story, storyLoaded : boolean] {
    let state = useStorybookState();
    let api = useStorybookApi();
    let storyId = state.storyId;

    if(!api) return [undefined, false];

    let story = api.resolveStory(storyId) as Story;
    return story ? [story, true] : [undefined, false];
}