import Upgrade from "../Upgrade";

export default abstract class UpgradeManager<T> {
	public upgrades: {[upgradeGroup: string]: Upgrade<T>[]};

	public abstract initializeUpgrades();
	public abstract applyUpgrade(upgradeGroup: string, level: number);
}