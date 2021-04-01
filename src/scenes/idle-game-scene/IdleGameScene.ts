// These are imported this way so we can get the type descriptors loaded for each game-object
import { getGameHeight, getGameWidth } from '../../helpers';
import '../../ui';
import LuuButton from '../../ui/LuuButton';
import './game-objects';
import HomeComponent from './game-objects/HomeComponent';
import MarketComponent from './game-objects/market/MarketComponent';
import ResourceComponent from './game-objects/resource/ResourceComponent';
import CampManager from './home-managers/CampManager';
import HomeManager from './home-managers/HomeManager';
import MarketManager from './market-manager/MarketManager';
import { ResourceType } from './resources/Resource';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from "./resources/resource-managers/LogManager";
import ResourceManager from './resources/resource-managers/ResourceManager';

export class IdleGameScene extends Phaser.Scene {
	// Game state
	public isLost = false; // TODO: Turn this into some sort of GameState manager or something
	public lostText: Phaser.GameObjects.Text;
	public resetBtn: LuuButton;

	// The home available to the user
	public homeManager: HomeManager;
	public homeComponent: HomeComponent;
	
	// All the resources available to the user
	public logManager: ResourceManager;
	public logResource: ResourceComponent;

	public coalManager: ResourceManager;
	public coalResource: ResourceComponent;

	public marketManager: MarketManager;
	public marketComponent: MarketComponent;

	// TEMP map things
	private startMapDragX: number = null;

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
		this.load.image('map', 'assets/temp.png');
	}

	public create() {
		let cam = this.cameras.main;
		var map = this.add.image(0, 0, 'map').setOrigin(0, 0).setScale(40);

		// cam.setZoom(2);
		cam.setBounds(0, 0, map.displayWidth, map.displayHeight);
		this.input.on('pointermove', (p) => {
			if (!p.isDown) return;

			// const start = new Phaser.Math.Vector2(cam.x, cam.y).normalize();
			// const end = new Phaser.Math.Vector2(p.x, p.y);
			// const lerpedDir = start.lerp(end, 0.002);

			let speedX = 0.8;
			let speedY = 0.8;
			
			cam.scrollX -= ((p.x - p.prevPosition.x) * speedX) / cam.zoom;
			cam.scrollY -= ((p.y - p.prevPosition.y) * speedY) / cam.zoom;
		  });

		this.resetGame();
	}

	private resetGame() {
		this.isLost = false;
		
		this.marketComponent?.destroy();
		this.homeComponent?.destroy();
		this.logResource?.destroy();
		this.coalResource?.destroy();

		// TEMP
		this.lostText?.destroy();
		this.resetBtn?.destroy();

		this.initalize();
	}

	private initalize() {
		const gameWidth = getGameWidth(this);
		const gameHeight = getGameHeight(this);

		// RESOURCES
		this.logManager = new LogManager();
		this.logResource = this.add.resource(this.logManager, 10, 10, 200);
		this.coalManager = new CoalManager();
		this.coalResource = this.add.resource(this.coalManager, this.logResource.x + this.logResource.width + 10, 10, 200);

		// Market Area
		this.marketManager = new MarketManager();
		this.data.set('marketManager', this.marketManager as MarketManager);
		this.marketComponent = this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// Set all the upgrade managers this market can handle
		this.marketManager.addResourceManager(ResourceType.LOG, this.logManager);
		this.marketManager.addResourceManager(ResourceType.COAL, this.coalManager);
		
		// HOME
		this.homeManager = new CampManager(this.logManager);
		this.homeComponent = this.add.home(this.homeManager, 200, 200, 225, 150);

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
	}
	
	public update(time: number, delta: number) {
		if(!this.isLost) {
			this.checkLoss();
			this.logManager.update(delta);
			this.coalManager.update(delta);
			this.homeManager.update(delta);
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