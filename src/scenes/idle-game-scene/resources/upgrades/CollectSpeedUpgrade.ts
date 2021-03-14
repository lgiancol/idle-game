import ResourceUpgrade from "./ResourceUpgrade";
import Upgrade from "../../upgrades/Upgrade";

export default class CollectSpeedUpgrade extends ResourceUpgrade {
	public constructor(level: number, name: string, public collectSpeedMultiplier: number, cost: number) {
		super(level, name, Upgrade.Type.COLLECT_SPEED, cost);
	}
}