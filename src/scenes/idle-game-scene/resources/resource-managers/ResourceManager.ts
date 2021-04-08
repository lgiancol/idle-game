import { UpgradeConfig } from "../../upgrades/UpgradeManager";
import { UpgradeType } from "../../upgrades/UpgradeType";
import { ResourceType } from "../ResourceTypes";
import ResourceUpgrade from "../upgrades/ResourceUpgrade";
import ResourceUpgradeManager from "../upgrades/upgrade-managers/ResourceUpgradeManager";
import ResourceCollector from "./resource-collector/ResourceCollector";
import ResourceSeller from "./resource-seller/ResourceSeller";

export default class ResourceManager {
	private _resourceCollector: ResourceCollector = new ResourceCollector();
	private _resourceUpgradeManager: ResourceUpgradeManager
	private _resourceSeller: ResourceSeller;

	private upgrades = {
		[UpgradeType.CLICK_MULTIPLIER]: { upgradeNames: ['Ouu', 'Eee', 'Ahh', 'Meh'], baseCost: 2, baseValue: 1, upgradeValueIndex: 'manualCollectMultiplier'},
		[UpgradeType.COLLECT_SPEED]: { upgradeNames: ['Level 1', 'Level 2', 'Level 3'], baseCost: 10, baseValue: 2, upgradeValueIndex: 'autoCollectMultiplier'},
	} as {[upgradeType: string]: UpgradeConfig};

	public constructor(public resourceType: ResourceType, startingSellValue: number) {
		this._resourceUpgradeManager = new ResourceUpgradeManager(this.resourceType, this.upgrades);
		this._resourceSeller = new ResourceSeller(startingSellValue);
	}

	get upgradeTypes() {
		return Object.keys(this.upgrades).map((upgradeTypeStr: string) => UpgradeType[upgradeTypeStr]);
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
		let upgrade = this._resourceUpgradeManager.upgrades[upgradeType].dequeue() as ResourceUpgrade;

		Object.entries(upgrade.upgradeValues).forEach((upgradeValueEntry: [string, number]) => {
			this._resourceCollector[upgradeValueEntry[0]] = upgradeValueEntry[1];
		});
	}

	public hasMinimumOf(min: number) {
		return this._resourceCollector.quantity >= min;
	}
}