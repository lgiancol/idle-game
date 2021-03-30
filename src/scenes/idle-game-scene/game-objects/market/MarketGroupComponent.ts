import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceUpgradeManager from "../../resources/upgrades/upgrade-managers/ResourceUpgradeManager";

export default class MarketGroupComponent extends Phaser.GameObjects.Rectangle {
	public constructor(scene: Phaser.Scene, private _activeResourceManager: ResourceManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
	}

	get activeResourceManager() {
		return this._activeResourceManager;
	}

	set activeResourceManager(activeResourceManager: ResourceManager) {
		this._activeResourceManager = activeResourceManager;
		this.init();
	}

	public init() {
		// TODO: Create the label and tabs here
	};
}

Phaser.GameObjects.GameObjectFactory.register(
	'marketGroup',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceUpgrade = new MarketGroupComponent(this.scene, resourceManager, x, y, width, height);
		resourceUpgrade.setOrigin(0);
		
		this.displayList.add(resourceUpgrade);
		this.updateList.add(resourceUpgrade);

		return resourceUpgrade;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			marketGroup(resourceUpgradeManager: ResourceUpgradeManager, x: number, y: number, width?: number, height?: number): MarketGroupComponent
		}
	}
}