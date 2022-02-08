import { addLayersToFrame, getDropOffset } from "html-figma/figma";
import { FigmaImportVariantsNode } from "../FigmaMessageType";

export const importVariants = async (nodes: FigmaImportVariantsNode[], baseFrame: PageNode | FrameNode) => {
    let addedNodes: SceneNode[] = [];

    for(let { layer, componentData } of nodes) {
        const componentLayer = {
            ...layer,
            type: "COMPONENT",
        } as any;

        await addLayersToFrame([componentLayer], baseFrame, ({ node, parent }) => {
            if (!parent) {
                node.setPluginData('componentData', JSON.stringify(componentData));
                addedNodes.push(node);
            }
        });
    }

    addCoordinatesToNodes(addedNodes);
    figma.combineAsVariants(addedNodes as ComponentNode[], baseFrame);

    addedNodes.forEach((node, index) => {
        node.name = getVariantNameFromProps(nodes[index].componentData.props as any)
    });
} 

const addCoordinatesToNodes = (nodes : any[]) => {
    const { x, y } = figma.viewport.center;

    let offsetTop = 0;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].x = x;
        nodes[i].y = y + offsetTop;
        offsetTop += (nodes[i].height || 100) + 10;
    }
}
const getVariantNameFromProps = (props: Record<string, string>) => {
    return Object.keys(props)
        .filter((key) => key !== 'children')
        .map((key) => `${key}=${props[key]}`)
        .join(', ');
};