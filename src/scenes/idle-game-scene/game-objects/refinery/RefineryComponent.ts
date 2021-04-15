import LuuButton from "../../../../ui/LuuButton";
import LuuProgressbar from "../../../../ui/LuuProgressBar";
import Player from "../../Player";
import Refinery from "../../resources/refiners/Refinery";
import Resource from "../../resources/ResourceTypes";

export default class RefineryComponent extends Phaser.GameObjects.Rectangle {
	private player = Player.getInstance();
	private nameLabel: Phaser.GameObjects.Text;
	private progress: LuuProgressbar;
	private addResourceToRefineBtn: LuuButton;
	private takeRefinedResourceBtn: LuuButton;

	public constructor(scene: Phaser.Scene, public refinery: Refinery, public x: number, public y: number, width = 100, height = 84) {
		super(scene, x, y, width, height);

		this.init();
	}

	private init() {
		let btnHeight = 30;

		this.setStrokeStyle(1, 0xffffff);
		
		let yOffset = this.y + 10 + 1;
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.refinery.resourceAccepted.name} Refinery [${this.refinery.refinedResourceCount}]`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.progress = this.scene.add.luuProgressBar(this.x + 10, yOffset, this.width - 20, 20);

		yOffset += this.progress.getBounds().height + 10;
		this.addResourceToRefineBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width / 2 - 10, btnHeight, `Add Resource`)
		.on('pointerdown', this.onAddResourceToRefine.bind(this));

		// yOffset += this.addResourceToRefineBtn.getBounds().height + 10;
		this.takeRefinedResourceBtn = this.scene.add.luuButton(this.addResourceToRefineBtn.getBounds().right + 10, yOffset, this.width / 2 - 20, btnHeight, `Take Resource`)
		.on('pointerdown', this.onTakeRefinedResources.bind(this));

		this.displayHeight = 10 + this.nameLabel.getBounds().height + 10 + this.progress.getBounds().height + 10 + this.takeRefinedResourceBtn.getBounds().height + 10 + 1;
		// this.displayWidth = 10 + this.addResourceToRefineBtn.getBounds().width + 10 + this.takeRefinedResourceBtn.getBounds().width + 10;
	}

	public preUpdate(delta: number) {
		this.nameLabel.setText(`${this.refinery.resourceAccepted.name} Refinery [${this.refinery.refinedResourceCount}]`);
		this.progress.setPercentage(this.refinery.refinePercentage);
	}

	private onAddResourceToRefine() {
		const takeAmount = 1;

		const resourceManager = this.player.getResourceManager(this.refinery.resourceAccepted)
		if(resourceManager?.hasMinimumOf(takeAmount)) {
			if(this.refinery.addResource(this.refinery.resourceAccepted, takeAmount)) {
				resourceManager?.removeResource(takeAmount);
			}
		}
	}

	private onTakeRefinedResources() {
		const refinedResourceType = Resource.PLANKS;
		const deltaRefinedResource = this.refinery.takeRefinedResource(refinedResourceType);

		if(deltaRefinedResource >= 0) {
			const refinedResourceManager = this.player.getResourceManager(refinedResourceType);
			refinedResourceManager.collectResource(deltaRefinedResource);
		}
	}

	public destroy() {
		super.destroy();

		this.nameLabel.destroy();
		this.progress.destroy();
		this.addResourceToRefineBtn.destroy();
		this.takeRefinedResourceBtn.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'refinery',
	function(this: Phaser.GameObjects.GameObjectFactory, refinery: Refinery, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceComponent = new RefineryComponent(this.scene, refinery, x, y, width, height)
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
			refinery(refinery: Refinery, x: number, y: number, width?: number, height?: number): RefineryComponent
		}
	}
}