import { htmlToFigma } from "html-figma/browser";
import { PlainLayerNode } from "html-figma/types";
import { pluginMessage } from "./commons";
import { FigmaMessageType, FigmaRenderMessage } from "./types/FigmaMessageType";

interface SendSingleToFigmaParams {
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

export const sendSingleToFigma = ({
    el,
    name,
    props,
    position
}: SendSingleToFigmaParams) => {
    const layers = htmlToFigma(el as HTMLElement) as PlainLayerNode;

    const result = layers as PlainLayerNode[];
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
                })
            },
        }, true
    );
};
