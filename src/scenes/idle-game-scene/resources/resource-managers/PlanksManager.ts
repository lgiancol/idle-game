import { UpgradeType } from "../../upgrades/UpgradeType";
import Resource from "../ResourceTypes";
import ResourceManager from "./ResourceManager";

export default class PlanksManager extends ResourceManager {
	public constructor() {
		super(Resource.PLANKS, {
			// TODO: Make this UpgradeType.VALUE_MULTIPLIER
			[UpgradeType.CLICK_MULTIPLIER]: { upgradeNames: ['Cheese', 'Cheddar', 'Oops', 'Glee'], baseCost: 2, baseValue: 1, upgradeValueIndex: 'manualCollectMultiplier'},
		});
	}
}