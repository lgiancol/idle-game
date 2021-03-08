import * as Phaser from 'phaser';
import Text from './Text';

const padding = 10;
const minimumWidth = 200;
const minimumHeight = 50;

export class GameButton extends Phaser.GameObjects.Rectangle {
  private label: Phaser.GameObjects.Text;
  private isEnabled = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    onClick?: () => void,
  ) {
    super(scene, x, y, width, height);
    scene.add.existing(this);
    this.setOrigin(0, 0);

    if (text != null) {
      this.label = scene.add
        .existing(new Text(this.scene, x + padding, y + padding + 6, text))
        .setFontSize(18)
        .setAlign('center');

      this.updateBounds();
    }

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState)
      .on('pointerup', this.enterMenuButtonHoverState);

    if (onClick) {
      this.on('pointerup', () => {
        if(this.isEnabled) {
          onClick();
        }
      });
    }

    this.enterMenuButtonRestState();
  }

  public updateBounds(): void {
    const labelWidth = this.width || this.label.width + padding;
    const labelHeight = this.height || this.label.height + padding;

    this.width = labelWidth; // >= minimumWidth ? labelWidth : minimumWidth;
    this.height = labelHeight; // >= minimumHeight ? labelHeight : minimumHeight;
  }

  public setEnabled(isEnabled: boolean) {
    if(this.isEnabled == isEnabled) return;

    this.isEnabled = isEnabled;

    if(!this.isEnabled)  {
      this.setInteractive({useHandCursor: false});
      this.enterButtonDisabledState();
    } else {
      this.setInteractive({useHandCursor: false});
      this.enterMenuButtonRestState();
    }
  }

  private enterButtonDisabledState() {
    this.setFillStyle(0x222222);
  }

  private enterMenuButtonHoverState() {
    if(!this.isEnabled) return;
    // this.label.setColor('#000000');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonRestState() {
    if(!this.isEnabled) return;
    // this.label.setColor('#FFFFFF');
    this.setFillStyle(0x888888);
  }

  private enterMenuButtonActiveState() {
    if(!this.isEnabled) return;
    // this.label.setColor('#BBBBBB');
    this.setFillStyle(0x444444);
  }

  public setLabel(label: string) {
    if(this.label.text == label) return;

    this.label.setText(label);
  }

  public setVisible(isVisible: boolean): this {
    if(this.visible == isVisible) return;

    super.setVisible(isVisible);

    this.label.setVisible(isVisible);

    return this;
  }

  public setY(value: number): this {
    super.setY(value);
    this.label.setPosition(this.x + padding, this.y + padding + 6);

    return this;
  }
}
