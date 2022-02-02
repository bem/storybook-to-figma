import React from "react";
import { ArgsTable, Button } from "@storybook/components";
import { useCombinationRows } from "../../hooks/useCombinationRows";
import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID, SEND_VARIANTS_TO_FIGMA_ID } from "../../constants";
import { useAddonState, useStorybookApi } from "@storybook/api";
import { useGlobals } from "@storybook/api";
import EnableCombinationsPrompt from "./EnableCombinationsPrompt";
import addons, { useStoryContext } from "@storybook/addons";
import { useComponentName } from "../../hooks/useComponentName";

export function CombinePanel() {
    let tableRows = useCombinationRows();
    let channel = addons.getChannel();
    let currentComponentName = useComponentName();

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
            channel.emit("sendVariantsToFigma", currentComponentName)
        }}>Send component to Figma</Button>
    </>
}