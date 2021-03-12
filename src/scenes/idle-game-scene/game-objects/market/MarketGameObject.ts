import MarketManager from "../../market-manager/MarketManager";
import ResourceUpgradeManager from "../../upgrades/upgrade-managers/ResourceUpgradeManager";
import { ResourceUpgradeGameObject } from "../resource-upgrades/ResourceUpgradeGameObject";

export default class MarketGameObject extends Phaser.GameObjects.Rectangle {
	private activeUpgradeResourceManagerGo: ResourceUpgradeGameObject;

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.init();
	}

	private init() {
		const activeUpgradeManager = this.marketManager.getActiveResourceManager();
		if(activeUpgradeManager) {
			this.activeUpgradeResourceManagerGo = this.scene.add.resourceUpgrade(activeUpgradeManager, this.x, this.y, this.width, this.height);
		}
	}

	public setActiveUpgradeResourceManagerGo(resourceManager: ResourceUpgradeManager<any>) {
		// this.activeUpgradeResourceManagerGo = resourceManager
		this.activeUpgradeResourceManagerGo.setActiveUpgradeManager(resourceManager);
	}

	public preUpdate() {}
}

Phaser.GameObjects.GameObjectFactory.register(
	'market',
	function (this: Phaser.GameObjects.GameObjectFactory, marketManager: MarketManager, x: number, y: number, width: number = 100, height: number = 84) {
		const marketGameObject = new MarketGameObject(this.scene, marketManager, x, y, width, height);
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
			market(marketManager: MarketManager, x: number, y: number, width?: number, height?: number): MarketGameObject
		}
	}
}