export class Contract {
  private static MAX_DATE: Date = new Date(8640000000000000);

  readonly endDate!: Date;

  constructor(endDate: Date) {
    this.endDate = endDate;
  }

  static alwaysValid(): Contract {
    return new Contract(this.MAX_DATE);
  }

  isAlwaysValid(): boolean {
    return this.endDate === Contract.MAX_DATE;
  }

  isValid(): boolean {
    return this.endDate > new Date();
  }
}
