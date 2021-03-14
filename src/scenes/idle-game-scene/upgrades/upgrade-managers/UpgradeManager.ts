import Queue from "../../../../utils/queue/Queue";
import Upgrade from "../Upgrade";

export default abstract class UpgradeManager<T> {
	public upgrades: {[upgradeGroup: string]: Queue<Upgrade>};

	protected abstract initializeUpgrades();
	public abstract canAffordUpgrade(upgrade: Upgrade);
	public abstract buyUpgrade(upgradeGroup: string, level: number);
}