import { defaultFont, getDropOffset, addLayersToFrame } from 'html-figma/figma';
import FigmaRequestListener from './modules/figmaStorage/FigmaRequestListener';

const figmaRequestListener = new FigmaRequestListener(figma);

figma.showUI(__html__, {
  width: 750,
  height: 600,
})

figma.ui.onmessage = async (message) => {
  let data = message.data;

  if(data) {
    await processAddonMessage(message)
  } else {
    await figmaRequestListener.processPossibleRequest(message);
  }
}

async function processAddonMessage(message : any) : Promise<void> {
  await figma.loadFontAsync(defaultFont);

  let baseFrame: PageNode | FrameNode = figma.currentPage;

  const { data } = message;
  let { nodes, type } = data;

  for (const { id, layer, position, componentData } of nodes) {
    if (position) {
      const { x, y } = getDropOffset(position);
      layer.x = x;
      layer.y = y;
    }

    await addLayersToFrame([layer], baseFrame);
  }
}