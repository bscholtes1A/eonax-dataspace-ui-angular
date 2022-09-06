import { Policy } from './policy';

export class Contract {
  private static MAX_DATE: Date = new Date(8640000000000000);

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
    return this.contractEndDate > new Date().getTime() / 1000;
  }

  isValidForever(): boolean {
    return this.contractEndDate === Contract.MAX_DATE.getTime() / 1000;
  }

  prettyJson(): any {
    return {
      id: this.id,
      providerAgentId: this.providerAgentId,
      consumerAgentId: this.consumerAgentId,
      contractSigningDate: this.toDate(this.contractSigningDate),
      contractStartDate: this.toDate(this.contractStartDate),
      contractEndDate: this.toDate(this.contractEndDate),
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
        this.toDate(this.contractEndDate)
      );
    }
    return '';
  }

  private toDate(seconds: number): string {
    return new Date(seconds * 1000).toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
    });
  }
}
