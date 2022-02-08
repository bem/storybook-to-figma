import { COMBINATIONS_ACTIVE_ID, COMBINATIONS_GLOBAL_ID, DRAG_ACTIVE_ID } from "../constants";
import { CombineWrapper } from "../components/CombineWrapper/CombineWrapper";
import { DragWrapper } from "../components/DragWrapper/DragWrapper";

export const decorators = [DragWrapper, CombineWrapper];

export const globalTypes  = {
    [COMBINATIONS_ACTIVE_ID]: {
        name: COMBINATIONS_ACTIVE_ID,
        description: 'Flag for components combination',
        defaultValue: false,
    },
    
    [DRAG_ACTIVE_ID]: {
        name: DRAG_ACTIVE_ID,
        description: 'Flag for enabling dragging to Figma',
        defaultValue: false,
    },

    [COMBINATIONS_GLOBAL_ID]: {
        name: COMBINATIONS_GLOBAL_ID,
        description: 'Options selected to be combined',
        defaltValue: {},
    }
}