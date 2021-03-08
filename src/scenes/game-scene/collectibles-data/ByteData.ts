import AbstractCollectibleData from './AbstractCollectibleData';
import { CollectibleType } from './ICollectibleData';

export default class ByteData extends AbstractCollectibleData {
  public constructor() {
    super(CollectibleType.BYTE, 0.2, 1, 200, 1.75);
  }
}
