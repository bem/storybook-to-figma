import { PlainLayerNode } from 'html-figma/types';

export enum FigmaMessageType {
    IMPORT,
    UPDATE,
    RENDER,
    IMPORT_VARIANTS,
    APPLY_TOKEN,
    APPLY_TOKENS,
    SELECT_NODE,
    CLEAR_SELECTION,
    RENDER_TOKENS_SYNC,
}

type FigmaImportTypes = 'variants' | 'single';

type LayerPosition = {
    dropPosition: { clientX: number; clientY: number };
    offset: {
        x: number;
        y: number;
    };
    windowSize: { width: number; height: number };
};

type FigmaMessageImportPayload = {
    nodes: {
        layer: PlainLayerNode;
        componentData: { name: string; props: unknown };
        id?: string;
        position?: LayerPosition;
    }[];
    type: FigmaImportTypes
};
export interface FigmaImportMessage {
    type: FigmaMessageType.IMPORT;
    data: FigmaMessageImportPayload;
}

export interface FigmaImportVariantsMessage {
    type: FigmaMessageType.IMPORT_VARIANTS;
    data: {
        nodes: FigmaImportVariantsNode[];
    };
}

export interface FigmaImportVariantsNode {
    layer: PlainLayerNode;
    componentData: { name: string; props: any[] };
}

export interface FigmaRenderMessage {
    type: FigmaMessageType.RENDER;
    data: {
        blocks: { figmaId?: string; name: string; props: unknown }[];
        position?: LayerPosition;
        type: FigmaImportTypes
    };
}

export interface FigmaRenderTokenSyncMessage {
    type: FigmaMessageType.RENDER_TOKENS_SYNC;
    data: Record<string, string>;
}

export interface FigmaApplyAllTokensMessagePayload {
    tokens: Record<string, string>;
}

export interface FigmaApplyAllTokensMessage {
    type: FigmaMessageType.APPLY_TOKENS;
    data: FigmaApplyAllTokensMessagePayload;
}

export interface FigmaClearSelectionMessage {
    type: FigmaMessageType.CLEAR_SELECTION;
}

export type FigmaMessages =
    | FigmaImportMessage
    | FigmaImportVariantsMessage
    | FigmaApplyAllTokensMessage
    | FigmaRenderMessage
    | FigmaRenderTokenSyncMessage;

export type FigmaPluginMessages =
    | FigmaClearSelectionMessage;

export interface PluginMessageEvent extends MessageEvent {
    data: FigmaMessages;
}

export interface FigmaMessageEvent extends MessageEvent {
    data: FigmaPluginMessages;
}
