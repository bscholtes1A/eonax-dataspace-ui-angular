export class DidDocument {
  static readonly DATA_MANAGEMENT_ENDPOINT = 'DataManagement';

  static readonly ID: string = 'id';
  static readonly TYPE: string = 'type';
  static readonly CONTEXT: string = '@context';
  static readonly SERVICE: string = 'service';
  static readonly VERIFICATION_METHOD: string = 'verificationMethod';
  static readonly AUTHENTICATION: string = 'authentication';

  readonly id!: string;
  readonly context!: string;
  readonly type!: string;
  readonly service!: Array<Service>;
  readonly verificationMethod!: Array<any>;
  readonly authentication!: Array<string>;

  constructor(obj: any) {
    this.id = obj[DidDocument.ID]!;
    this.type = obj[DidDocument.TYPE];
    this.service = obj[DidDocument.SERVICE]!;
    this.authentication = obj[DidDocument.AUTHENTICATION];
    this.verificationMethod = obj[DidDocument.VERIFICATION_METHOD];
    this.context = obj[DidDocument.CONTEXT];
  }

  getName(): string {
    var tmp = this.id.replace('did:web:', '');
    var position = tmp.indexOf('-did');
    if (position === -1) {
      return tmp;
    } else {
      return tmp.substring(0, position);
    }
  }

  getEndpoint(): string {
    const s = this.service.filter(
      (svc) => svc.type === DidDocument.DATA_MANAGEMENT_ENDPOINT
    );
    if (s.length !== 1) {
      throw 'Missing data mngt endpoint for: ' + this.getName();
    }
    return s[0].serviceEndpoint;
  }
}

export interface Service {
  readonly id: string;
  readonly type: string;
  readonly serviceEndpoint: string;
}
