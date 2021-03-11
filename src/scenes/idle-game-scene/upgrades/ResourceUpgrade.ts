import Resource from "../resources/Resource";
import Upgrade from "./Upgrade";

export default abstract class ResourceUpgrade<T extends Resource> extends Upgrade<T> {
	public constructor(level: number, name: string) {
		super(level, name);
	}
}