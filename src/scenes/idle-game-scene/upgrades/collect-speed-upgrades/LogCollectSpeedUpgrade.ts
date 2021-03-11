import Log from "../../resources/Log";
import CollectSpeedUpgrade from "./CollectSpeedUpgrade";

export default class LogCollectSpeedUpgrade extends CollectSpeedUpgrade<Log> {
	public constructor(level: number, name: string, collectSpeedMultiplier: number, cost: number) {
		super(level, name, collectSpeedMultiplier, cost);
	}
}