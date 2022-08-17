import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../models/asset';
import { Offer } from '../models/offer';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAllParticipants(): Observable<Array<Participant>> {
    environment.REGISTRY_SERVICE_URL;
    return this.http.get<Array<Participant>>(
      environment.REGISTRY_SERVICE_URL + `/api/registry/participants`
    );
  }

  getSelfDescription(connectorUrl: string): Observable<any> {
    return this.http.get<Array<Participant>>(connectorUrl + `/api/credentials`);
  }

  getAllOffers(connectorUrl: string): Observable<Array<Offer>> {
    const body = { criteria: [] };
    return this.http
      .post<Array<any>>(connectorUrl + `/api/federatedcatalog`, body)
      .pipe(map((dtos) => dtos.map((dto) => this.toOffer(dto))));
  }

  getOfferByAssetId(connectorUrl: string, assetId: string): Observable<Offer> {
    return this.getAllOffers(connectorUrl).pipe(
      map((offers) => {
        const filtered = offers.filter((offer) =>
          this.compareByAssetId(offer, assetId)
        );
        if (offers.length === 0) {
          throw Error('No offer with asset id: ' + assetId);
        }
        return filtered[0];
      })
    );
  }

  private compareByAssetId(offer: Offer, assetId: string): boolean {
    return offer.getAsset().id === assetId;
  }

  private toOffer(dto: any): Offer {
    return new Offer(dto.id, dto.policy, this.toAsset(dto['asset']));
  }

  private toAsset(dto: any): Asset {
    const props = dto['properties'];
    const m = props['monetized'] !== undefined ? props['monetized'] : false;
    return {
      id: props['asset:prop:id'],
      description: props['asset:prop:description'],
      logoUrl: props['logoUrl'],
      responseExample: props['example'],
      keywords: props['keywords'],
      monetized: m,
    };
  }
}
