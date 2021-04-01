import { ResourceType } from "../Resource";
import LogUpgradeManager from "../upgrades/upgrade-managers/LogUpgradeManager";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager {
	public constructor() {
		super(ResourceType.LOG, new LogUpgradeManager());
	}
}