import { useGlobals } from "@storybook/addons";
import { StoryContext } from "@storybook/csf";

export function useIsWrapperEnabled(globalEnabledID : string, activeViewModes: string[], context : StoryContext) {
    const [{ [globalEnabledID]: wrapperActive }] = useGlobals();

    return wrapperActive && activeViewModes.includes(context.viewMode);
}