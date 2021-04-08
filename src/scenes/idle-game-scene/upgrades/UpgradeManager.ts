import Queue from "../../../utils/queue/Queue";
import Upgrade from "./Upgrade";

export default abstract class UpgradeManager {
	public upgrades: {[upgradeGroup: string]: Queue<Upgrade>};

	protected abstract initializeUpgrades(upgradeConfigs: {[upgradeType: string]: { upgradeNames: string[], baseCost: number, baseValue: number, upgradeValueIndex: string }});
}