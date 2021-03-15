import Queue from "../../../../../utils/queue/Queue";
import Upgrade from "../../../upgrades/Upgrade";
import UpgradeManager from "../../../upgrades/UpgradeManager";
import UpgradeType from "../../../upgrades/UpgradeType";
import Log from "../../Log";
import Resource from "../../Resource";
import ResourceManager from "../../resource-managers/ResourceManager";
import CollectSpeedUpgrade from "../CollectSpeedUpgrade";
import ResourceUpgrade from "../ResourceUpgrade";

export default abstract class ResourceUpgradeManager extends UpgradeManager {
	public constructor(public resourceManager: ResourceManager) {
		super();

		this.upgrades = {
			[UpgradeType.COLLECT_SPEED]: new Queue<Upgrade>()
		};
	}

	public canAffordUpgrade(upgrade: Upgrade) {
		return this.resourceManager.hasMinimumOf(upgrade.cost);
	}

	public getCurrentUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].peek() as ResourceUpgrade;
	}

	public buyCollectSpeedUpgrade() {
		let upgrade = this.upgrades[UpgradeType.COLLECT_SPEED].dequeue() as CollectSpeedUpgrade; // Levels != index
		
		this.resourceManager.removeResource(upgrade.cost); // TODO: This should actually change to be money
		this.resourceManager.updateCollectorProperty('autoCollectMultiplier', upgrade.collectSpeedMultiplier);
	}
} 