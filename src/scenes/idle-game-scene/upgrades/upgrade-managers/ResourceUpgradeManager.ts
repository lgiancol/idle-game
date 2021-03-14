import Queue from "../../../../utils/queue/Queue";
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
			[Upgrade.Type.COLLECT_SPEED]: new Queue<Upgrade>()
		};
	}

	public canAffordUpgrade(upgrade: Upgrade) {
		return this.resourceManager.hasMinimumOf(upgrade.cost);
	}

	public getCurrentUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].peek() as ResourceUpgrade;
	}

	public buyCollectSpeedUpgrade() {
		let upgrade = this.upgrades[Upgrade.Type.COLLECT_SPEED].dequeue() as CollectSpeedUpgrade; // Levels != index
		
		this.resourceManager.resourceQuantity.decreaseQuantity(upgrade.cost);
		if(this.resourceManager.autoCollectSpeed == 0) {
			this.resourceManager.autoCollectSpeed = 1;
		}
		this.resourceManager.autoCollectSpeed *= upgrade.collectSpeedMultiplier;
	}
} 