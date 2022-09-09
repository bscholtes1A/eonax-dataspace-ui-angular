import { Contract } from './contract';
import { DateUtils } from './date-utils';
import { Offer } from './offer';

export class ContractOffer {
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
    const start = DateUtils.MIN_DATE_SECONDS;
    const end = offer.isEvent() ? DateUtils.MAX_DATE : DateUtils.MIN_DATE;
    let contract = new Contract(
      '',
      '',
      '',
      start,
      start,
      DateUtils.toSeconds(end),
      offer.asset.id,
      undefined
    );
    return new ContractOffer(offer, contract);
  }
}
