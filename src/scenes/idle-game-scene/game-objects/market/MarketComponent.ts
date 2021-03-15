import MarketManager from "../../market-manager/MarketManager";
import UpgradeManager from "../../upgrades/UpgradeManager";
import MarketGroupComponent from "./MarketGroupComponent";

export default class MarketComponent extends Phaser.GameObjects.Rectangle {
	private activeMarketGroup: MarketGroupComponent;

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.init();
	}

	private init() {
		const activeUpgradeManager = this.marketManager.getActiveResourceManager();
		this.activeMarketGroup = this.scene.add.resourceUpgradeMarketGroup(activeUpgradeManager, this.x, this.y, this.width, this.height);
		
		this.marketManager.on('activeresourcechange', this.setActiveUpgradeResourceManagerGo.bind(this));
	}

	public setActiveUpgradeResourceManagerGo(upgradeManager: UpgradeManager<any>) {
		this.activeMarketGroup.activeUpgradeManager = upgradeManager;
	}

	// public preUpdate() {}
}

Phaser.GameObjects.GameObjectFactory.register(
	'market',
	function (this: Phaser.GameObjects.GameObjectFactory, marketManager: MarketManager, x: number, y: number, width: number = 100, height: number = 84) {
		const marketGameObject = new MarketComponent(this.scene, marketManager, x, y, width, height);
		marketGameObject.setOrigin(0);
		
		this.displayList.add(marketGameObject);
		// this.updateList.add(marketGameObject);

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