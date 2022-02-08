import React from "react"
import { StoryContext } from "@storybook/addons";

import generateArgTypeCombinations from "./generateArgTypeCombinations";

export function combineComponent(storyFn: any, context: StoryContext, fieldsToCombine: { [s: string]: (unknown[] | string) }) {
    let combinations: any[] = generateArgTypeCombinations(fieldsToCombine, context.args);

    return [ combinations.map((combination) => 
            storyFn({ args : combination }, context)
    ), combinations]
}