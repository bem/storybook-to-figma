import { htmlToFigma } from "html-figma/browser";
import { PlainLayerNode } from "html-figma/types";

import { FigmaMessages } from "./types/FigmaMessageType";

export const pluginMessage = (data: FigmaMessages, parent = false) => {
    const handlerWindow = window.parent;
    (parent ? handlerWindow.parent : handlerWindow).postMessage(
        {
            pluginMessage: data,
        },
        '*'
    );
};

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