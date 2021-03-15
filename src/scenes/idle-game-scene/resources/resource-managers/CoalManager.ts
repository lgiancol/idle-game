import Coal from "../Coal";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super('Coal', new Coal());
	}
}