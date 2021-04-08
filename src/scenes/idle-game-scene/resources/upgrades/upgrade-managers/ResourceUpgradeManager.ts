import Queue from "../../../../../utils/queue/Queue";
import Upgrade from "../../../upgrades/Upgrade";
import UpgradeManager from "../../../upgrades/UpgradeManager";
import { UpgradeType } from "../../../upgrades/UpgradeType";
import ResourceUpgrade, { ResourceUpgradeValue } from "../ResourceUpgrade";

export default class ResourceUpgradeManager extends UpgradeManager {

	public constructor(private _validUpgradeTypes: UpgradeType[]) {
		super();

		this.upgrades = {};
		this._validUpgradeTypes.forEach((upgradeType: UpgradeType) => {
			this.upgrades[upgradeType] = new Queue<Upgrade>();
		});

		this.initializeUpgrades();
	}

	get validUpgrades() {
		return this._validUpgradeTypes;
	}

	protected initializeUpgrades() {
		this.initCollectSpeedUpgrades();
	}
	
	private initCollectSpeedUpgrades() {
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

	public peekCurrentUpgrade(upgradeName: string) {
		console.log(this.upgrades);
		return this.upgrades[upgradeName].peek() as ResourceUpgrade;
	}

	public dequeueUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].dequeue();
	}
} 