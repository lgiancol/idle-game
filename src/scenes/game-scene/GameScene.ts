import BitData from './collectibles-data/BitData';
import ByteData from './collectibles-data/ByteData';
import { CollectibleType } from './collectibles-data/ICollectibleData';
import KiloByteData from './collectibles-data/KiloByteData';
import { BitComponent } from './game-objects/collectibles/BitComponent';
import { ByteComponent } from './game-objects/collectibles/ByteComponent';
import { KiloByteComponent } from './game-objects/collectibles/KiloByteComponent';
import Store from './game-objects/store/Store';
import GameManager from './GameManager';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private gameManager: GameManager = GameManager.getInstance();
  private collectibles: Phaser.GameObjects.Group;

  private store: Store;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.createCollectibleComponents();
    this.createStoreComponent();
  }

  private createCollectibleComponents(): void {
    this.collectibles = this.add.group({});
    this.collectibles.runChildUpdate = true;
    this.collectibles.add(new BitComponent(this, 100, 100, this.gameManager.getCollectibleData<BitData>(CollectibleType.BIT)));
    this.collectibles.add(new ByteComponent(this, 100, 220, this.gameManager.getCollectibleData<ByteData>(CollectibleType.BYTE)));
    this.collectibles.add(new KiloByteComponent(this, 100, 340, this.gameManager.getCollectibleData<KiloByteData>(CollectibleType.KILOBYTE)));
  }

  private createStoreComponent(): void {
    this.store = new Store(this);
  }

  public update(time: number, delta: number): void {
    this.gameManager.update(delta);
    this.store.update();
  }
}
