import Queue from "../../../../../utils/queue/Queue";
import Upgrade from "../../../upgrades/Upgrade";
import UpgradeManager from "../../../upgrades/UpgradeManager";
import UpgradeType from "../../../upgrades/UpgradeType";
import ResourceUpgrade from "../ResourceUpgrade";

export default abstract class ResourceUpgradeManager extends UpgradeManager {
	public constructor() {
		super();

		this.upgrades = {
			[UpgradeType.COLLECT_SPEED]: new Queue<Upgrade>()
		};
	}

	public peekCurrentUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].peek() as ResourceUpgrade;
	}

	public dequeueUpgrade(upgradeName: string) {
		return this.upgrades[upgradeName].dequeue();
	}
} 