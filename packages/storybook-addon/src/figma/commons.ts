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

export const objectToPlainObject = (
    obj: unknown
): Record<string, string | number | object> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => typeof value !== 'function')
    )
};