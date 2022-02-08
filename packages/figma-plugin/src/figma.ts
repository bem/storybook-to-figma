import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';
import { FigmaImportMessage, FigmaImportVariantsMessage, FigmaImportVariantsNode, FigmaMessageType } from './modules/FigmaMessageType';
import FigmaRequestListener from './modules/figmaStorage/FigmaRequestListener';
import { importSingle } from './modules/importFunctions/importSingle';
import { importVariants } from './modules/importFunctions/importVariants';

const figmaRequestListener = new FigmaRequestListener(figma);

figma.showUI(__html__, {
  width: 1125,
  height: 900,
})

figma.ui.onmessage = async (message) => {
  let data = message.data;

  if(data) {
    await processAddonMessage(message)
  } else {
    await figmaRequestListener.processPossibleMessage(message);
  }
}

async function processAddonMessage(message : FigmaImportMessage | FigmaImportVariantsMessage) : Promise<void> {
  await figma.loadFontAsync(defaultFont);

  let baseFrame: PageNode | FrameNode = figma.currentPage;

  const { data, type } = message;
  let { nodes } = data;

  if(type === FigmaMessageType.IMPORT) {
    importSingle(nodes, baseFrame)
  } else if(type === FigmaMessageType.IMPORT_VARIANTS) {
    importVariants(nodes as FigmaImportVariantsNode[], baseFrame)
  } else {
    console.warn("Unknown message type :" + type)
  }
}