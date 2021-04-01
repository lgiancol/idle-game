import LuuButton from "../../../../ui/LuuButton";
import MarketManager from "../../market-manager/MarketManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";

export default class ResourceComponent extends Phaser.GameObjects.Rectangle {
	private nameLabel: Phaser.GameObjects.Text;
	private collectResourceBtn: LuuButton;

	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager, public x: number, public y: number, width = 100, height = 84) {
		super(scene, x, y, width, height);

		this.init();
	}

	private init() {
		let btnHeight = 30;

		this.setStrokeStyle(1, 0xffffff);
		
		let yOffset = this.y + 10;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.resourceManager.resourceName} ${this.resourceManager.quantity} [${this.resourceManager.autoCollectSpeed}/s]`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.collectResourceBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width - 20, btnHeight, `Collect (x${this.resourceManager.clickCollectSpeed})`)
		.on('pointerdown', this.onCollect.bind(this));

		yOffset += this.collectResourceBtn.getBounds().height + 10;

		this.displayHeight = 10 + this.nameLabel.height + 10 + this.collectResourceBtn.height + 10;
	}

	public preUpdate(delta: number) {
		this.nameLabel.setText(`${this.resourceManager.resourceName}: ${this.resourceManager.quantity}  [${this.resourceManager.autoCollectSpeed}/s]`);
		this.collectResourceBtn.setText(`Collect (x${this.resourceManager.clickCollectSpeed})`);
	}

	private onCollect() {		
		const resourceManager = this.resourceManager;
		resourceManager.collectResource(resourceManager.clickCollectSpeed);
	}

	private onOpenStore() {
		const marketManager = (this.scene.data.get('marketManager') as MarketManager);
		const currentActiveResource = marketManager.getActiveResource();

		if(currentActiveResource == null || currentActiveResource != this.resourceManager.resourceType) {
			marketManager.setActiveResource(this.resourceManager.resourceType);
		}
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
		this.collectResourceBtn.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resource',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceComponent = new ResourceComponent(this.scene, resourceManager, x, y, width, height)
		.setOrigin(0);
		
		this.displayList.add(resourceComponent);
		this.updateList.add(resourceComponent);
		return resourceComponent;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			resource(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): ResourceComponent
		}
	}
}