import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../models/contract';
import { ContractAgreementDto } from '../models/contract-agreement-dto';
import { NegotiationRequestDto } from '../models/negotiation-request-dto';
import { Offer } from '../models/offer';
import { Participant } from '../models/participant';
import { TransferRequestDto } from '../models/transfer-request-dto';

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
        if (filtered.length === 0) {
          const error = 'No offer with asset id: ' + assetId;
          console.error(error);
          throw Error(error);
        }
        return filtered[0];
      })
    );
  }

  getContract(connectorUrl: string, assetId: string): Observable<Contract> {
    return this.http
      .get<string>(connectorUrl + `/api/enddate/` + assetId)
      .pipe(map((endDate) => new Contract(this.parseDate(endDate))));
  }

  startNegotiation(
    connectorUrl: string,
    dto: NegotiationRequestDto
  ): Observable<string> {
    return this.http
      .post<any>(connectorUrl + `/api/contractnegotiations`, dto)
      .pipe(map((resp) => resp.id));
  }

  getAgreement(
    connectorUrl: string,
    negotiationId: string
  ): Observable<ContractAgreementDto> {
    return this.http
      .get<ContractAgreementDto>(
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

  private parseDate(date: string): Date {
    const parsed = Date.parse(date.replace('"', ''));
    return new Date(parsed);
  }

  private compareByAssetId(offer: Offer, assetId: string): boolean {
    return offer.asset.id === assetId;
  }
}
