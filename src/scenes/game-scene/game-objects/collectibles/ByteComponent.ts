import ByteData from '../../collectibles-data/ByteData';
import AbstractCollectible from './AbstractCollectible';

export class ByteComponent extends AbstractCollectible<ByteData> {
  public constructor(scene: Phaser.Scene, x: number, y: number, byteData: ByteData) {
    super(scene, 'Byte', x, y, byteData);
  }
}
