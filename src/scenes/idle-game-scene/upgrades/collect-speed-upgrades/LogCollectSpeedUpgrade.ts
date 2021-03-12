import CollectSpeedUpgrade from "../upgrade-types/CollectSpeedUpgrade";

export default class LogCollectSpeedUpgrade extends CollectSpeedUpgrade {
	public constructor(level: number, name: string, collectSpeedMultiplier: number, cost: number) {
		super(level, name, collectSpeedMultiplier, cost);
	}
}