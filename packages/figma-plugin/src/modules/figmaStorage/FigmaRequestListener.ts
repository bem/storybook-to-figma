import FigmaRequest from "./FigmaRequest";
import RequestType from "./requestType";

export default class FigmaRequestListener {
    private figma : PluginAPI;

    constructor(figma : PluginAPI) {
        this.figma = figma;
    }

    async processPossibleRequest(request : any) {
        if (request?.type === undefined) return;

        if (request.type === RequestType.GET) {
            await this.processGetRequest(request);
        } else if(request.type === RequestType.SET) {
            await this.processSetRequest(request);
        }
    }

    private async processGetRequest(request: FigmaRequest) {
        let key = request.payload;

        let readResult = await this.figma.clientStorage.getAsync(key);

        this.sendResponceForRequest(request, readResult);
    }

    private async processSetRequest(request: FigmaRequest) {
        let { key, value } = request.payload;

        await this.figma.clientStorage.setAsync(key, value);
        this.sendResponceForRequest(request, "OK");
    }

    private sendResponceForRequest(request: FigmaRequest, result: any) {
       let responce = {
            timestamp: request.timestamp,
            result: result,
        }

        this.figma.ui.postMessage(responce);
    }
}