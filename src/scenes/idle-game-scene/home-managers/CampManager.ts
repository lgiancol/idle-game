import ResourceManager from "../resource-managers/ResourceManager";
import HomeManager from "./HomeManager";

export default class CampManager extends HomeManager {
	public constructor(resourceFuelManager: ResourceManager) {
		super('Camp', resourceFuelManager, 3, 0.15);
	}
}