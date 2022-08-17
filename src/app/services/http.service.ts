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
    return this.http.get<Array<Participant>>(
      connectorUrl + `/api/credentials`
    );
  }

  getAllOffers(connectorUrl: string): Observable<Array<Offer>> {
    const body = { criteria: [] };
    return this.http
      .post<Array<any>>(connectorUrl + `/api/federatedcatalog`, body)
      .pipe(
        map((dtos) => {
          let offers = new Array<Offer>;
          dtos.forEach((dto) => {
            const assetProps = dto.asset.properties;
            const a = {
              id: assetProps['asset:prop:id']!,
              description: assetProps['asset:prop:description']!,
              logoUrl: assetProps['logoUrl']!,
              example: assetProps['example']!,
              keywords: assetProps['keywords']!,
              monetized: assetProps['monetized'] !== undefined ? assetProps['monetized'] : false,
            };
            offers.push({ id: dto.id, asset: a , policy: dto.policy});
          });
          return offers;
        })
      );
  }
}
