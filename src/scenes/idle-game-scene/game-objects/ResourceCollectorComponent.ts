import Resource from "../resources/Resource";
import ResourceManager from "../resources/resource-managers/ResourceManager";

export default abstract class ResourceCollectorComponent<T extends Resource> extends Phaser.GameObjects.Rectangle {
	private nameLabel: Phaser.GameObjects.Text;
	private quantityLabel: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager<T>, public x: number, public y: number, public width = 100, public height = 84) {
		super(scene, x, y);
		this.init();
	}

	private init() {
		
		this.setFillStyle(0xffbb22);
		
		let yOffset = this.y + 10;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.resourceManager.resourceType} x${this.resourceManager.resourceCollector.autoCollectSpeed}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.quantityLabel = this.scene.add.text(this.x + 10, yOffset + 10, `${this.resourceManager.resourceCollector.quantity}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	// This is where we actually update this object
	public preUpdate() {
		this.nameLabel.setText(`${this.resourceManager.resourceType} x${this.resourceManager.resourceCollector.autoCollectSpeed}`);
		this.quantityLabel.setText(`${this.resourceManager.resourceCollector.quantity}`);
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
	}
}