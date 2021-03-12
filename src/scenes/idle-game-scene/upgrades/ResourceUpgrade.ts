import Upgrade from "./Upgrade";

export default abstract class ResourceUpgrade extends Upgrade {
	public constructor(level: number, name: string, type: string, cost: number) {
		super(level, name, type, cost);
	}
}