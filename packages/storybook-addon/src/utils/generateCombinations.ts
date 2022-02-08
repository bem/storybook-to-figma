/*
    This file's code is based on this reply: https://stackoverflow.com/a/66485675



    Cross product function takes the array of arrays of possible parameter options,
    for instance: 
    > [[1, 2], ['a', 'b', 'c'], ['T', 'F']]

    And returns all the combinations of said options:
    > [
    >   [1, 'a', 'T'], [1, 'a', 'F'], [1, 'b', 'T'], [1, 'b', 'F'], [1, 'c', 'T'], [1, 'c', 'F'], 
    >   [2, 'a', 'T'], [2, 'a', 'F'], [2, 'b', 'T'], [2, 'b', 'F'], [2, 'c', 'T'], [2, 'c', 'F']
    > ]
*/
const crossproduct = (xss : unknown[][]) => 
    xss.reduce((xs, ys) => 
        xs.flatMap((x : unknown[]) => 
            ys.map((y : unknown) => 
            [...x, y]
        )
    ), [[]])

/*
    generateCombinations function takes an object with values being either
    arrays of options or simple strings.

    Then it passes values of the object to the crossproduct function, which generates
    all their combinations, and then these combinations are combined back into objects
*/
export const generateCombinations = (o: {[s: string]: (unknown[] | string)}) => {
    let keys   = Object.keys(o);
    // If there are strings in our values, we must wrap them in array
    let values = Object.values(o).map((value) => 
        typeof value === "string" ? [value] : value
    );

    return crossproduct(values).map((xs : unknown[]) =>
        Object.fromEntries(xs.map((x : unknown, i : number) => 
            [keys[i], x])
        )
    );
}