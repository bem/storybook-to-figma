import RequestType from "./requestType";

export default class FigmaRequest {
    type: RequestType;
    timestamp: number;
    payload?: any;

    constructor(type : RequestType, payload? : any) {
        this.type      = type;
        this.payload   = payload;
        
        this.timestamp = Date.now();
    }
}