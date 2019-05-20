import { Asset } from './asset';

export interface PolyListResponse {
    assets: Array<Asset>;
    nextPageToken: string;
    totalSize: number;
}
