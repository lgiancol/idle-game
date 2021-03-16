import Log from "../Log";
import { ResourceType } from "../Resource";
import ResourceSeller from "./resource-seller/ResourceSeller";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager {
	public constructor() {
		super(ResourceType.LOG, new Log());
	}
}