export class Asset {
  static readonly PROPERTIES: string = 'properties';
  static readonly MONETIZED: string = 'monetized';
  static readonly PROPS_ID: string = 'asset:prop:id';
  static readonly PROPS_DESCRIPTION: string = 'asset:prop:description';
  static readonly PROPS_LOGO_URL: string = 'logoUrl';
  static readonly PROPS_RESP_EXAMPLE: string = 'example';
  static readonly PROPS_KEYWORDS: string = 'keywords';

  readonly id!: string;
  readonly description: string;
  readonly logoUrl: string;
  readonly responseExample: object;
  readonly monetized: boolean;
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
    this.description = props[Asset.PROPS_DESCRIPTION];
    this.logoUrl = props[Asset.PROPS_LOGO_URL];
    this.responseExample = props[Asset.PROPS_RESP_EXAMPLE];
    this.keywords = props[Asset.PROPS_KEYWORDS];
    this.monetized = m;
  }
}
