import { Args, StoryContext, StoryFn } from "@storybook/addons";
import * as React from "react";
import generateArgTypeCombinations from "../utils/generateArgTypeCombinations";

export default function useCombine(storyFn: any, context : StoryContext, args: Args) : React.ReactElement {
    let combinations: any[] = generateArgTypeCombinations(context.argTypes, args);

    return <div>
        {combinations.map((combination) => 
            storyFn({ args : combination}, context)
        )}
    </div>
}