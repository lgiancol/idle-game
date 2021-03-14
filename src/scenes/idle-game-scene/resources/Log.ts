import Resource from "./Resource";
import LogManager from "./resource-managers/LogManager";

export default class Log extends Resource {
	public constructor() {
		super('Log', 1);
	}
}