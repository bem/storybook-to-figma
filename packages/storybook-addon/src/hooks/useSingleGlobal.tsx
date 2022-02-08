import { useGlobals } from "@storybook/api";

export function useSingleGlobal(globalID : string) : [any, (newValue : any) => void] {
    const [{ [globalID]: globalValue }, updateGlobals] = useGlobals();

    let setValue = (newValue: any) => {
        updateGlobals({
            [globalID]: newValue
        })
    };

    return [globalValue, setValue];
}        