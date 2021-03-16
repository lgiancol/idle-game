import Coal from "../Coal";
import { ResourceType } from "../Resource";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super(ResourceType.COAL, new Coal());
	}
}