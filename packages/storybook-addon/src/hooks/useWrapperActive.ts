import { useGlobals } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { StoryContext } from "@storybook/csf";

export function useWrapperActive(globalEnabledID : string, activeViewModes: string[], context : StoryContext) {
    const [{ [globalEnabledID]: wrapperActive }] = useGlobals();

    return wrapperActive && activeViewModes.includes(context.viewMode);
}