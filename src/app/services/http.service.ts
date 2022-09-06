import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { Asset } from '../models/asset';
import { Policy } from '../models/policy';
import { Contract } from '../models/contract';
import { NegotiationRequestDto } from '../models/negotiation-request-dto';
import { Offer } from '../models/offer';
import { Participant } from '../models/participant';
import { TransferRequestDto } from '../models/transfer-request-dto';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAllParticipants(
    registryServiceUrl: string
  ): Observable<Array<Participant>> {
    return this.http.get<Array<Participant>>(
      registryServiceUrl + `/api/registry/participants`
    );
  }

  getSelfDescription(connectorUrl: string): Observable<any> {
    return this.http.get<Array<Participant>>(
      connectorUrl + `/api/identity-hub/self-description`
    );
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
        if (filtered.length === 0) {
          const error = 'No offer with asset id: ' + assetId;
          console.error(error);
          throw Error(error);
        }
        return filtered[0];
      })
    );
  }

  getContractsByAssetId(
    connectorUrl: string,
    assetId: string
  ): Observable<Array<Contract>> {
    return this.http.get<Array<Contract>>(
      connectorUrl + `/api/contractagreements`,
      {
        params: {
          sortField: 'contractSigningDate',
          sort: 'DESC',
          filter: 'assetId=urn:artifact:' + assetId,
        },
      }
    );
  }

  startNegotiation(
    connectorUrl: string,
    dto: NegotiationRequestDto
  ): Observable<string> {
    return this.http
      .post<any>(connectorUrl + `/api/contractnegotiations`, dto)
      .pipe(map((resp) => resp.id));
  }

  getAllAssets(connectorUrl: string): Observable<Array<Asset>> {
    return this.http
      .get<Array<any>>(connectorUrl + `/api/assets`, {})
      .pipe(map((dtos) => dtos.map((dto) => new Asset(dto))));
  }

  getAllPolicyDefinitions(connectorUrl: string): Observable<Array<Policy>> {
    return this.http.get<Array<Policy>>(
      connectorUrl + `/api/policydefinitions`
    );
  }

  getAllContractDefinitions(connectorUrl: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(connectorUrl + `/api/contractdefinitions`);
  }

  getAgreement(connectorUrl: string, negotiationId: string): Observable<any> {
    return this.http
      .get<any>(
        connectorUrl +
          `/api/contractnegotiations/` +
          negotiationId +
          '/agreement'
      )
      .pipe(retry({ count: 10, delay: 2000, resetOnSuccess: true }));
  }

  sendTransferRequest(
    connectorUrl: string,
    dto: TransferRequestDto
  ): Observable<string> {
    return this.http
      .post<any>(connectorUrl + `/api/transferprocess`, dto)
      .pipe(map((resp) => resp.id));
  }

  private compareByAssetId(offer: Offer, assetId: string): boolean {
    return offer.asset.id === assetId;
  }
}
