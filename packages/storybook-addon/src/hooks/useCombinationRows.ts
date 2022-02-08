import { useArgTypes } from "@storybook/api";
import { StrictArgTypes } from "@storybook/csf";

export function useCombinationRows() : StrictArgTypes {
    let argTypes = useArgTypes() as StrictArgTypes;

    let tableRows: StrictArgTypes = {}

    Object.entries(argTypes).forEach(([name, arg]) => {
        let newRow = {
            control: {
                type: undefined as string
            },
            description: arg.description,
            key: arg.name,
            name: arg.name,
            options: undefined as any,
        };

        if (arg.type.name === "boolean") {
            newRow.control.type = "inline-check";
            newRow.options = [true, false]

            tableRows[name] = newRow;
        } else if (arg.type.name === "enum") {
            newRow.control.type = "check";
            newRow.options = arg.type.value;

            tableRows[name] = newRow;
        }
        else {
            tableRows[name] = argTypes[name];
        }
    })

    return tableRows;
}