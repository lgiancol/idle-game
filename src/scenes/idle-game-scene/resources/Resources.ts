import Coal from "./Coal";
import Log from "./Log";
import { ResourceType } from "./Resource";

export default class Resources {
	private static _LOG = new Log();
	private static _COAL = new Coal();
	
	static getByType(resourceType: ResourceType) {
		switch(resourceType) {
			case ResourceType.LOG: {
				return Resources._LOG;
			}
			case ResourceType.COAL: {
				return Resources._COAL;
			}
		}
	}
}