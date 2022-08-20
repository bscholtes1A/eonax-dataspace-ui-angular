export class Contract {
  private static MIN_DATE = new Date(-8640000000000000);
  private static MAX_DATE: Date = new Date(8640000000000000);
  private static FAKE_CONTRACT = new Contract(this.MIN_DATE);

  private readonly endDate!: Date;

  constructor(endDate: Date) {
    this.endDate = endDate;
  }

  static fake(): Contract {
    return this.FAKE_CONTRACT;
  }

  static unlimited(): Contract {
    return new Contract(this.MAX_DATE);
  }

  isValidForever(): boolean {
    return this.endDate === Contract.MAX_DATE;
  }

  isValid(): boolean {
    return this.endDate > new Date();
  }

  availability(): string {
    if (this.isValidForever()) {
      return 'You already have access to this asset!';
    } else if (this.isValid()) {
      return 'You have access to this asset until:\n' + this.endDate;
    }
    return '';
  }
}
