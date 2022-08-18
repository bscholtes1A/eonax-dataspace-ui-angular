import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      .pipe(map((dtos) => dtos.map((dto) => new Offer(dto))));
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
    return offer.asset.id === assetId;
  }
}
