import { Contract } from './contract';
import { Offer } from './offer';

export interface ContractOffer {
  readonly offer: Offer;
  readonly contract?: Contract;
}
