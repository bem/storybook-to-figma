/*
    FigmaStorage provides a WebStorage-like API to save
    data to Figma's clientStorage.
*/
import FigmaRequest from "./FigmaRequest";
import RequestType from "./requestType";

export default class FigmaStorage {
    getItem(key : string) : Promise<any | undefined> {
        let request = new FigmaRequest(RequestType.GET, key);

        return sendRequestAndExpectResult(request);
    }

    setItem(key : string, value : any) : Promise<void> {
        let request = new FigmaRequest(RequestType.SET, {key, value});

        return sendRequestAndExpectResult(request);
    }
}

async function sendRequestAndExpectResult(request : FigmaRequest) : Promise<any | undefined> {
    sendRequest(request);

    return createPromiseForRequestResult(request)
}

async function sendRequest(request : FigmaRequest) {
    window.parent.postMessage({ pluginMessage: request }, "https://www.figma.com");
}

function createPromiseForRequestResult(request: FigmaRequest): Promise<any> {
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