import { Injectable } from '@angular/core';
import { ContractOffer } from '../models/contract-offer';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getContractOfferDisponibility(contractOffer: ContractOffer): string {
    if (contractOffer.contract !== undefined) {
      if (contractOffer.contract.isAlwaysValid()) {
        return 'You already have access to this asset!';
      } else if (contractOffer.contract.isValid()) {
        return (
          'You have access to this asset until:\n' +
          contractOffer.contract.endDate
        );
      }
    }
    return '';
  }

  extractAssetIdFromOfferId(offerId: string): string {
    const elements = offerId.split(':');
    if (elements.length != 2) {
      throw 'Invalid offer id: ' + offerId;
    }
    return elements[0];
  }
}
