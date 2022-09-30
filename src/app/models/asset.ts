export class Asset {
  static readonly PROPERTIES = 'properties';
  static readonly MONETIZED = 'monetized';
  static readonly PROPS_ID = 'asset:prop:id';
  static readonly PROPS_NAME = 'asset:prop:name';
  static readonly PROPS_DESCRIPTION = 'asset:prop:description';
  static readonly PROPS_LOGO_URL = 'logoUrl';
  static readonly PROPS_ORIGINATOR = 'asset:prop:originator';
  static readonly PROPS_RESP_EXAMPLE = 'example';
  static readonly PROPS_KEYWORDS = 'keywords';

  readonly id!: string;
  readonly name!: string;
  readonly description: string;
  readonly logoUrl: string;
  readonly responseExample: object;
  readonly monetized: boolean;
  readonly originator: string;
  readonly keywords: Array<string>;

  // constructor(
  //   id: string,
  //   description: string,
  //   logoUrl: string,
  //   responseExample: object,
  //   monetized: boolean,
  //   keywords: Array<string>
  // ) {
  //   this.id = id;
  //   this.description = description;
  //   this.logoUrl = logoUrl;
  //   this.responseExample = responseExample;
  //   this.monetized = monetized;
  //   this.keywords = keywords;
  // }

  constructor(obj: any) {
    const props = obj[Asset.PROPERTIES]!;
    const m =
      props[Asset.MONETIZED] !== undefined ? props[Asset.MONETIZED] : false;

    this.id = props[Asset.PROPS_ID]!;
    this.name = props[Asset.PROPS_NAME];
    this.description = props[Asset.PROPS_DESCRIPTION];
    this.logoUrl = props[Asset.PROPS_LOGO_URL];
    this.originator = props[Asset.PROPS_ORIGINATOR];
    this.responseExample = props[Asset.PROPS_RESP_EXAMPLE];
    this.keywords = props[Asset.PROPS_KEYWORDS];
    this.monetized = m;
  }
}
