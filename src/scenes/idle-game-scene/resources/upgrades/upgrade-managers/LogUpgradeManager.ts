import UpgradeType from "../../../upgrades/UpgradeType";
import Log from "../../Log";
import ResourceManager from "../../resource-managers/ResourceManager";
import CollectSpeedUpgrade from "../CollectSpeedUpgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class LogUpgradeManager extends ResourceUpgradeManager<Log> {
	public constructor(resourceManager: ResourceManager<Log>) {
		super(resourceManager);

		this.initializeUpgrades();
	}

	protected initializeUpgrades() {
		let baseSpeed = 2;
		const baseCost = 10;
		for(let i = 0; i < 10; i++) {
			let upgradeCost = Math.round(baseCost * Math.pow(2.65, i));
			let upgradeSpeed = Math.round(baseSpeed * (i + 1) * 1);
			this.upgrades[UpgradeType.COLLECT_SPEED].enqueue(new CollectSpeedUpgrade(i + 1, 'LOG_COLLECT_SPEED_INCREASE_' + i, upgradeSpeed, upgradeCost));
		}
	}

	public buyUpgrade(upgradeGroup: string) {
		switch(upgradeGroup) {
			case UpgradeType.COLLECT_SPEED: {
				this.buyCollectSpeedUpgrade();
			}
		}
	}
}