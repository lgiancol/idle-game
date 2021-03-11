import Log from "../Log";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager<Log> {
	public constructor() {
		super('Log', new Log());
	}
}