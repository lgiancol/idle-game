import { UpgradeType } from "../../upgrades/UpgradeType";
import Resource from "../ResourceTypes";
import ResourceManager from "./ResourceManager";

export default class LogManager extends ResourceManager {
	public constructor() {
		super(Resource.LOG, {
			[UpgradeType.CLICK_MULTIPLIER]: { upgradeNames: ['Ouu', 'Eee', 'Ahh', 'Meh'], baseCost: 2, baseValue: 1, upgradeValueIndex: 'manualCollectMultiplier'},
			[UpgradeType.COLLECT_SPEED]: { upgradeNames: ['Level 1', 'Level 2', 'Level 3'], baseCost: 10, baseValue: 2, upgradeValueIndex: 'autoCollectMultiplier'},
		}); // startingSellValue
	}
}