import MarketManager from "./market-manager/MarketManager";
import { ResourceType } from "./resources/Resource";
import LogUpgradeManager from "./upgrades/upgrade-managers/LogUpgradeManager";

export default class GameManager {
	private _marketManager: MarketManager;

	public constructor() {
		this._marketManager = new MarketManager();

		// this.marketManager.setUpgradeManager(ResourceType.LOG, new LogUpgradeManager(this.logManager));
	}

	get marketManager() {
		return this._marketManager;
	}
}