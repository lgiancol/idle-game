import { ResourceType } from "../ResourceTypes";
import CoalUpgradeManager from "../upgrades/upgrade-managers/CoalUpgradeManager";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super(ResourceType.COAL, 1, new CoalUpgradeManager());
	}
}