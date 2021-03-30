import UpgradeType from "../../../upgrades/UpgradeType";
import ResourceUpgrade, { ResourceUpgradeValue } from "../ResourceUpgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class CoalUpgradeManager extends ResourceUpgradeManager {
	public constructor() {
		super();
	}

	protected initCollectSpeedUpgrades() {
		let baseSpeed = 1;
		const baseCost = 10;
		for(let i = 0; i < 10; i++) {
			let upgradeCost = Math.round(baseCost * Math.pow(2.65, i));
			let upgradeSpeed = Math.round(baseSpeed * 1.8);

			const upgradeValues = {
				autoCollectMultiplier: upgradeSpeed
			} as ResourceUpgradeValue;
			const collectSpeedUpgrade = new ResourceUpgrade('COAL_COLLECT_SPEED_INCREASE_' + i, UpgradeType.COLLECT_SPEED, upgradeCost, upgradeValues);
			this.upgrades[UpgradeType.COLLECT_SPEED].enqueue(collectSpeedUpgrade);
		}
	}

	protected initValueUpgrades() {

	}
}