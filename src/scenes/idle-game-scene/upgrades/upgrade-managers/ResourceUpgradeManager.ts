import Log from "../../resources/Log";
import Resource from "../../resources/Resource";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import CollectSpeedUpgrade from "../collect-speed-upgrades/CollectSpeedUpgrade";
import Upgrade from "../Upgrade";
import UpgradeManager from "./UpgradeManager";

export default abstract class ResourceUpgradeManager<T extends Resource> extends UpgradeManager<T> {
	public constructor(public resourceManager: ResourceManager<Log>) {
		super();

		this.upgrades = {
			[Upgrade.Type.COLLECT_SPEED]: []
		};
	}

	public applyCollectSpeedUpgrade(level: number) {
		let upgradeToApply = this.upgrades[Upgrade.Type.COLLECT_SPEED][level - 1] as CollectSpeedUpgrade<T>; // Levels != index
		
		this.resourceManager.autoCollectSpeed *= upgradeToApply.collectSpeedMultiplier;
	}
} 