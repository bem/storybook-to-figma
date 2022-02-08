import React from "react";
import addons from "@storybook/addons";
import { useAddonState } from "@storybook/api";
import { useGlobals } from "@storybook/api";
import { ArgsTable, Button } from "@storybook/components";
import { useCombinationRows } from "../../hooks/useCombinationRows";

import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID } from "../../constants";
import EnableCombinationsPrompt from "./EnableCombinationsPrompt";
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
            updateArgs={(changedArgs) => setArgs({ ...args, ...changedArgs })}
        />
        
        <Button primary={true} onClick={() => channel.emit("sendVariantsToFigma", currentComponentName)}>
            Send component to Figma
        </Button>
    </>
}