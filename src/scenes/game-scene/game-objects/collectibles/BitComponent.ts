import BitData from '../../collectibles-data/BitData';
import AbstractCollectible from './AbstractCollectible';

export class BitComponent extends AbstractCollectible<BitData> {
  public constructor(scene: Phaser.Scene, x: number, y: number, bitData: BitData) {
    super(scene, 'Bit', x, y, bitData);
  }

  public update(): void {
    super.update();
  }
}
