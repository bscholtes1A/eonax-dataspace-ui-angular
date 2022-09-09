import { DateUtils } from './date-utils';
import { Policy } from './policy';

export class Contract {
  readonly id!: string;
  readonly providerAgentId!: string;
  readonly consumerAgentId!: string;
  readonly contractSigningDate!: number;
  readonly contractStartDate!: number;
  readonly contractEndDate!: number;
  readonly assetId!: string;
  readonly policy: Policy | undefined;

  constructor(
    id: string,
    providerAgentId: string,
    consumerAgentId: string,
    contractSigningDate: number,
    contractStartDate: number,
    contractEndDate: number,
    assetId: string,
    policy?: Policy
  ) {
    this.id = id;
    this.providerAgentId = providerAgentId;
    this.consumerAgentId = consumerAgentId;
    this.contractSigningDate = contractSigningDate;
    this.contractStartDate = contractStartDate;
    this.contractEndDate = contractEndDate;
    this.assetId = assetId;
    this.policy = policy;
  }

  isValid(): boolean {
    return this.contractEndDate > DateUtils.now();
  }

  isValidForever(): boolean {
    return this.contractEndDate === DateUtils.max();
  }

  prettyJson(): any {
    return {
      id: this.id,
      providerAgentId: this.providerAgentId,
      consumerAgentId: this.consumerAgentId,
      contractSigningDate: DateUtils.toDateStr(this.contractSigningDate),
      contractStartDate: DateUtils.toDateStr(this.contractStartDate),
      contractEndDate: DateUtils.toDateStr(this.contractEndDate),
      assetId: this.assetId,
      policy: this.policy,
    };
  }

  availability(): string {
    if (this.isValidForever()) {
      return 'You already have access to this asset!';
    } else if (this.isValid()) {
      return (
        'You have access to this asset until: ' +
        DateUtils.toDateStr(this.contractEndDate)
      );
    }
    return '';
  }
}
