import AbstractCollectibleData from './AbstractCollectibleData';
import { CollectibleType } from './ICollectibleData';

export default class BitData extends AbstractCollectibleData {
  public constructor() {
    super(CollectibleType.BIT, 1, 1, 0, 1);
    this.isActive = true;
  }
}
