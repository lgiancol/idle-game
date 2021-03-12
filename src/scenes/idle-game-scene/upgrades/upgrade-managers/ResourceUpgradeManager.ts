import Log from "../../resources/Log";
import Resource from "../../resources/Resource";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import ResourceUpgrade from "../ResourceUpgrade";
import Upgrade from "../Upgrade";
import CollectSpeedUpgrade from "../upgrade-types/CollectSpeedUpgrade";
import UpgradeManager from "./UpgradeManager";

export default abstract class ResourceUpgradeManager<T extends Resource> extends UpgradeManager<T> {
	public constructor(public resourceManager: ResourceManager<Log>) {
		super();

		this.upgrades = {
			[Upgrade.Type.COLLECT_SPEED]: []
		};
		this.currentUpgradeIndex = {
			[Upgrade.Type.COLLECT_SPEED]: 0
		};
	}

	public canAffordUpgrade(upgrade: Upgrade) {
		return this.resourceManager.hasMinimumOf(upgrade.cost);
	}

	public getCurrentUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName][this.currentUpgradeIndex[upgradeName]] as ResourceUpgrade;
	}

	public buyCollectSpeedUpgrade(level: number) {
		let upgrade = this.upgrades[Upgrade.Type.COLLECT_SPEED][level - 1] as CollectSpeedUpgrade; // Levels != index
		
		this.resourceManager.resourceQuantity.decreaseQuantity(upgrade.cost);
		if(this.resourceManager.autoCollectSpeed == 0) {
			this.resourceManager.autoCollectSpeed = upgrade.collectSpeedMultiplier;
		} else {
			this.resourceManager.autoCollectSpeed *= upgrade.collectSpeedMultiplier;
		}

		this.currentUpgradeIndex[Upgrade.Type.COLLECT_SPEED]++;
	}
} 