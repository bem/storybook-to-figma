import { useAddonState } from "@storybook/api";
import { COMBINATIONS_GLOBAL_ID } from "../constants";
import { sendVariantsToFigma } from "../figma/figma";
import { generateCombinations } from "../utils/generateCombinations";
import { useComponentName } from "./useComponentName";

export function useSendVariants() {
    let [fieldsToCombine] = useAddonState(COMBINATIONS_GLOBAL_ID, {});
    let combinations = generateCombinations(fieldsToCombine);
    let componentName = useComponentName();

    return () => {
        sendVariantsToFigma({
            blocks: combinations.map((props: any) => ({ name: componentName, props }))
        })
    };
}