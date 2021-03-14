import Coal from "../../resources/Coal";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import Upgrade from "../Upgrade";
import CollectSpeedUpgrade from "../upgrade-types/CollectSpeedUpgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class CoalUpgradeManager extends ResourceUpgradeManager<Coal> {
	public constructor(resourceManager: ResourceManager<Coal>) {
		super(resourceManager);

		this.initializeUpgrades();
	}

	protected initializeUpgrades() {
		let baseSpeed = 1;
		const baseCost = 10;
		for(let i = 0; i < 10; i++) {
			let upgradeCost = Math.round(baseCost * Math.pow(2.65, i));
			let upgradeSpeed = Math.round(baseSpeed * 1.8);
			this.upgrades[Upgrade.Type.COLLECT_SPEED].enqueue(new CollectSpeedUpgrade(i + 1, 'COAL_COLLECT_SPEED_INCREASE_' + i, upgradeSpeed, upgradeCost));
		}
	}

	public buyUpgrade(upgradeGroup: string) {
		switch(upgradeGroup) {
			case Upgrade.Type.COLLECT_SPEED: {
				this.buyCollectSpeedUpgrade();
			}
		}
	}
}