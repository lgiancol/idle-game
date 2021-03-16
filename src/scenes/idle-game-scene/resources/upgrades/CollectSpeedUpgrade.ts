import UpgradeType from "../../upgrades/UpgradeType";
import ResourceUpgrade from "./ResourceUpgrade";

export default class CollectSpeedUpgrade extends ResourceUpgrade {
	public constructor(name: string, cost: number) {
		super(name, UpgradeType.COLLECT_SPEED, cost, null);
	}
}