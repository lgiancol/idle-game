import Queue from "../../../../../utils/queue/Queue";
import Upgrade from "../../../upgrades/Upgrade";
import UpgradeManager, { UpgradeConfig } from "../../../upgrades/UpgradeManager";
import { UpgradeType } from "../../../upgrades/UpgradeType";
import Resource from "../../ResourceTypes";
import ResourceUpgrade, { ResourceUpgradeValue } from "../ResourceUpgrade";

export default class ResourceUpgradeManager extends UpgradeManager {

	public constructor(protected _resource: Resource, upgradeConfigs: {[upgradeType: string]: UpgradeConfig}) {
		super();

		this.upgrades = {};
		Object.keys(upgradeConfigs).forEach((upgradeType: UpgradeType) => {
			this.upgrades[upgradeType] = new Queue<Upgrade>();
		});

		this.initializeUpgrades(upgradeConfigs);
	}

	protected initializeUpgrades(upgradeConfigs: {[upgradeType: string]: UpgradeConfig}) {
		Object.entries(upgradeConfigs).forEach((entry) => {
			this.initUpgradesOfType(entry[0], entry[1]);
		});
	}

	private initUpgradesOfType(upgradeType: string, upgradesConfig: UpgradeConfig) {
			upgradesConfig.upgradeNames.forEach((upgradeName: string, i: number) => {
			let upgradeCost = Math.round(upgradesConfig.baseCost * Math.pow(2.65, i));
			let upgradeValue = Math.round(upgradesConfig.baseValue * (i + 1));
	
			const upgradeValues = {
				[upgradesConfig.upgradeValueIndex]: upgradeValue
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