import { StrictArgTypes } from "@storybook/csf";
import { generateCombinations } from "./generateCombinations";
import { Args } from "@storybook/addons";
import { combineParameters } from "@storybook/api";

export default function generateArgTypeCombinations(argTypes : StrictArgTypes, args : Args) {
    let fieldsToCombine : {[name : string] : Array<any> } = {};

    for(let [argName, argObject] of Object.entries(argTypes)) {
        if (argObject.type.name === "boolean") {
            fieldsToCombine[argName] = [true, false];
        } else if (argObject.type.name === "enum") {
            fieldsToCombine[argName] = argObject.type.value;
        }
    }
    
    let combinations = generateCombinations(fieldsToCombine) as Array<any>;

    // A 'combineParameters' function merges two objects, preferencing last one
    let combinationsMergedWithUncombinableProps = combinations.map((combination) =>
        combineParameters(args, combination)
    );

    return combinationsMergedWithUncombinableProps;
}