import { Asset } from './asset';
import { Policy } from './policy';

export class Offer {
  static readonly ID: string = 'id';
  static readonly POLICY: string = 'policy';
  static readonly ASSET: string = 'asset';

  readonly id!: string;
  readonly asset!: Asset;
  readonly policy!: Policy;

  constructor(obj: any) {
    this.id = obj[Offer.ID]!;
    this.asset = new Asset(obj[Offer.ASSET]!);
    this.policy = obj[Offer.POLICY]!;
  }

  isEvent(): boolean {
    return this.asset.keywords.includes('events');
  }
}
