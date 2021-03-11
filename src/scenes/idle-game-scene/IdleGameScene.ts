// These are imported this way so we can get the type descriptors loaded for each game-object
import './game-objects/ResourceCollector';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import LogManager from "./resource-managers/LogManager";

export class IdleGameScene extends Phaser.Scene {
	// All the resources available to the user
	public logResourceManager = new LogManager();

	// All the homes available to the user
	public homeManager: HomeManager;
	public tempHomeFuel: Phaser.GameObjects.Text;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		// TODO: Move this to a proper location when ready
		this.homeManager = new CampManager();
		this.homeManager.addFuel({startingAmount: 10, useSpeed: 1, remainingAmount: 10});
		this.homeManager.addFuel({startingAmount: 10, useSpeed: 1, remainingAmount: 10});
		this.tempHomeFuel = this.add.text(200, 200, `${this.homeManager.totalRemaingFuel}`);

		// Create all the game objects here
		this.add.resourceCollector(this.logResourceManager, 10, 10);
	}
	
	public update(time: number, delta: number) {
		this.logResourceManager.update(delta);
		this.homeManager.update(delta);

		this.tempHomeFuel.setText(`${this.homeManager.totalRemaingFuel}`);
	}
}