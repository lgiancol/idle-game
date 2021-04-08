import { ResourceType } from "../ResourceTypes";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager {
	public constructor() {
		super(ResourceType.LOG, 0.5); // startingSellValue
	}
}