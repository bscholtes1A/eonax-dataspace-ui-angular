export class DateUtils {
  static MIN_DATE: Date = new Date(-8640000000000000);
  static MAX_DATE: Date = new Date(8640000000000000);
  static MIN_DATE_SECONDS: number = DateUtils.MIN_DATE.getTime() / 1000;
  static MAX_DATE_SECONDS: number = DateUtils.MAX_DATE.getTime() / 1000;

  static now(): number {
    return DateUtils.toSeconds(new Date());
  }

  static max(): number {
    return DateUtils.toSeconds(this.MAX_DATE);
  }

  static toSeconds(d: Date): number {
    return Math.floor(d.getTime() / 1000);
  }

  static toDateStr(seconds: number): string {
    return new Date(seconds * 1000).toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
    });
  }
}
