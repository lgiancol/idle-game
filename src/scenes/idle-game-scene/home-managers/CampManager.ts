import { ResourceType } from "../resources/Resource";
import LogManager from "../resources/resource-managers/LogManager";
import HomeManager from "./HomeManager";

export default class CampManager extends HomeManager {
	public constructor() {
		super('Camp', ResourceType.LOG, 5, 0.35, 5);
	}
}