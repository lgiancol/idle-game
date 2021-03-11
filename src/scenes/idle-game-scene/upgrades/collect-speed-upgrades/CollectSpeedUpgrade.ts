import Resource from "../../resources/Resource";
import ResourceUpgrade from "../ResourceUpgrade";

export default abstract class CollectSpeedUpgrade<T extends Resource> extends ResourceUpgrade<T> {
	public constructor(level: number, name: string, public collectSpeedMultiplier: number) {
		super(level, name);
	}
}