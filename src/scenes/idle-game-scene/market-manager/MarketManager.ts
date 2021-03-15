import Resource, { ResourceType } from "../resources/Resource";
import ResourceUpgradeManager from "../resources/upgrades/upgrade-managers/ResourceUpgradeManager";

export default class MarketManager extends Phaser.Events.EventEmitter {
	public money: number;

	// All the upgrades by resource
	// All the upgrades available to the user
	private resourceUpgradeManagers: {[resourceName: string]: ResourceUpgradeManager};
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

	public setUpgradeManager(resourceType: ResourceType, resourceUpgradeManager: ResourceUpgradeManager) {
		this.resourceUpgradeManagers[resourceType] = resourceUpgradeManager;
	}

	public getUpgradeManager(resourceType: ResourceType) {
		return this.resourceUpgradeManagers[resourceType];
	}
}