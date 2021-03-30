import LogManager from "../resources/resource-managers/LogManager";
import HomeManager from "./HomeManager";

export default class CampManager extends HomeManager {
	public constructor(resourcemanager: LogManager) {
		super('Camp', resourcemanager, 5, 0.35, 5);
	}
}