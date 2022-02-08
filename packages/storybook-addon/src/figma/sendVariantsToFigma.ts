import { htmlToFigma } from "html-figma/browser";
import { PlainLayerNode } from "html-figma/types";
import { objectToPlainObject } from "./commons";
import { pluginMessage } from "./commons";
import { FigmaMessageType } from "./types/FigmaMessageType";

interface SendVariantsToFigmaParams {
    elements: HTMLElement[],
    props: any[],
    componentName: string,
}

export const sendVariantsToFigma = (params : SendVariantsToFigmaParams) => {
    let elementsAndPropsCombined = combineElementsWithProps(params.elements, params.props);
    pluginMessage({
        type: FigmaMessageType.IMPORT_VARIANTS,
        data: {
            nodes: prepareNodesListForVariantsMessage(elementsAndPropsCombined, params.componentName)
        }
    }, true);
};

function combineElementsWithProps(elements: HTMLElement[], props: any[]) : [HTMLElement, any][] {
    return elements.map((element, index) => [element, props[index]])
}

function prepareNodesListForVariantsMessage(combinedElementsAndProps: [HTMLElement, any][], componentName: string) {
    return combinedElementsAndProps.map(([element, props]) => getNodeInfo(element, props, componentName))
}

function getNodeInfo(element: HTMLElement, props: any, componentName : string): any {
    let convertedLayer = htmlToFigma(element) as PlainLayerNode;

    return {
        componentData : {
            name: componentName,
            props: objectToPlainObject(props),
        },
        layer: convertedLayer,
    }
}