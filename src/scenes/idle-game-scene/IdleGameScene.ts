// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameHeight, getGameWidth } from '../../helpers';
import '../../ui';
import './game-objects';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import MarketManager from './market-manager/MarketManager';
import { ResourceType } from './resources/Resource';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from "./resources/resource-managers/LogManager";

export class IdleGameScene extends Phaser.Scene {
	// Game state
	public isLost = false; // TODO: Turn this into some sort of GameState manager or something
	public lostText: Phaser.GameObjects.Text;

	// The home available to the user
	public homeManager: HomeManager;
	
	// All the resources available to the user
	public logManager = new LogManager();
	public coalManager = new CoalManager();
	
	public marketManager: MarketManager;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		const gameWidth = getGameWidth(this);
		const gameHeight = getGameHeight(this);

		// Market Area
		this.marketManager = new MarketManager();
		this.data.set('marketManager', this.marketManager as MarketManager);
		this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// Set all the upgrade managers this market can handle
		this.marketManager.addResourceManager(ResourceType.LOG, this.logManager);
		this.marketManager.addResourceManager(ResourceType.COAL, this.coalManager);

		// HOME
		this.homeManager = new CampManager(this.logManager);
		
		this.add.home(this.homeManager, 200, 200, 225, 150);

		const resource = this.add.resource(this.logManager, 10, 10, 200);
		
		this.add.resource(this.coalManager, resource.x + resource.width + 10, 10, 200);

		// TEMP
		this.lostText = this.add.text(gameWidth / 2, gameHeight / 2, 'YOU LOSE!!')
		.setOrigin(0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(100)
		.setVisible(false);
	}
	
	public update(time: number, delta: number) {
		this.checkLoss();
		
		if(!this.isLost) {
			this.logManager.update(delta);
			this.coalManager.update(delta);
			this.homeManager.update(delta);
		} else {
			this.lostText.setVisible(true);
		}
	}

	private checkLoss() {
		this.isLost = this.homeManager.isFrozen;
	}
}