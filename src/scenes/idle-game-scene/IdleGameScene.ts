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
import Player from './Player';
import Refinery from './refiners/Refinery';
import RefineryItem from './refiners/RefineryItem';
import CoalManager from './resources/resource-managers/CoalManager';
import LogManager from './resources/resource-managers/LogManager';
import ResourceManager from './resources/resource-managers/ResourceManager';
import Resource, { ResourceType } from './resources/ResourceTypes';

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
	public openMarketBtn: LuuButton;
	// public marketComponent: MarketComponent;

	// This will all go into the actual refiner when I make it
	public refiner: Refinery;
	public refinedResourceCounts = {
		[ResourceType.PLANKS]: 0
	};

	public constructor() {
		super({key: 'IdleGame'});
	}

	public preload() {
		// Load any assets here
		this.load.image('purple_btn', 'assets/UI/purple_btn.png');
		this.load.image('purple_btn_active', 'assets/UI/purple_btn_active.png');

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
		this.player.addResourceManager(new LogManager());
		this.player.addResourceManager(new CoalManager());

		this.logCollectorComponent = this.add.resource(this.player.getResourceManager(ResourceType.LOG), 10, 10, 200);
		this.coalResource = this.add.resource(this.player.getResourceManager(ResourceType.COAL), this.logCollectorComponent.x + this.logCollectorComponent.width + 10, 10, 200);

		// Market Area
		this.marketManager = new MarketManager();
		this.openMarketBtn = this.add.luuButton(400, 200, 100, 30, 'Open Market')
		.on('pointerdown', () => this.add.luuIOverlayContainerLarge(this.add.market(this.marketManager, 0, 0, 0, 0)));
		// this.marketComponent = this.add.market(this.marketManager, (gameWidth / 2) + 10, 10, ((gameWidth / 2) - 20), gameHeight - 20);

		// HOME
		this.homeManager = new CampManager();
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

		this.refiner = new Refinery();

		const resourceType = ResourceType.LOG;
		this.add.luuButton(600, 50, 100, 50, 'Add Resource')
		.on('pointerdown', () => {
			this.addResourceToRefiner(ResourceType.LOG);
		});


		this.add.luuButton(710, 50, 150, 50, 'Take Refined Resource')
		.on('pointerdown', () => {
			const refinedResourceType = ResourceType.PLANKS;
			const deltaRefinedResource = this.refiner.takeRefinedResource(refinedResourceType, 5);

			if(deltaRefinedResource >= 0) {
				console.log('deltaRefinedResourceCount: ', deltaRefinedResource);
				this.refinedResourceCounts[refinedResourceType] += deltaRefinedResource;
				console.log(refinedResourceType + 'Count: ', this.refinedResourceCounts[refinedResourceType]);
			}
		});
	}

	private addResourceToRefiner(resourceType: ResourceType) {
		const takeAmount = 2;

		const resourceManager = this.player.getResourceManager(resourceType)
		if(resourceManager?.hasMinimumOf(takeAmount)) {
			if(this.refiner.addResource(resourceType, takeAmount)) {
				resourceManager?.removeResource(takeAmount);
				console.log('Added resources');
			} else {
				console.log("Refiner doesn't accept this resource type");
			}
			
		} else {
			console.log('Not enough resources');
		}
	}
	
	public update(time: number, delta: number) {
		this.checkLoss();

		if(!this.isLost) {
			this.player.update(delta);
			this.homeManager.update(delta);

			this.refiner.update(delta);
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