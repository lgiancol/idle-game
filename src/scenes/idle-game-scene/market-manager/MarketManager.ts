import Resource, { ResourceType } from "../resources/Resource";
import ResourceUpgradeManager from "../upgrade-managers/resource-upgrade-managers/ResourceUpgradeManager";

export default class MarketManager extends Phaser.Events.EventEmitter {
	public money: number;

	// All the upgrades by resource
	// All the upgrades available to the user
	public resourceUpgradeManagers: {[resourceName: string]: ResourceUpgradeManager<any>};
	private activeResource: ResourceType = null;

	public constructor() {
		super();
		this.resourceUpgradeManagers = {};
	}

	public getActiveResource() {
		return this.activeResource;
	}

	public setActiveResource(activeResource: ResourceType) {
		this.activeResource = activeResource;
		this.emit('activeresourcechange', this.getActiveResourceManager());
	}

	public getActiveResourceManager() {
		return this.resourceUpgradeManagers[this.activeResource];
	}

	public setUpgradeManager<T extends Resource>(resourceType: ResourceType, resourceUpgradeManager: ResourceUpgradeManager<T>) {
		this.resourceUpgradeManagers[resourceType] = resourceUpgradeManager;
	}

	public getUpgradeManager<T extends Resource>(resourceType: ResourceType) {
		return this.resourceUpgradeManagers[resourceType] as ResourceUpgradeManager<T>;
	}
}