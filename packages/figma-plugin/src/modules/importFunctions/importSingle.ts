import { addLayersToFrame, getDropOffset } from "html-figma/figma";

export const importSingle = async (nodes : any[], baseFrame : PageNode | FrameNode) => {
    for (const { id, layer, position, componentData } of nodes) {
        if (position) {
            const { x, y } = getDropOffset(position);
            layer.x = x;
            layer.y = y;
        }

        await addLayersToFrame([layer], baseFrame);
    }
}
