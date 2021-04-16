// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameHeight, getGameWidth } from '../../helpers';
import '../../ui';
import LuuButton from '../../ui/LuuButton';
import './game-objects';
import HomeComponent from './game-objects/HomeComponent';
import RefineryComponent from './game-objects/refinery/RefineryComponent';
import ResourceComponent from './game-objects/resource/ResourceComponent';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import MarketManager from './market-manager/MarketManager';
import Player from './Player';
import Refinery from './refiners/Refinery';
import Resource from './resources/Resource';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from './resources/resource-managers/LogManager';
import PlankManager from './resources/resource-managers/PlankManager';
import ResourceManager from './resources/resource-managers/ResourceManager';
// import Resource, { ResourceType } from './resources/ResourceTypes';

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
	public coalCollectorComponent: ResourceComponent;

	public plankManager: ResourceManager;
	public plankCollectorComponent: ResourceComponent;

	public marketManager: MarketManager;
	public openMarketBtn: LuuButton;

	// This will all go into the actual refiner when I make it
	public refineries: Refinery[] = [];
	public refineryComponents: RefineryComponent[] = [];

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
		this.load.image('purple_btn', 'assets/UI/purple_btn.png');
		this.load.image('purple_btn_active', 'assets/UI/purple_btn_active.png');

		// Resources
		this.load.image(Resource.LOG.type, 'assets/sprites/log.png');
		this.load.image(Resource.COAL.type, 'assets/sprites/coal.png');
		this.load.image(Resource.PLANK.type, 'assets/sprites/plank.png');

		this.load.image('overlay_bg', 'assets/UI/overlay_background.png');
	}

	public create() {
		this.resetGame();
	}

	private resetGame() {
		this.isLost = false;
		
		// this.marketComponent?.destroy();
		this.openMarketBtn?.destroy();
		this.homeComponent?.destroy();
		this.logCollectorComponent?.destroy();
		this.coalCollectorComponent?.destroy();
		this.plankCollectorComponent?.destroy();
		this.refineryComponents?.forEach((refineryComponent: RefineryComponent) => refineryComponent.destroy());

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
		this.player.addResourceManager(new LogManager());
		this.player.addResourceManager(new CoalManager());
		this.player.addResourceManager(new PlankManager());

		this.logCollectorComponent = this.add.resource(this.player.getResourceManager(Resource.LOG), 10, 10, 200);
		this.coalCollectorComponent = this.add.resource(this.player.getResourceManager(Resource.COAL), 10, this.logCollectorComponent.getBounds().bottom + 10, 200);
		this.plankCollectorComponent = this.add.resource(this.player.getResourceManager(Resource.PLANK), 10, this.coalCollectorComponent.getBounds().bottom + 10, 200);

		// Market Area
		this.marketManager = new MarketManager();
		this.openMarketBtn = this.add.luuButton((gameWidth / 2) - (100 / 2), 30, 100, 30, 'Open Market')
		.on('pointerdown', () => this.add.luuIOverlayContainerLarge(this.add.market(this.marketManager, 0, 0, 0, 0)));
		// this.marketComponent = this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// HOME
		this.homeManager = new CampManager();
		this.homeComponent = this.add.home(this.homeManager, (gameWidth / 2) - 225 / 2, (gameHeight / 2) - 150 / 2, 225, 150);

		// TEMP
		this.lostText = this.add.text(gameWidth / 2, gameHeight / 2, 'YOU LOSE!!')
		.setOrigin(0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(100)
		.setVisible(false);

		this.resetBtn = this.add.luuButton(gameWidth / 2, this.lostText.y + (this.lostText.height / 2) + 20, 200, 50, 'Reset')
		.setOrigin(0.5)
		.setVisible(false)
		.on('pointerdown', this.resetGame.bind(this));

		let refinery = new Refinery(Resource.LOG, Resource.PLANK);
		console.log('Log --> Plank: ', refinery.timeToRefine);
		this.refineries.push(refinery);
		this.refineryComponents.push(this.add.refinery(refinery, gameWidth - 10 - 300, 10, 300, 400));

		refinery = new Refinery(Resource.PLANK, Resource.LOG);
		console.log('Plank --> Log: ', refinery.timeToRefine);
		this.refineries.push(refinery);
		this.refineryComponents.push(this.add.refinery(refinery, gameWidth - 10 - 300, this.refineryComponents[this.refineryComponents.length - 1].getBounds().bottom + 10, 300, 400));

		this.add.sprite(400, 100, Resource.LOG.type);
		this.add.sprite(400, 174, Resource.COAL.type);
		this.add.sprite(400, 258, Resource.PLANK.type);
	}
	
	public update(time: number, delta: number) {
		this.checkLoss();

		if(!this.isLost) {
			this.player.update(delta);
			this.homeManager.update(delta);

			this.refineries.forEach((refinery: Refinery) => refinery.update(delta));
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