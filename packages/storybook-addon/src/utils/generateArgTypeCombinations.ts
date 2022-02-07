import { Args } from "@storybook/addons";
import { combineParameters } from "@storybook/api";

import { generateCombinations } from "./generateCombinations";

export default function generateArgTypeCombinations(fieldsToCombine : any, args : Args) {
    let combinations = generateCombinations(fieldsToCombine) as Array<any>;

    // A 'combineParameters' function merges two objects, preferencing last one
    let combinationsMergedWithUncombinableProps = combinations.map((combination) =>
        combineParameters(args, combination)
    );

    return combinationsMergedWithUncombinableProps;
}