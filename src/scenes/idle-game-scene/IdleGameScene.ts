// These are imported this way so we can get the type descriptors loaded for each game-object
import './game-objects/Home';
import './game-objects/ResourceCollector';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import Coal from './resources/Coal';
import Log from './resources/Log';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from "./resources/resource-managers/LogManager";

export class IdleGameScene extends Phaser.Scene {
	// All the resources available to the user
	public logManager = new LogManager();
	public coalManager = new CoalManager();

	// All the homes available to the user
	public homeManager: HomeManager;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		// TODO: Move this to a proper location when ready
		this.homeManager = new CampManager(this.logManager);
		this.add.home(this.homeManager, 200, 200);

		// Create all the game objects here
		this.add.resourceCollector<Log>(this.logManager, 10, 10);
		this.add.resourceCollector<Coal>(this.coalManager, 200, 10);
	}
	
	public update(time: number, delta: number) {
		this.logManager.update(delta);
		this.homeManager.update(delta);
	}
}