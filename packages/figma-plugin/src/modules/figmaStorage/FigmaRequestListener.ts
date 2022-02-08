import { FigmaStorageRequest, FigmaStorageSetRequest, FigmaStorageGetRequest } from "./FigmaStorageRequest";
import { RequestType } from "./RequestType";

export default class FigmaRequestListener {
    private figma : PluginAPI;

    constructor(figma : PluginAPI) {
        this.figma = figma;
    }

    async processPossibleMessage(message : FigmaStorageRequest) {
        if (message?.type === undefined) return;

        if (message.type === RequestType.GET) {
            await this.processGetMessage(message);
        } else if (message.type === RequestType.SET) {
            await this.processSetMessage(message);
        }
    }

    private async processGetMessage(request: FigmaStorageGetRequest) {
        let key = request.payload;

        let readResult = await this.figma.clientStorage.getAsync(key) as unknown;

        this.sendResponceForRequest(request, readResult);
    }

    private async processSetMessage(request: FigmaStorageSetRequest) {
        let { key, value } = request.payload;

        await this.figma.clientStorage.setAsync(key, value);
        this.sendResponceForRequest(request, "OK");
    }

    private sendResponceForRequest(request: FigmaStorageRequest, result: unknown) {
       let responce = {
            timestamp: request.timestamp,
            result: result,
        }

        this.figma.ui.postMessage(responce);
    }
}