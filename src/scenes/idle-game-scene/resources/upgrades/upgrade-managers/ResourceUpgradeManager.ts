import Queue from "../../../../../utils/queue/Queue";
import Upgrade from "../../../upgrades/Upgrade";
import UpgradeManager from "../../../upgrades/UpgradeManager";
import { UpgradeType } from "../../../upgrades/UpgradeType";
import { ResourceType } from "../../ResourceTypes";
import ResourceUpgrade, { ResourceUpgradeValue } from "../ResourceUpgrade";

export default class ResourceUpgradeManager extends UpgradeManager {

	public constructor(protected _resourceType: ResourceType, upgradeConfigs: {[upgradeType: string]: { upgradeNames: string[], baseCost: number, baseValue: number, upgradeValueIndex: string }}) {
		super();

		this.upgrades = {};
		Object.keys(upgradeConfigs).forEach((upgradeType: UpgradeType) => {
			this.upgrades[upgradeType] = new Queue<Upgrade>();
		});

		this.initializeUpgrades(upgradeConfigs);
	}

	protected initializeUpgrades(upgradeConfigs: {[upgradeType: string]: { upgradeNames: string[], baseCost: number, baseValue: number, upgradeValueIndex: string }}) {
		Object.entries(upgradeConfigs).forEach((entry) => {
			this.initUpgradesOfType(entry[0], entry[1]);
		});
	}

	private initUpgradesOfType(upgradeType: string, upgradeConfig: {upgradeNames: string[], baseCost: number, baseValue: number, upgradeValueIndex: string}) {
			upgradeConfig.upgradeNames.forEach((upgradeName: string, i: number) => {
			let upgradeCost = Math.round(upgradeConfig.baseCost * Math.pow(2.65, i));
			let upgradeValue = Math.round(upgradeConfig.baseValue * (i + 1));
	
			const upgradeValues = {
				[upgradeConfig.upgradeValueIndex]: upgradeValue
			} as ResourceUpgradeValue;
			this.upgrades[upgradeType].enqueue(new ResourceUpgrade(upgradeName,upgradeType, upgradeCost, upgradeValues));
		});
	}

	public peekCurrentUpgrade(upgradeName: string) {	
		return this.upgrades[upgradeName].peek() as ResourceUpgrade;
	}

	public dequeueUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].dequeue();
	}
} 