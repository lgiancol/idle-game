import { UpgradeType } from "../../upgrades/UpgradeType";
import { ResourceType } from "../ResourceTypes";
import ResourceManager from "./ResourceManager";

export default class CoalManager extends ResourceManager {
	public constructor() {
		super(ResourceType.COAL, 1, {
			[UpgradeType.CLICK_MULTIPLIER]: { upgradeNames: ['Cheese', 'Cheddar', 'Oops', 'Glee'], baseCost: 2, baseValue: 1, upgradeValueIndex: 'manualCollectMultiplier'},
			[UpgradeType.COLLECT_SPEED]: { upgradeNames: ['Leggo', 'My', 'Eggo'], baseCost: 125, baseValue: 2, upgradeValueIndex: 'autoCollectMultiplier'},
		}); // startingSellValue
	}
}