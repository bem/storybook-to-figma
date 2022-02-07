const crossproduct = (xss : any[]) => 
    xss.reduce((xs, ys) => 
        xs.flatMap((x : any) => 
            ys.map((y : any) => 
            [...x, y]
        )
    ), [[]])

export const generateCombinations = (o: {[s: string]: unknown}) => {
    let keys   = Object.keys(o);
    let values = Object.values(o).map((value) => 
        typeof value === "string" ? [value] : value
    );

    return crossproduct(values).map((xs : any) =>
        Object.fromEntries(xs.map((x : any, i : number) => 
            [keys[i], x])
        )
    );
}