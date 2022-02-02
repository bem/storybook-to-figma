import React from "react";
import { ArgsTable, Button } from "@storybook/components";
import { useCombinationRows } from "../../hooks/useCombinationRows";
import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID } from "../../constants";
import { useAddonState } from "@storybook/api";
import { useGlobals } from "@storybook/api";
import EnableCombinationsPrompt from "./EnableCombinationsPrompt";
import { useSendVariants } from "../../hooks/useSendVariants";
import { useComponentName } from "../../hooks/useComponentName";
import { useStoryContext } from "@storybook/addons";
import { useCurrentStory } from "../../hooks/useCurrentStory";

export function CombinePanel() {
    let tableRows = useCombinationRows();
    let sendVariantsToFigma = useSendVariants();

    console.log(useCurrentStory())

    const [{ [COMBINATIONS_ACTIVE_ID]: combinationsActive }] = useGlobals();
    let [args, setArgs] = useAddonState(COMBINATIONS_GLOBAL_ID, {});

    if (!combinationsActive) return <EnableCombinationsPrompt/>

    return <>
        <ArgsTable
            rows={tableRows}
            resetArgs={function noRefCheck() { }}
            updateArgs={(changedArgs) => {
                setArgs({ ...args, ...changedArgs });
            }}/>
        <Button primary={true} onClick={() => {
            sendVariantsToFigma();
        }}>Send component to Figma</Button>
    </>
}