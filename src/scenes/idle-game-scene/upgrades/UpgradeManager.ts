import Queue from "../../../utils/queue/Queue";
import Upgrade from "./Upgrade";

export interface UpgradeConfig {
	upgradeNames: string[],
	baseCost: number,
	baseValue: number,
	upgradeValueIndex: string
}

export default abstract class UpgradeManager {
	public upgrades: {[upgradeGroup: string]: Queue<Upgrade>};

	protected abstract initializeUpgrades(upgradeConfigs: {[upgradeName: string]: UpgradeConfig});
}