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
    pluginMessage(
        {
            type: FigmaMessageType.IMPORT,
            data: {
                nodes: [{
                    layer : layers.children[0],
                    componentData: { name, props },
                    position,
                }]
            } as any,
        }, true
    );
};
