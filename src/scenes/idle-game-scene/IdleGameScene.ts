// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameWidth } from '../../helpers';
import '../../ui/LuuButton';
import './game-objects/Home';
import './game-objects/resource-upgrades/ResourceUpgradeGameObject';
import './game-objects/ResourceCollector';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import Coal from './resources/Coal';
import Log from './resources/Log';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from "./resources/resource-managers/LogManager";
import LogUpgradeManager from './upgrades/upgrade-managers/LogUpgradeManager';

export class IdleGameScene extends Phaser.Scene {
	// All the resources available to the user
	public logManager = new LogManager();
	public coalManager = new CoalManager();

	// All the upgrades available to the user
	public logUpgradeManager: LogUpgradeManager;

	// The home available to the user
	public homeManager: HomeManager;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		this.logUpgradeManager = new LogUpgradeManager(this.logManager);
		this.homeManager = new CampManager(this.logManager);

		// Create all the game objects here
		this.add.home(this.homeManager, 200, 200);

		this.add.resourceCollector<Log>(this.logManager, 10, 10);
		this.add.resourceCollector<Coal>(this.coalManager, 200, 10);

		// Resource Upgrade Area
		const gameWidth = getGameWidth(this);
		const upgradeAreaPadding = 10;
		const upgradeAreaWidth = (gameWidth / 2) - (upgradeAreaPadding * 2);
		this.add.resourceUpgrade<Log, LogUpgradeManager>(this.logUpgradeManager, gameWidth / 2 + upgradeAreaPadding, 10, upgradeAreaWidth, 400);
	}
	
	public update(time: number, delta: number) {
		this.logManager.update(delta);
		this.homeManager.update(delta);
	}
}