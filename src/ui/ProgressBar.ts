export default class Progressbar extends Phaser.GameObjects.Rectangle {
  private percentage = 0;
  private percentBar: Phaser.GameObjects.Rectangle;

  public constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height);
    scene.add.existing(this);
    this.setOrigin(0, 0);

    // Outer bar
    this.isStroked = true;
    this.strokeColor = 0xffffff;

    // Inner bar
    this.percentBar = new Phaser.GameObjects.Rectangle(
      scene,
      this.x,
      this.y,
      this.getBounds().width * this.percentage,
      this.height,
    );
    this.percentBar.setOrigin(0, 0);
    this.percentBar.isFilled = true;
    this.percentBar.fillColor = 0x00ff00;
    scene.add.existing(this.percentBar);
  }

  public setPercentage(percentage: number): void {
    this.percentage = percentage;

    this.update();
  }

  public update(): void {
    this.percentBar.width = this.getBounds().width * this.percentage;
  }
}
