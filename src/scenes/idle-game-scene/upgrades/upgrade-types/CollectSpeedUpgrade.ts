import ResourceUpgrade from "../ResourceUpgrade";
import Upgrade from "../Upgrade";

export default abstract class CollectSpeedUpgrade extends ResourceUpgrade {
	public constructor(level: number, name: string, public collectSpeedMultiplier: number, cost: number) {
		super(level, name, Upgrade.Type.COLLECT_SPEED, cost);
	}
}