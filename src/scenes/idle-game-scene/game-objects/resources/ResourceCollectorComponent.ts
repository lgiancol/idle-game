import LuuButton from "../../../../ui/LuuButton";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceCountComponent from "./ResourceCountComponent";

export default class ResourceCollectorComponent extends Phaser.GameObjects.Rectangle {
	private resourceCount: ResourceCountComponent;
	private nameLabel: Phaser.GameObjects.Text;
	private collectResourceBtn: LuuButton;

	public constructor(scene: Phaser.Scene, public resourceManager: ResourceManager, public x: number, public y: number, width = 100, height = 84) {
		super(scene, x, y, width, height);

		this.init();
	}

	private init() {
		let btnHeight = 50;

		this.setStrokeStyle(1, 0xffffff);
		
		let yOffset = this.y + 10 + 1;
		this.resourceCount = this.scene.add.resourceCount(this.resourceManager.resource, this.x + 10, yOffset);
		this.nameLabel = this.scene.add.text(this.resourceCount.getBounds().right + 10, this.resourceCount.getBounds().centerY, `[${this.resourceManager.autoCollectSpeed}/s]`)
		.setOrigin(0, 0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.collectResourceBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width - 20, btnHeight, `Collect (x${this.resourceManager.clickCollectSpeed})`)
		.on('pointerdown', this.onCollect.bind(this));

		this.displayHeight = 10 + this.nameLabel.height + 10 + this.collectResourceBtn.getBounds().height + 10;
	}

	public preUpdate(delta: number) {
		this.nameLabel.setText(`[${this.resourceManager.autoCollectSpeed}/s]`);
		this.collectResourceBtn.setText(`Collect (x${this.resourceManager.clickCollectSpeed})`);
	}

	private onCollect() {		
		const resourceManager = this.resourceManager;
		resourceManager.collectResource(resourceManager.clickCollectSpeed);
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
		this.collectResourceBtn.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceCollector',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceComponent = new ResourceCollectorComponent(this.scene, resourceManager, x, y, width, height)
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
			resourceCollector(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): ResourceCollectorComponent
		}
	}
}