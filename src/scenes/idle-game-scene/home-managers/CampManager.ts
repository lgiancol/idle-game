import Log from "../resources/Log";
import ResourceManager from "../resources/resource-managers/ResourceManager";
import HomeManager from "./HomeManager";

export default class CampManager extends HomeManager {
	public constructor(resourcemanager: ResourceManager<Log>) {
		super('Camp', resourcemanager, 3, 0.15);
	}
}