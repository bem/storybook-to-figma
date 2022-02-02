import { StoryContext } from "@storybook/addons";
import * as React from "react";
import generateArgTypeCombinations from "./generateArgTypeCombinations";

export function combineComponent(storyFn: any, context : StoryContext, fieldsToCombine : any) : [React.ReactElement, any[]] {
    let combinations: any[] = generateArgTypeCombinations(fieldsToCombine, context.args);

    return [<>
        {combinations.map((combination) => 
            storyFn({ args : combination }, context)
        )}
    </>, combinations]
}