import Player from "../Player";
import ResourceManager from "../resources/resource-managers/ResourceManager";
import Resource from "../resources/Resource";

export default class MarketManager extends Phaser.Events.EventEmitter {
	public money: number = 0;

	// All the upgrades by resource
	// All the upgrades available to the user
	private managers: {[resourceName: string]: ResourceManager}; // TODO: This should end up being just a manager type

	public constructor() {
		super();
		this.managers = {};

		const player = Player.getInstance();

		Object.values(player.resourceManagers).forEach((resourceManager: ResourceManager) => {
			this.addResourceManager(resourceManager.resource, resourceManager);
		});
	}

	public addResourceManager(resource: Resource, resourceUpgradeManager: ResourceManager) {
		this.managers[resource.name] = resourceUpgradeManager;
	}

	public getManager(resource: Resource) {
		return this.managers[resource.name];
	}

	// Money area
	public addFunds(toAdd: number) {
		this.money += toAdd;
	}

	public removeFunds(toRemove: number) {
		this.money -= toRemove;
	}

	public canAfford(cost: number) {
		return this.money >= cost;
	}
}