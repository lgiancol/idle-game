import UpgradeType from "../../upgrades/UpgradeType";
import ResourceUpgrade from "./ResourceUpgrade";

export default class CollectSpeedUpgrade extends ResourceUpgrade {
	public constructor(level: number, name: string, public collectSpeedMultiplier: number, cost: number) {
		super(level, name, UpgradeType.COLLECT_SPEED, cost);
	}
}