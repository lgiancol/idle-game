import MarketManager from "../../market-manager/MarketManager";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import MarketGroupComponent from "./MarketGroupComponent";

export default class MarketComponent extends Phaser.GameObjects.Rectangle {
	private label: Phaser.GameObjects.Text;
	private moneyLabel: Phaser.GameObjects.Text;
	private marketGroup: MarketGroupComponent; // TODO: Needs to be updated to actually be a Tab

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.init();
	}

	private init() {
		const activeManager = this.marketManager.getActiveManager();
		this.setStrokeStyle(1, 0xffffff);
		this.label = this.scene.add.text(this.x + 10, this.y + 10, `Market`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30);

		let yOffset = this.label.y + this.label.getBounds().height;
		
		this.moneyLabel = this.scene.add.text(this.x + this.width - 100, this.y + 10, `$${this.marketManager.money}`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30)

		this.marketGroup = this.scene.add.resourceUpgradeMarketGroup(activeManager, this.x, yOffset, this.width, this.height);
		
		this.marketManager.on('activeresourcechange', this.setActiveResourceManager.bind(this));
	}

	private setActiveResourceManager(resourceManager: ResourceManager) {
		this.marketGroup.activeResourceManager = resourceManager;
	}

	public preUpdate(delta: number) {
		this.moneyLabel
		.setText(`$${this.marketManager.money}`)
		.setPosition(this.x + this.width - this.moneyLabel.width - 10, this.moneyLabel.y);
	}

	public destroy() {
		super.destroy();

		this.label.destroy();
		this.moneyLabel.destroy();
		this.marketGroup?.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'market',
	function (this: Phaser.GameObjects.GameObjectFactory, marketManager: MarketManager, x: number, y: number, width: number = 100, height: number = 84) {
		const marketGameObject = new MarketComponent(this.scene, marketManager, x, y, width, height);
		marketGameObject.setOrigin(0);
		
		this.displayList.add(marketGameObject);
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