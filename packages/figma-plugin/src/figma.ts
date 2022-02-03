import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';
import { FigmaMessageType } from './modules/FigmaMessageType';
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

  console.log(data);

  if(data) {
    await processAddonMessage(message)
  } else {
    await figmaRequestListener.processPossibleRequest(message);
  }
}

async function processAddonMessage(message : any) : Promise<void> {
  await figma.loadFontAsync(defaultFont);

  let baseFrame: PageNode | FrameNode = figma.currentPage;

  const { data, type } = message;
  let { nodes } = data;

  if(type === FigmaMessageType.IMPORT) {
    importSingle(nodes, baseFrame)
  } else if(type === FigmaMessageType.IMPORT_VARIANTS) {
    importVariants(nodes, baseFrame)
  } else {
    console.warn("Unknown message type :" + type)
  }
}