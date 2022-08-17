export interface Policy {
  id: string;
  permissions: Array<Permission>;
}

export interface Permission {
  constraints: Array<object>;
}
