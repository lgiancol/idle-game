import { ResourceType } from "../ResourceTypes";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super(ResourceType.COAL, 1); // startingSellValue
	}
}