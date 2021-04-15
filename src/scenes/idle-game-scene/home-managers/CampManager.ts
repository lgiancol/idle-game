
import Resource from "../resources/ResourceTypes";
import HomeManager from "./HomeManager";

export default class CampManager extends HomeManager {
	public constructor() {
		super('Camp', Resource.LOG, 5, 0.035, 5);
	}
}