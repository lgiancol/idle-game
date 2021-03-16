import { ResourceType } from "../resources/Resource";
import ResourceManager from "../resources/resource-managers/ResourceManager";

export default class MarketManager extends Phaser.Events.EventEmitter {
	public money: number = 0;

	// All the upgrades by resource
	// All the upgrades available to the user
	private managers: {[resourceName: string]: ResourceManager}; // TODO: This should end up being just a manager type
	private activeResource: ResourceType = null;

	public constructor() {
		super();
		this.managers = {};
	}

	public getActiveResource() {
		return this.activeResource;
	}

	public setActiveResource(activeResource: ResourceType) {
		this.activeResource = activeResource;
		this.emit('activeresourcechange', this.getActiveManager());
	}

	public getActiveManager() {
		return this.managers[this.activeResource];
	}

	public addResourceManager(resourceType: ResourceType, resourceUpgradeManager: ResourceManager) {
		this.managers[resourceType] = resourceUpgradeManager;
	}

	public getUpgradeManager(resourceType: ResourceType) {
		return this.managers[resourceType];
	}

	// Money area
	public addFunds(toAdd: number) {
		this.money += toAdd;
	}
}