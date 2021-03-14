import Queue from "../../../../../utils/queue/Queue";
import Log from "../../Log";
import Resource from "../../Resource";
import ResourceManager from "../../resource-managers/ResourceManager";
import ResourceUpgrade from "../ResourceUpgrade";
import Upgrade from "../../../upgrades/Upgrade";
import CollectSpeedUpgrade from "../CollectSpeedUpgrade";
import UpgradeManager from "../../../upgrades/UpgradeManager";

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