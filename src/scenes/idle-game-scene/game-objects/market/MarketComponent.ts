import LuuButton from "../../../../ui/LuuButton";
import MarketManager from "../../market-manager/MarketManager";
import Player from "../../Player";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import LuuIOverlayContentComponent from "../LuuIOverlay/LuuIOverlayContentComponent";
import ResourceCountComponent from "../resources/ResourceCountComponent";
import MarketGroupComponent from "./MarketGroupComponent";

export default class MarketComponent extends LuuIOverlayContentComponent {
	private player: Player;
	private outline: Phaser.GameObjects.Rectangle;
	private label: Phaser.GameObjects.Text;
	private clearActiveResourceManager: LuuButton;
	private moneyLabel: Phaser.GameObjects.Text;
	// private marketGroup: MarketGroupComponent; // TODO: Needs to be updated to actually be a Tab
	private resourceSelect: Phaser.GameObjects.Group;
	private resourceMarket: MarketGroupComponent;

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.player = Player.getInstance();
		this.init();
	}

	private init() {
		this.outline = this.scene.add.rectangle(this.x, this.y, this.width, this.height)
		.setOrigin(0)
		.setStrokeStyle(1, 0xffffff);

		this.label = this.scene.add.text(this.x + 10, this.y + 10, `Market`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30);

		const labelBounds = this.label.getBounds();
		this.clearActiveResourceManager = this.scene.add.luuButton(labelBounds.x + labelBounds.width + 10, labelBounds.y, 100, labelBounds.height, 'Clear')
		.on('pointerdown', () => this.setActiveResourceManager(null));
		
		this.moneyLabel = this.scene.add.text(this.x + this.width - 100, this.y + 10, `$${this.player.money}`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30);
		
		let yOffset = this.label.y + this.label.getBounds().height + 10;

		this.resourceMarket = this.scene.add.resourceUpgradeMarketGroup(null, this.x, yOffset, this.width, this.height);
		this.resourceMarket.setVisible(false);

		this.resourceSelect = this.scene.add.group();
		this.player.resourcemanagersArr.forEach((resourceManager: ResourceManager) => {
			let resourceItemBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width - 20, 30, resourceManager.resourceName);
			// let resourceItemBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width - 20, 50, '');

			// const btnBounds = resourceItemBtn.getBounds();
			// let resourceCount = this.scene.add.resourceCount(resourceManager.resource, btnBounds.centerX, btnBounds.centerY)
			// .setOrigin(0.5);

			// resourceItemBtn.setData('count', resourceCount);
			resourceItemBtn.on('pointerdown', () => {
				let activeResourceManager = resourceManager;
				if(activeResourceManager == this.resourceMarket.activeResourceManager) activeResourceManager = null;

				this.setActiveResourceManager(activeResourceManager);
			});

			this.resourceSelect.add(resourceItemBtn);
			// this.resourceSelect.add(resourceCount);

			yOffset += resourceItemBtn.getBounds().height + 10;
		});

		this.setActiveResourceManager(null);
	}

	public resize() {
		const depth = this.parentOverlayContainer.depth + 1;
		this.outline.setDepth(depth)
		.setSize(this.width, this.height)
		.setPosition(this.x, this.y);

		this.label
		.setDepth(depth)
		.setPosition(this.x + 10, this.y + 10);
		
		const labelBounds = this.label.getBounds();
		this.clearActiveResourceManager
		.setDepth(depth)
		.setSize(100, labelBounds.height)
		.setPosition(labelBounds.x + labelBounds.width + 10, labelBounds.y);

		this.moneyLabel
		.setDepth(depth)
		.setPosition(this.x + this.width - 100, this.y + 10);

		let yOffset = this.label.y + this.label.getBounds().height + 10;
		this.resourceMarket
		.setDepth(depth)
		.setSize(this.width, this.height)
		.setPosition(this.x, yOffset);

		this.resourceSelect.getChildren().forEach((btn: LuuButton) => {
		// this.resourceSelect.getChildren().filter((value: Phaser.GameObjects.GameObject) => value instanceof LuuButton).forEach((btn: LuuButton) => {
			btn
			.setDepth(depth)
			.setPosition(this.x + 10, yOffset)
			.setSize(this.width - 20, 30)
			.setDisplaySize(this.width - 20, 30);

			yOffset += btn.getBounds().height + 10;
			// let btnBounds = btn.getBounds();
			// yOffset += btnBounds.height + 10;

			// const resourceCount = (btn.getData('count') as ResourceCountComponent);
			// resourceCount
			// .setPosition(btnBounds.centerX, btnBounds.centerY)
			// .setDepth(depth);
		});
	}

	private setActiveResourceManager(resourceManager: ResourceManager) {
		let hasResourceManager = resourceManager != null;
		this.resourceMarket.activeResourceManager = resourceManager;
		
		this.resourceSelect.getChildren().forEach((btn: LuuButton) => btn.setVisible(!hasResourceManager));
		// this.resourceSelect.getChildren().forEach((btn: LuuButton | ResourceCountComponent) => btn.setVisible(!hasResourceManager));
		
		this.resourceMarket.setActive(hasResourceManager);
		this.resourceMarket.setVisible(hasResourceManager);

		this.clearActiveResourceManager.setVisible(hasResourceManager);
	}

	public preUpdate(delta: number) {
		this.moneyLabel
		.setText(`$${this.player.money}`)
		.setPosition(this.x + this.width - this.moneyLabel.width - 10, this.moneyLabel.y);
	}

	public destroy() {
		super.destroy();

		this.outline.destroy();
		this.label.destroy();
		this.clearActiveResourceManager?.destroy();
		this.moneyLabel.destroy();
		this.resourceMarket?.destroy();
		this.resourceSelect?.destroy(true, true);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'market',
	function (this: Phaser.GameObjects.GameObjectFactory, marketManager: MarketManager, x: number, y: number, width: number = 100, height: number = 84) {
		const marketGameObject = new MarketComponent(this.scene, marketManager, x, y, width, height);
		// marketGameObject.setOrigin(0);
		
		// this.displayList.add(marketGameObject);
		this.updateList.add(marketGameObject);

		return marketGameObject;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			market(marketManager: MarketManager, x: number, y: number, width?: number, height?: number): MarketComponent
		}
	}
}