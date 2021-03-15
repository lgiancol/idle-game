import Log from "../Log";
import ResourceSeller from "./resource-seller/ResourceSeller";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager<Log> {
	public constructor() {
		super('Log', new Log());
	}
}