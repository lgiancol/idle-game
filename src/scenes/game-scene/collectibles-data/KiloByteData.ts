import AbstractCollectibleData from './AbstractCollectibleData';
import { CollectibleType } from './ICollectibleData';

export default class KiloByteData extends AbstractCollectibleData {
  public constructor() {
    super(CollectibleType.KILOBYTE, 0.2, 1, 1250, 2.5);
  }
}
