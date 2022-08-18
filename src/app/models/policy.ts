export interface Policy {
  readonly id: string;
  readonly permissions: Array<Permission>;
}

export interface Permission {
  readonly constraints: Array<object>;
}
