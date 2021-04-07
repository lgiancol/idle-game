import { ResourceType } from './resources/ResourceTypes';
import ResourceManager from './resources/resource-managers/ResourceManager';
export default class Player {
	private static _instance: Player;
	private _money: number;
	private _resourceManagers: { [resourceType: string]: ResourceManager};

	private constructor() {
		this._money = 0;
		this._resourceManagers = {};
	}
	static fromJson(json: any) {}
	static getInstance() {
		if(!Player._instance) {
			Player._instance = new Player();
		}

		return Player._instance;
	}

	public update(delta: number) {
		Object.values(this._resourceManagers).forEach((resourceManager: ResourceManager) => {
			resourceManager.update(delta);
		});
	}

	// MONEY
	get money() {
		return this._money;
	}

	public addFunds(toAdd: number) {
		this._money += toAdd;
	}

	public removeFunds(toRemove: number) {
		this._money -= toRemove;
	}

	public canAfford(price: number) {
		return this._money >= price;
	}

	// RESOURECE MANAGEMENT
	get resourceManagers() {
		return this._resourceManagers;
	}

	get resourcemanagersArr() {
		return Object.values(this._resourceManagers);
	}

	public addResourceManager(resourceManager: ResourceManager) {
		this._resourceManagers[resourceManager.resourceType] = resourceManager;
	}
	
	public getResourceManager(resourceType: ResourceType) {
		return this._resourceManagers[resourceType];
	}
}