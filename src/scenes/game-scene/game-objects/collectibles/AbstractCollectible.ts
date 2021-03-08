import { GameObjects } from 'phaser';
import { GameButton } from '../../../../ui/GameButton';
import Progressbar from '../../../../ui/ProgressBar';
import Text from '../../../../ui/Text';
import ICollectibleData from '../../collectibles-data/ICollectibleData';
import GameManager from '../../GameManager';
import ICollectible from './ICollectible';

export default abstract class AbstractCollectible<T extends ICollectibleData> extends GameObjects.GameObject implements ICollectible {
  private x: number;
  private y: number;

  private collectibleButton: GameButton;
  private sellButton: GameButton;
  private titleLabel: Text;
  private countLabel: Text;
  private progressBar: Progressbar;
  private buyLabel: Text;

  constructor(
    scene: Phaser.Scene,
    public collectibleName: string,
    x: number,
    y: number,
    public collectibleData: T,
  ) {
    super(scene, `${collectibleName}Collectible`);

    this.x = x;
    this.y = y;

    this.init();
  }

  private init(): void {
    this.initCollectibleButton();
    this.initSellButton();
  }

  private initCollectibleButton(): void {
    this.collectibleButton = new GameButton(this.scene, this.x, this.y, 400, 110, null, () => this.collectibleData.click());
    this.collectibleButton.isStroked = true;
    this.collectibleButton.strokeAlpha = 1;
    this.collectibleButton.strokeColor = 0xffffff;

    this.titleLabel = this.scene.add
      .existing(new Text(this.scene, this.x, this.y + 10, `${this.collectibleName}s`))
      .setFontSize(22)
      .setFontStyle('bold');
    this.updateTitleLabel();

    this.countLabel = this.scene.add
      .existing(new Text(this.scene, this.x + 10, this.y + this.titleLabel.getBounds().height + 10, `${this.collectibleData.count}`))
      .setFontSize(18);
    this.updateCollectibleCountLabel();

    this.progressBar = new Progressbar(this.scene, this.x + 10, this.y + this.collectibleButton.height - 20 - 10, this.collectibleButton.width - 20, 20);
    this.progressBar.setVisible(this.collectibleData.collectSpeed > 0);

    this.buyLabel = this.scene.add.existing(new Text(this.scene, this.x + 10, this.y + this.collectibleButton.height - 30, `Buy for $${this.collectibleData.buyPrice}`));
  }

  private initSellButton(): void {
    this.sellButton = new GameButton(
      this.scene,
      this.x + this.collectibleButton.width + 10,
      this.y + (this.collectibleButton.height / 2),
      null,
      50,
      `Sell ($${this.collectibleData.sellPrice}/${this.collectibleName})`,
      () => this.sellUnits(),
    );

    let center = this.y + this.collectibleButton.height / 2 - this.sellButton.getBounds().height / 2;
    this.sellButton.setY(center);
  }

  private sellUnits(): void {
    GameManager.getInstance().addMoney(this.collectibleData.sellPrice * this.collectibleData.count);
    this.collectibleData.trueCount -= this.collectibleData.count;
    this.collectibleData.count = 0;
  }

  public update(): void {
    this.updateTitleLabel();
    this.updateCollectibleCountLabel();
    this.updateSellButton();
    
    this.collectibleButton.setEnabled(this.collectibleData.isActive || GameManager.getInstance().getMoney() >= this.collectibleData.buyPrice);
    
    this.progressBar.setVisible(this.collectibleData.isActive);
    this.progressBar.setPercentage(this.collectibleData.trueCount - this.collectibleData.count);
    
    this.buyLabel.setVisible(!this.collectibleData.isActive);
  }

  private updateTitleLabel(): void {
    this.titleLabel.setText(`${this.collectibleName}s (${this.collectibleData.collectSpeed}/second)`);
    let center = this.x + this.collectibleButton.width / 2 - this.titleLabel.getBounds().width / 2;

    if (this.collectibleButton.isStroked) {
      center += 2;
    }

    this.titleLabel.setX(center);
  }

  private updateCollectibleCountLabel(): void {
    this.countLabel.setText(`${this.collectibleData.count}`);
    let center = this.x + this.collectibleButton.width / 2 - this.countLabel.getBounds().width / 2;

    if (this.collectibleButton.isStroked) {
      center += 2;
    }

    this.countLabel.setX(center);
  }

  private updateSellButton() {
    this.sellButton.setLabel(`Sell ($${this.collectibleData.sellPrice}/${this.collectibleName})`);

    this.sellButton.setVisible(this.collectibleData.isActive);
  }
}
