import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolyListRequest } from './poly-list-request';
import { PolyListResponse } from './poly-list-response';
import { Asset } from './asset';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolyService {

  public static POLY_ENDPOINT = 'https://poly.googleapis.com/v1/assets';

  constructor(
    private http: HttpClient
  ) { }

  listAssets(polyListRequest: PolyListRequest): Observable<PolyListResponse> {
    return this.http.get<PolyListResponse>(
      PolyService.POLY_ENDPOINT, { params: { ...polyListRequest, key: environment.poly.apiKey } }
    );
  }

  getAsset(assetId: string): Observable<Asset> {
    return this.http.get<Asset>(
      `${PolyService.POLY_ENDPOINT}/${assetId}/`, { params: { key: environment.poly.apiKey } }
    );
  }
}
