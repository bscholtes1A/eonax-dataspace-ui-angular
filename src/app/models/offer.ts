import { Asset } from './asset';
import { Policy } from './policy';

export class Offer {
  private contractEndDate: Date | undefined;

  constructor(
    private id: string,
    private policy: Policy,
    private asset: Asset
  ) {}

  getId(): string {
    return this.id;
  }

  getPolicy(): Policy {
    return this.policy;
  }

  getAsset(): Asset {
    return this.asset;
  }

  setContractEndDate(endDate: Date): void {
    this.contractEndDate = endDate;
  }

  hasValidContract(): boolean {
    return (
      this.contractEndDate !== undefined && this.contractEndDate > new Date()
    );
  }
}
