import MarketManager from "../../market-manager/MarketManager";
import ResourceUpgradeManager from "../../resources/upgrades/upgrade-managers/ResourceUpgradeManager";
import { ResourceUpgradeMarketGroupComponent } from "./resource-upgrade-market-groups/ResourceUpgradeMarketGroupComponent";

export default class MarketComponent extends Phaser.GameObjects.Rectangle {
	private resourceUpgradeMarketGroup: ResourceUpgradeMarketGroupComponent;

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.init();
	}

	private init() {
		const activeUpgradeManager = this.marketManager.getActiveResourceManager();
		this.resourceUpgradeMarketGroup = this.scene.add.resourceUpgrade(activeUpgradeManager, this.x, this.y, this.width, this.height);
		
		this.marketManager.on('activeresourcechange', this.setActiveUpgradeResourceManagerGo.bind(this));
	}

	public setActiveUpgradeResourceManagerGo(resourceManager: ResourceUpgradeManager<any>) {
		this.resourceUpgradeMarketGroup.setActiveUpgradeManager(resourceManager);
	}

	public preUpdate() {}
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