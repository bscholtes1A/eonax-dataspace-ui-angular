import { Asset } from './asset';

export class TransferRequestDto {
  private readonly id: string;
  private readonly connectorAddress: string;
  private readonly protocol = 'ids-multipart';
  private readonly connectorId = 'consumer';
  private readonly contractId: string;
  private readonly assetId: string;
  private readonly dataDestination: object;
  private readonly managedResources = false;

  constructor(asset: Asset, contractId: string) {
    this.id = asset.id + ':' + TransferRequestDto.createUniqueId();
    this.connectorAddress = asset.originator;
    this.protocol = 'ids-multipart';
    this.connectorId = 'consumer';
    this.contractId = contractId;
    this.assetId = asset.id;
    this.dataDestination = {
      type: 'HttpProxy',
    };
    this.managedResources = false;
  }

  private static createUniqueId() {
    return Math.round(Date.now() / 1000);
  }
}
