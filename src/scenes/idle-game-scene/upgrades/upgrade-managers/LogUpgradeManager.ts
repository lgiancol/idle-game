import Log from "../../resources/Log";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import LogCollectSpeedUpgrade from "../collect-speed-upgrades/logs/LogCollectSpeedUpgrade";
import Upgrade from "../Upgrade";
import ResourceUpgradeManager from "./ResourceUpgradeManager";

export default class LogUpgradeManager extends ResourceUpgradeManager<Log> {
	public constructor(resourceManager: ResourceManager<Log>) {
		super(resourceManager);

		this.initializeUpgrades();
	}

	public initializeUpgrades() {
		this.upgrades[Upgrade.Type.COLLECT_SPEED].push(new LogCollectSpeedUpgrade(1, 'LOG_COLLECT_SPEED_INCREASE', 5));
	}

	public applyUpgrade(upgradeGroup: string, level: number) {
		switch(upgradeGroup) {
			case Upgrade.Type.COLLECT_SPEED: {
				this.applyCollectSpeedUpgrade(level);
			}
		}
	}
}