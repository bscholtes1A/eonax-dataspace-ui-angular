import { Contract } from './contract';
import { Offer } from './offer';

export class ContractOffer {
  readonly offer: Offer;
  readonly contract?: Contract;

  constructor(offer: Offer, contract?: Contract) {
    this.offer = offer;
    this.contract = contract;
  }

  public hasContract(): boolean {
    return this.contract !== undefined;
  }
}
