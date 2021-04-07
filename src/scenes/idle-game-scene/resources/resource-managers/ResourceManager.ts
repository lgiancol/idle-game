import { ResourceType } from "../ResourceTypes";
// import Resources from "../Resources";
import ResourceUpgrade from "../upgrades/ResourceUpgrade";
import ResourceUpgradeManager from "../upgrades/upgrade-managers/ResourceUpgradeManager";
import ResourceCollector from "./resource-collector/ResourceCollector";
import ResourceSeller from "./resource-seller/ResourceSeller";

export default class ResourceManager {
	private _resourceCollector: ResourceCollector = new ResourceCollector();
	private _resourceSeller: ResourceSeller;

	public constructor(public resourceType: ResourceType, startingValue: number, private _resourceUpgradeManager: ResourceUpgradeManager) {
		this._resourceSeller = new ResourceSeller(startingValue);
	}

	get resourceName() {
		return this.resourceType;
	}

	get autoCollectSpeed() {
		return this._resourceCollector.autoCollectSpeed;
	}

	get clickCollectSpeed() {
		return this._resourceCollector.manualCollectSpeed;
	}

	get quantity() {
		return this._resourceCollector.quantity;
	}

	public update(delta: number) {
		this._resourceCollector.update(delta);
	}

	// COLLECTING AREA
	public collectResource(amountToCollect: number) {
		this._resourceCollector.increaseQuantity(amountToCollect);
	}

	public removeResource(amountToRemove: number) {
		this._resourceCollector.decreaseQuantity(amountToRemove);
	}

	// SELLING AREA
	public sellResource(amountToSell: number) {
		if(this._resourceCollector.quantity >= amountToSell) {
			this.removeResource(amountToSell);
			return this._resourceSeller.sellResource(amountToSell);
		}

		return -1;
	}

	// UPGRADING AREA
	public getCurrentUpgrade(upgradeType: string) {
		return this._resourceUpgradeManager.peekCurrentUpgrade(upgradeType);
	}
	
	public applyUpgrade(upgradeType: string) {
		let upgrade = this._resourceUpgradeManager.
		upgrades[upgradeType].dequeue() as ResourceUpgrade; // Levels != index
		
		Object.entries(upgrade.upgradeValues).forEach((upgradeValueEntry: [string, number]) => {
			this._resourceCollector[upgradeValueEntry[0]] = upgradeValueEntry[1];
		});
	}

	public hasMinimumOf(min: number) {
		return this._resourceCollector.quantity >= min;
	}
}