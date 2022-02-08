/*
    FigmaStorage provides a WebStorage-like API to save
    data to Figma's clientStorage.
*/
import { FigmaStorageGetRequest, FigmaStorageRequest, FigmaStorageSetRequest } from "./FigmaStorageRequest";
import { RequestType } from "./RequestType";

export default class FigmaStorage {
    getItem(key : string) : Promise<unknown | undefined> {
        let request = {
            type : RequestType.GET,
            timestamp: Date.now(),
            payload: key,
        } as FigmaStorageGetRequest;

        return sendRequestAndExpectResult(request);
    }

    setItem(key : string, value : unknown) : Promise<void> {
        let request = {
            type: RequestType.SET,
            timestamp: Date.now(),
            payload: { key, value },
        } as FigmaStorageSetRequest;

        return sendRequestAndExpectResult(request) as Promise<void>;
    }
}

async function sendRequestAndExpectResult(request: FigmaStorageRequest): Promise<unknown | undefined> {
    sendRequest(request);

    return createPromiseForRequestResult(request)
}

async function sendRequest(request: FigmaStorageRequest) {
    window.parent.postMessage({ pluginMessage: request }, "https://www.figma.com");
}

function createPromiseForRequestResult(request: FigmaStorageRequest): Promise<any> {
    return new Promise((resolve, reject) => {
        window.addEventListener('message', (e) => {
            let responce = e.data.pluginMessage;

            if (responce?.timestamp === request.timestamp) {
                resolve(responce.result);
            }
        });

        setTimeout(() => reject("Request timeout"), 500);
    })
}