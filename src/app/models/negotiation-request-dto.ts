import { Offer } from './offer';

export class NegotiationRequestDto {
  private readonly connectorAddress: string;
  private readonly protocol = 'ids-multipart';
  private readonly connectorId = 'consumer';
  private readonly offer: object;

  constructor(offer: Offer) {
    this.connectorAddress = offer.asset.originator;
    this.offer = {
      offerId: offer.id,
      policy: offer.policy,
      assetId: offer.asset.id,
    };
  }
}
