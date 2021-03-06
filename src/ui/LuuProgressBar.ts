export default class LuuProgressbar extends Phaser.GameObjects.Rectangle {
  private percentage = 0;
  private percentBar: Phaser.GameObjects.Rectangle;
  private label: Phaser.GameObjects.Text;

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
    this.percentBar.fillColor = 0x993399;
    scene.add.existing(this.percentBar);
  }

  public setPercentage(percentage: number) {
    this.percentage = percentage;

    this.update();

	return this;
  }

  public setText(text: string) {
	let centerX = this.x + (this.width / 2);
	let centerY = this.y + (this.height / 2);
	if(!this.label) {
		this.label = this.scene.add.text(centerX, centerY, text)
		.setOrigin(0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	this.label.setText(text);

	return this;
  }

  public preUpdate(): void {
    this.percentBar.width = this.getBounds().width * this.percentage;
  }

  public destroy() {
	  super.destroy();

	  this.label?.destroy();
	  this.percentBar.destroy();
  }
}

Phaser.GameObjects.GameObjectFactory.register(
	'luuProgressBar',
	function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number) {
		const luuProgressBar = new LuuProgressbar(this.scene, x, y, width, height)
		.setOrigin(0)
		.setInteractive();

		// luuProgressBar.init();
		
		this.displayList.add(luuProgressBar);
		this.updateList.add(luuProgressBar);

		return luuProgressBar;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			luuProgressBar(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number): LuuProgressbar
		}
	}
}