import { htmlToFigma } from 'html-figma/browser';
import { PlainLayerNode } from 'html-figma/types';

import {
    FigmaApplyAllTokensMessagePayload,
    FigmaApplyTokenMessagePayload,
    FigmaMessages,
    FigmaMessageType,
    FigmaRenderMessage,
} from './FigmaMessageType';

interface SendToFigmaParams {
    // blocks: { figmaId?: string, name: string; props: unknown }[],
    el: HTMLElement;
    name: string;
    props: unknown;
    type?: FigmaRenderMessage['data']['type'],
    position?: {
        dropPosition: { clientX: number; clientY: number };
        offset: {
            x: number;
            y: number;
        };
        windowSize: { width: number; height: number };
    };
}

export const pluginMessage = (data: FigmaMessages, parent = false) => {
    const handlerWindow = window.parent;
    (parent ? handlerWindow.parent : handlerWindow).postMessage(
        {
            pluginMessage: data,
        },
        '*'
    );
};

const objectToPlainObject = (
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

export const rendererMessage = (data: FigmaMessages) => {
    // @ts-expect-error
    const frame = document?.getElementById('renderer-frame')?.contentWindow;

    frame?.postMessage(data, '*');
};

export const renderMessage = (data: FigmaRenderMessage['data']) => {
    rendererMessage({
        type: FigmaMessageType.RENDER,
        data: data,
    });
};

export const rendererSyncThemeMessage = (cssTokens: Record<string, string>) => {
    rendererMessage({
        type: FigmaMessageType.RENDER_TOKENS_SYNC,
        data: cssTokens,
    });
};

// export const sendToFigma = ({
//     id,
//     props = {},
//     name,
//     elem,
//     position,
// }: SendToFigmaParams) => {
//     // const result = elem ? htmlToFigma(elem) : null;

//     renderMessage({
//         block: { name, props: objectToPlainObject(props) },
//         position,
//         type: 'single',
//     });
// };

export const sendToFigma = ({
    el,
    name,
    props,
    position,
    type = 'single'
}: SendToFigmaParams) => {

    const layers = htmlToFigma(el as HTMLElement) as PlainLayerNode;

    const result = layers as PlainLayerNode[];
    console.log(result, el);
    pluginMessage(
        {
            type: FigmaMessageType.IMPORT,
            data: {
                // @ts-expect-error
                nodes: [result].map(({ children }, index) => {
                    const layer = children[0];
                    // const { name, props, figmaId } = components[index];

                    return {
                        // id: figmaId,
                        layer,
                        componentData: { name, props },
                        position
                    }
                }),
                type
            },
        },
        true
    );

    // renderMessage({
    //     blocks: blocks.map(({ figmaId, name, props }) => ({
    //         name,
    //         figmaId,
    //         props: objectToPlainObject(props),
    //     })),
    //     position,
    //     type,
    // });
};

export const applyTokenToFigma = (payload: FigmaApplyTokenMessagePayload) => {
    pluginMessage({
        type: FigmaMessageType.APPLY_TOKEN,
        data: payload,
    });
};

export const applyAllTokensToFigma = (
    payload: FigmaApplyAllTokensMessagePayload
) => {
    pluginMessage({
        type: FigmaMessageType.APPLY_TOKENS,
        data: payload,
    });
};
