import ResourceManager from "../../../resources/resource-managers/ResourceManager";

export default class ResourceCollectorComponent extends Phaser.GameObjects.Rectangle {
	private nameLabel: Phaser.GameObjects.Text;
	private quantityLabel: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, x, y);
		this.init();
	}

	private init() {
		
		this.setFillStyle(0xffbb22);
		
		let yOffset = this.y + 10;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.resourceManager.resourceName} x${this.resourceManager.autoCollectSpeed}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.quantityLabel = this.scene.add.text(this.x + 10, yOffset + 10, `${this.resourceManager.quantity}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	// This is where we actually update this object
	public preUpdate() {
		this.nameLabel.setText(`${this.resourceManager.resourceName} x${this.resourceManager.autoCollectSpeed}`);
		this.quantityLabel.setText(`${this.resourceManager.quantity}`);
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollectorComponent = new ResourceCollectorComponent(this.scene, resourceManager, x, y, width, height);
		resourceCollectorComponent.setOrigin(0);
		
		this.displayList.add(resourceCollectorComponent);
		this.updateList.add(resourceCollectorComponent);

		resourceCollectorComponent.setInteractive({useHandCursor: true});
		return resourceManager;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			resourceCollector(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): ResourceCollectorComponent
		}
	}
}