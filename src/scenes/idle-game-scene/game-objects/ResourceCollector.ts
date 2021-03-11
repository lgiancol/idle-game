import Resource from "../resources/Resource";
import ResourceManager from "../resources/resource-managers/ResourceManager";

export default class ResourceCollector<T extends Resource> extends Phaser.GameObjects.Rectangle {
	private nameLabel: Phaser.GameObjects.Text;
	private quantityLabel: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager<T>, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, x, y);
		this.init();
	}

	private init() {
		this.setFillStyle(0xffbb22);
		
		let yOffset = this.y + 10;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.resourceManager.resourceType} x${this.resourceManager.autoCollectSpeed}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.quantityLabel = this.scene.add.text(this.x + 10, yOffset + 10, `${this.resourceManager.resourceQuantity.quantity}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	// This is where we actually update this object
	public preUpdate() {
		this.nameLabel.setText(`${this.resourceManager.resourceType} x${this.resourceManager.autoCollectSpeed}`);
		this.quantityLabel.setText(`${this.resourceManager.resourceQuantity.quantity}`);
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceCollector',
	function<T extends Resource> (this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager<T>, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCollector = new ResourceCollector(this.scene, resourceManager, x, y, width, height);
		resourceCollector.setOrigin(0);
		
		this.displayList.add(resourceCollector);
		this.updateList.add(resourceCollector);

		resourceCollector.setInteractive({useHandCursor: true});

		function onClick() {
			resourceCollector.resourceManager.resourceQuantity.increaseQuantity(resourceCollector.resourceManager.manualCollectSpeed);
		}
		resourceCollector.on('pointerdown', onClick);
		return resourceCollector;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			resourceCollector<T extends Resource>(resourceManager: ResourceManager<T>, x: number, y: number, width?: number, height?: number): ResourceCollector<T>
		}
	}
}