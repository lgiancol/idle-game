import LuuButton from "../../../../ui/LuuButton";
import LuuProgressbar from "../../../../ui/LuuProgressBar";
import Player from "../../Player";
import Refinery from "../../refiners/Refinery";
import Resource from "../../resources/Resource";

export default class RefineryComponent extends Phaser.GameObjects.Rectangle {
	private player = Player.getInstance();
	private nameLabel: Phaser.GameObjects.Text;
	private resourceIcon: Phaser.GameObjects.Sprite;
	private progress: LuuProgressbar;
	private refinedIcon: Phaser.GameObjects.Sprite;
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
		this.nameLabel = this.scene.add.text(this.x + 10, yOffset, `${this.refinery.inputResource.type} Refinery [${this.refinery.refinedResourceCount}]`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		yOffset += this.nameLabel.getBounds().height + 10;
		this.resourceIcon = this.scene.add.sprite(this.x + 10, yOffset, this.refinery.inputResource.type)
		.setOrigin(0)
		.setDisplaySize(20, 20);
		this.progress = this.scene.add.luuProgressBar(this.x + 40, yOffset, this.width - 80, 20);
		this.refinedIcon = this.scene.add.sprite(this.progress.getBounds().right + 10, yOffset, this.refinery.outputResource.type)
		.setOrigin(0)
		.setDisplaySize(20, 20);

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
		this.nameLabel.setText(`${this.refinery.inputResource.type} Refinery [${this.refinery.refinedResourceCount}]`);
		this.progress.setPercentage(this.refinery.refinePercentage);
	}

	private onAddResourceToRefine() {
		const takeAmount = 1;

		const resourceManager = this.player.getResourceManager(this.refinery.inputResource)
		if(resourceManager?.hasMinimumOf(takeAmount)) {
			if(this.refinery.addResource(this.refinery.inputResource, takeAmount)) {
				resourceManager?.removeResource(takeAmount);
			}
		}
	}

	private onTakeRefinedResources() {
		const deltaRefinedResource = this.refinery.takeRefinedResource(this.refinery.outputResource);

		if(deltaRefinedResource >= 0) {
			const refinedResourceManager = this.player.getResourceManager(this.refinery.outputResource);
			refinedResourceManager.collectResource(deltaRefinedResource);
		}
	}

	public destroy() {
		this.nameLabel.destroy();
		this.resourceIcon.destroy();
		this.progress.destroy();
		this.refinedIcon.destroy();
		this.addResourceToRefineBtn.destroy();
		this.takeRefinedResourceBtn.destroy();

		super.destroy();
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