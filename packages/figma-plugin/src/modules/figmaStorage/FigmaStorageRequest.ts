import { RequestType } from "./RequestType";

type KeyValuePair = { key: string, value: unknown | undefined};

export type FigmaStorageRequest = FigmaStorageSetRequest | FigmaStorageGetRequest

export interface FigmaStorageSetRequest {
    type: RequestType.SET,
    timestamp: number,
    payload: KeyValuePair,
}

export interface FigmaStorageGetRequest {
    type: RequestType.GET,
    timestamp: number,
    payload: string,
}