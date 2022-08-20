import { Contract } from './contract';
import { Offer } from './offer';

export class ContractOffer {
  readonly offer: Offer;
  private contract: Contract;

  constructor(offer: Offer, contract: Contract) {
    this.offer = offer;
    this.contract = contract;
  }

  getContract(): Contract {
    return this.contract;
  }

  updateContract(contract: Contract): void {
    this.contract = contract;
  }

  static noContract(offer: Offer): ContractOffer {
    return new ContractOffer(offer, Contract.fake());
  }

  static unlimited(offer: Offer): ContractOffer {
    return new ContractOffer(offer, Contract.unlimited());
  }
}
