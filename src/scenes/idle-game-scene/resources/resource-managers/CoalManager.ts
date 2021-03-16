import Coal from "../Coal";
import { ResourceType } from "../Resource";
import CoalUpgradeManager from "../upgrades/upgrade-managers/CoalUpgradeManager";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super(ResourceType.COAL, new Coal(), new CoalUpgradeManager());
	}
}