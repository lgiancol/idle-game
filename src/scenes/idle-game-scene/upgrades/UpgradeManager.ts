import Queue from "../../../utils/queue/Queue";
import Upgrade from "./Upgrade";

export default abstract class UpgradeManager {
	public upgrades: {[upgradeGroup: string]: Queue<Upgrade>};

	protected abstract initializeUpgrades();
	public abstract canAffordUpgrade(upgrade: Upgrade): boolean;
	public abstract buyUpgrade(upgradeGroup: string);
}