export class Result<T> {
  private constructor(private error?: string, private entity?: T) {}

  static success<T>(entity: T): Result<T> {
    return new Result<T>(undefined, entity);
  }

  static failure<T>(error: string): Result<T> {
    return new Result<T>(error, undefined);
  }

  getError(): string {
    return this.error!;
  }

  getEntity(): T {
    return this.entity!;
  }

  succeeded(): boolean {
    return this.error === undefined;
  }

  failed(): boolean {
    return !this.succeeded();
  }
}
