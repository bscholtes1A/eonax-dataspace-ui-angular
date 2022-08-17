import { Asset } from './asset';
import { Policy } from './policy';

export interface Offer {
  id: string;
  policy: Policy;
  asset: Asset;
}
