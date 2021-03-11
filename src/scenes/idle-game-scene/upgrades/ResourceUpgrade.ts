import Resource from "../resources/Resource";
import Upgrade from "./Upgrade";

export default abstract class ResourceUpgrade<T extends Resource> extends Upgrade<T> {
	public constructor(level: number, name: string, type: string, cost: number) {
		super(level, name, type, cost);
	}
}