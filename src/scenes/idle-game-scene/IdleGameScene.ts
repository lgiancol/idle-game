// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameHeight, getGameWidth } from '../../helpers';
import '../../ui';
import LuuButton from '../../ui/LuuButton';
import './game-objects';
import HomeComponent from './game-objects/HomeComponent';
import MarketComponent from './game-objects/market/MarketComponent';
import ResourceComponent from './game-objects/resource/ResourceComponent';
import HomeManager from './home-managers/HomeManager';
import MarketManager from './market-manager/MarketManager';
import Player from './Player';
import { ResourceType } from './resources/Resource';
import ResourceManager from './resources/resource-managers/ResourceManager';
import CoalUpgradeManager from './resources/upgrades/upgrade-managers/CoalUpgradeManager';
import LogUpgradeManager from './resources/upgrades/upgrade-managers/LogUpgradeManager';

export class IdleGameScene extends Phaser.Scene {
	private player: Player;

	// Game state
	public isLost = false; // TODO: Turn this into some sort of GameState manager or something
	public lostText: Phaser.GameObjects.Text;
	public resetBtn: LuuButton;

	// The home available to the user
	public homeManager: HomeManager;
	public homeComponent: HomeComponent;
	
	// All the resources available to the user
	public logManager: ResourceManager;
	public logCollectorComponent: ResourceComponent;

	public coalManager: ResourceManager;
	public coalResource: ResourceComponent;

	public marketManager: MarketManager;
	public marketComponent: MarketComponent;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
	}

	public create() {
		this.resetGame();
	}

	private resetGame() {
		this.isLost = false;
		
		this.marketComponent?.destroy();
		this.homeComponent?.destroy();
		this.logCollectorComponent?.destroy();
		this.coalResource?.destroy();

		// TEMP
		this.lostText?.destroy();
		this.resetBtn?.destroy();

		this.initalize();
	}

	private initalize() {
		this.player = Player.getInstance();
		
		const gameWidth = getGameWidth(this);
		const gameHeight = getGameHeight(this);
		
		// RESOURCES
		this.player.addResourceManager(new ResourceManager(ResourceType.LOG, new LogUpgradeManager()));
		// this.player.addResourceManager(new ResourceManager(ResourceType.COAL, new CoalUpgradeManager()));
		// this.coalManager = new CoalManager();

		this.logCollectorComponent = this.add.resource(this.player.getResourceManager(ResourceType.LOG), 10, 10, 200);
		// this.coalResource = this.add.resource(this.player.getResourceManager(ResourceType.COAL), this.logResource.x + this.logResource.width + 10, 10, 200);

		// Market Area
		this.marketManager = new MarketManager();
		// this.data.set('marketManager', this.marketManager as MarketManager);
		this.marketComponent = this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// Set all the upgrade managers this market can handle
		// this.marketManager.addResourceManager(ResourceType.LOG, this.player.getResourceManager(ResourceType.LOG));
		// this.marketManager.addResourceManager(ResourceType.COAL, this.coalManager);
		
		// HOME
		// this.homeManager = new CampManager(this.logManager);
		// this.homeComponent = this.add.home(this.homeManager, 200, 200, 225, 150);

		// TEMP
		// this.lostText = this.add.text(gameWidth / 2, gameHeight / 2, 'YOU LOSE!!')
		// .setOrigin(0.5)
		// .setColor('white')
		// .setFontFamily('my-font')
		// .setFontSize(100)
		// .setVisible(false);

		// this.resetBtn = this.add.luuButton(gameWidth / 2, this.lostText.y + (this.lostText.height / 2) + 20, 200, 50, 'Reset')
		// .setOrigin(0.5)
		// .setVisible(false)
		// .on('pointerdown', this.resetGame.bind(this));
	}
	
	public update(time: number, delta: number) {
		// this.checkLoss();

		if(!this.isLost) {
			this.player.update(delta);
		// 	this.homeManager.update(delta);
		}
	}

	private checkLoss() {
		this.isLost = this.homeManager.isFrozen;

		if(this.isLost) {
			this.lostText.setVisible(true);
			this.resetBtn.setVisible(true);
		}
	}
}