import UpgradeType from "../../../upgrades/UpgradeType";
import ResourceUpgrade, { ResourceUpgradeValue } from "../ResourceUpgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class LogUpgradeManager extends ResourceUpgradeManager {
	public constructor() {
		super();

		this.initializeUpgrades();
	}

	protected initializeUpgrades() {
		let baseSpeed = 2;
		const baseCost = 10;
		for(let i = 0; i < 10; i++) {
			let upgradeCost = Math.round(baseCost * Math.pow(2.65, i));
			let upgradeSpeed = Math.round(baseSpeed * (i + 1) * (Math.random() + 1));

			const upgradeValues = {
				autoCollectMultiplier: upgradeSpeed
			} as ResourceUpgradeValue;
			this.upgrades[UpgradeType.COLLECT_SPEED].enqueue(new ResourceUpgrade('LOG_COLLECT_SPEED_INCREASE_' + i, UpgradeType.COLLECT_SPEED, upgradeCost, upgradeValues));
		}
	}
}