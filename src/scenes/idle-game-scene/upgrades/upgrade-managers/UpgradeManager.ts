import Upgrade from "../Upgrade";

export default abstract class UpgradeManager<T> {
	public upgrades: {[upgradeGroup: string]: Upgrade[]};
	public currentUpgradeIndex: {[upgradeGroup: string]: number};

	protected abstract initializeUpgrades();
	public abstract canAffordUpgrade(upgrade: Upgrade);
	public abstract buyUpgrade(upgradeGroup: string, level: number);
}