// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameHeight, getGameWidth } from '../../helpers';
import '../../ui/LuuButton';
import LinkedList from '../../utils/linked-list/LinkedList';
import ListNode from '../../utils/linked-list/ListNode';
import Queue from '../../utils/queue/Queue';
import './game-objects';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import MarketManager from './market-manager/MarketManager';
import Log from './resources/Log';
import { ResourceType } from './resources/Resource';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from "./resources/resource-managers/LogManager";
import CoalUpgradeManager from './resources/upgrades/upgrade-managers/CoalUpgradeManager';
import LogUpgradeManager from './resources/upgrades/upgrade-managers/LogUpgradeManager';

export class IdleGameScene extends Phaser.Scene {
	// The home available to the user
	public homeManager: HomeManager;
	
	// All the resources available to the user
	// public logManager = new LogManager();
	// public coalManager = new CoalManager();
	
	public marketManager: MarketManager;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		// Testing
		let logManager = new LogManager();
		

		// Done testing
		// const gameWidth = getGameWidth(this);
		// const gameHeight = getGameHeight(this);

		// // TODO: Create a custom GameObject to display this
		// // TODO: All this should also be inside the MarketManager class and will be create on new MarketManager();
		// // Market Area
		// this.marketManager = new MarketManager();
		// this.data.set('marketManager', this.marketManager as MarketManager);
		// this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// // Set all the upgrade managers this market can handle
		// this.marketManager.setUpgradeManager(ResourceType.LOG, new LogUpgradeManager(this.logManager));
		// this.marketManager.setUpgradeManager(ResourceType.COAL, new CoalUpgradeManager(this.coalManager));

		// // HOME
		// this.homeManager = new CampManager(this.logManager);
		
		// this.add.home(this.homeManager, 200, 200);

		// this.add.logResourceCollector(this.logManager, 10, 10);
		// this.add.coalResourceCollector(this.coalManager, 200, 10);
	}
	
	public update(time: number, delta: number) {
		// this.logManager.update(delta);
		// this.coalManager.update(delta);
		// this.homeManager.update(delta);
	}
}