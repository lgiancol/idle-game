import KiloByteData from '../../collectibles-data/KiloByteData';
import AbstractCollectible from './AbstractCollectible';

export class KiloByteComponent extends AbstractCollectible<KiloByteData> {
  public constructor(scene: Phaser.Scene, x: number, y: number, kiloByteData: KiloByteData) {
    super(scene, 'Kilo Byte', x, y, kiloByteData);
  }
}
