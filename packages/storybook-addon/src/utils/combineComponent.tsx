import { StoryContext } from "@storybook/addons";
import * as React from "react";
import generateArgTypeCombinations from "./generateArgTypeCombinations";

export default function combineComponent(storyFn: any, context : StoryContext, fieldsToCombine : any) : React.ReactElement {
    let combinations: any[] = generateArgTypeCombinations(fieldsToCombine, context.args);

    return <div>
        {combinations.map((combination) => 
            storyFn({ args : combination }, context)
        )}
    </div>
}