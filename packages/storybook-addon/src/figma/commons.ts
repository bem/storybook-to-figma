import { htmlToFigma } from "html-figma/browser";
import { PlainLayerNode } from "html-figma/types";

export function convertElementToSingleLayer(element : HTMLElement) {
    const layers = htmlToFigma(element) as PlainLayerNode[];

    return layers;
}

export const objectToPlainObject = (
    obj: unknown
): Record<string, string | number | object> => {
    return Object.keys(obj as Record<string, unknown>).reduce((res, key) => {
        // @ts-expect-error
        if (typeof obj[key] !== 'function') {
            // @ts-expect-error
            res[key] = obj[key];
        }

        return res;
    }, {});
};