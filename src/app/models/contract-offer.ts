import { Contract } from './contract';
import { Offer } from './offer';

export class ContractOffer {
  private static MIN_DATE: Date = new Date(-8640000000000000);
  private static MAX_DATE: Date = new Date(8640000000000000);
  private static MIN_DATE_SECONDS: number =
    ContractOffer.MIN_DATE.getTime() / 1000;

  readonly offer: Offer;
  readonly contract: Contract;

  constructor(offer: Offer, contract: Contract) {
    this.offer = offer;
    this.contract = contract;
  }

  updateContract(contract: Contract): ContractOffer {
    // workaround here as contractEndDate is not properly set in EDC yet
    let c = new Contract(
      contract.id,
      contract.providerAgentId,
      contract.consumerAgentId,
      contract.contractSigningDate,
      contract.contractStartDate,
      contract.contractStartDate + 600,
      contract.assetId,
      contract.policy
    );
    return new ContractOffer(this.offer, c);
  }

  static noContract(offer: Offer): ContractOffer {
    let contractEnDate = offer.isEvent()
      ? ContractOffer.MAX_DATE
      : ContractOffer.MIN_DATE;
    let contract = new Contract(
      '',
      '',
      '',
      ContractOffer.MIN_DATE_SECONDS,
      ContractOffer.MIN_DATE_SECONDS,
      contractEnDate.getTime() * 1000,
      offer.asset.id,
      undefined
    );
    return new ContractOffer(offer, contract);
  }
}
