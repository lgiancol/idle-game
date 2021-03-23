import LuuProgressbar from "../../../ui/LuuProgressBar";
import HomeManager from "../home-managers/HomeManager";

export default class HomeComponent extends Phaser.GameObjects.Rectangle {
	private nameLabel: Phaser.GameObjects.Text;
	private quantityLabel: Phaser.GameObjects.Text;
	private fuelProgressBar: LuuProgressbar;

	public constructor(scene: Phaser.Scene, public homeManager: HomeManager, public x: number, public y: number, width = 100, height = 84) {
		super(scene, x, y, width, height);
		this.init();
	}

	private init() {
		this.setStrokeStyle(1, 0xffffff);
		
		let yOffset = this.y + 10;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.homeManager.homeType}`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;

		this.fuelProgressBar = this.scene.add.luuProgressBar(this.x + 10, yOffset, this.width - 20, 30)
		.setPercentage(this.homeManager.totalRemaingFuel / (this.homeManager.resourceManager.resource.energyUnits * this.homeManager.fuelLimit));
	
		let centerX = this.fuelProgressBar.x + (this.fuelProgressBar.width / 2);
		let centerY = this.fuelProgressBar.y + (this.fuelProgressBar.height / 2)
		this.quantityLabel = this.scene.add.text(centerX, centerY, `${this.homeManager.currentFuelLevel} / ${(this.homeManager.resourceManager.resource.energyUnits * this.homeManager.fuelLimit)}`)
		.setOrigin(0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.quantityLabel.getBounds().height + 10;

		this.displayHeight = 10 + this.nameLabel.height + 10 + this.fuelProgressBar.height + 10 + 2; // this.quantityLabel.height
	}

	// This is where we actually update this object
	public preUpdate() {
		this.quantityLabel.setText(`${this.homeManager.currentFuelLevel} / ${(this.homeManager.resourceManager.resource.energyUnits * this.homeManager.fuelLimit)}`);
		this.fuelProgressBar.setPercentage(this.homeManager.totalRemaingFuel / (this.homeManager.resourceManager.resource.energyUnits * this.homeManager.fuelLimit));
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'home',
	function (this: Phaser.GameObjects.GameObjectFactory, homeManager: HomeManager, x: number, y: number, width: number = 100, height: number = 84) {
		const home = new HomeComponent(this.scene, homeManager, x, y, width, height);
		home.setOrigin(0);
		
		this.displayList.add(home);
		this.updateList.add(home);

		home.setInteractive({useHandCursor: true});

		function onClick() {
			home.homeManager.addFuel()
		}
		home.on('pointerdown', onClick);
		return home;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			home(homeManager: HomeManager, x: number, y: number, width?: number, height?: number): HomeComponent
		}
	}
}