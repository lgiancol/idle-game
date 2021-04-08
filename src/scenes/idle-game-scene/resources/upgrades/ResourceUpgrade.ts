import Upgrade from "../../upgrades/Upgrade";

export interface ResourceUpgradeValue {
	manualCollectMultiplier?: number,
	autoCollectMultiplier?: number,
}

export default class ResourceUpgrade extends Upgrade {
	public constructor(name: string, type: string, cost: number, public upgradeValues: ResourceUpgradeValue) {
		super(name, type, cost);
	}
}