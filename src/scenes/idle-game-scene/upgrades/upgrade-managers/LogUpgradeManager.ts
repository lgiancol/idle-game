import Log from "../../resources/Log";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import LogCollectSpeedUpgrade from "../collect-speed-upgrades/LogCollectSpeedUpgrade";
import Upgrade from "../Upgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class LogUpgradeManager extends ResourceUpgradeManager<Log> {
	public constructor(resourceManager: ResourceManager<Log>) {
		super(resourceManager);

		this.initializeUpgrades();
	}

	public initializeUpgrades() {
		let baseSpeed = 1;
		for(let i = 0; i < 10; i++) {
			this.upgrades[Upgrade.Type.COLLECT_SPEED].push(new LogCollectSpeedUpgrade(i + 1, 'LOG_COLLECT_SPEED_INCREASE_' + i, ((baseSpeed * i) + baseSpeed), i * 10 + 10));
		}
	}

	public buyUpgrade(upgradeGroup: string, level: number) {
		switch(upgradeGroup) {
			case Upgrade.Type.COLLECT_SPEED: {
				this.buyCollectSpeedUpgrade(level);
			}
		}
	}
}