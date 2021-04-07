import { ResourceType } from "../ResourceTypes";
import LogUpgradeManager from "../upgrades/upgrade-managers/LogUpgradeManager";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager {
	public constructor() {
		super(ResourceType.LOG, 1, new LogUpgradeManager());
	}
}