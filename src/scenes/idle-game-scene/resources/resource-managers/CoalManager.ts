import Coal from "../Coal";
import Log from "../Log";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager<Coal> {
	public constructor() {
		super('Coal', new Coal());
	}
}