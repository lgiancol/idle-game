// These are imported this way so we can get the type descriptors loaded for each game-object
import './game-objects/ResourceCollector';
import LogManager from "./resource-managers/LogManager";

export class IdleGameScene extends Phaser.Scene {
	// All the resources available to the user
	public logResourceManager = new LogManager();

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {		
		// Create all the game objects here
		this.add.resourceCollector(this.logResourceManager, 10, 10);
	}
	
	public update(time: number, delta: number) {
		this.logResourceManager.update(delta);
	}
}