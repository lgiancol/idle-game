import '../../../../../ui/LuuButton';
import LuuButton from '../../../../../ui/LuuButton';
import Upgrade from "../../../upgrades/Upgrade";
import ResourceUpgradeManager from "../../../resources/upgrades/upgrade-managers/ResourceUpgradeManager";
import CollectSpeedUpgrade from "../../../resources/upgrades/CollectSpeedUpgrade";
import MarketGroupComponent from "../MarketGroupComponent";

export class ResourceUpgradeMarketGroupComponent extends MarketGroupComponent {
	private resourceLabel: Phaser.GameObjects.Text;
	private collectSpeedUpgrade: LuuButton;

	public constructor(scene: Phaser.Scene, public resourceUpgradeManager: ResourceUpgradeManager<any>, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, x, y, width, height);
		this.init();
	}

	public init() {
		if(this.resourceUpgradeManager) {
			this.setStrokeStyle(1, 0xffffff);
			
			this.resourceLabel = this.scene.add.text(this.x + 10, this.y + 10, `${this.resourceUpgradeManager?.resourceManager.resource.name}`)
			.setOrigin(0)
			.setColor('white')
			.setFontFamily('my-font')
			.setFontSize(30);
			
			// Will go through all the different types of upgrades and create them
			Object.keys(Upgrade.Type).forEach((upgradeType: string) => {
				this.initUpgradeButton(upgradeType);
			});

		}
		
	}

	private initUpgradeButton(upgradeType: string) {
		let currentUpgrade = this.resourceUpgradeManager.getCurrentUpgrade(Upgrade.Type[upgradeType]);

		const padding = 10;
		const buttonWidth = this.width - (padding * 2);
		const buttonHeight = 70;
		this.collectSpeedUpgrade = this.scene.add.luuButton(this.x + 10, this.y + 55, buttonWidth, buttonHeight, currentUpgrade.name + ` $${currentUpgrade.cost}`)
		.setData('upgrade', currentUpgrade)
		.addListener('pointerup', this.onCollectSpeedUpgradeClick.bind(this))
		.setEnabled(this.resourceUpgradeManager.canAffordUpgrade(currentUpgrade));
	}

	public setActiveUpgradeManager(resourceUpgradeManager: ResourceUpgradeManager<any>) {
		this.resourceUpgradeManager = resourceUpgradeManager;

		this.resourceLabel?.destroy();
		this.collectSpeedUpgrade?.destroy();

		this.init();
	}

	public preUpdate(delta: number) {
		this.updateUpgradeButtons();
	}

	private updateUpgradeButtons() {
		if(this.collectSpeedUpgrade) {
			const upgrade = this.collectSpeedUpgrade.getData('upgrade');
			if(upgrade) {
				// Need to keep track of if it's enabled
				this.collectSpeedUpgrade.setEnabled(this.resourceUpgradeManager.canAffordUpgrade(upgrade))
			}
		}
	}

	public onCollectSpeedUpgradeClick() {
		const upgrade = this.collectSpeedUpgrade.getData('upgrade') as CollectSpeedUpgrade;
		if(this.resourceUpgradeManager.canAffordUpgrade(upgrade)) {
			this.buyUpgrade(upgrade);

			let newUpgrade = this.resourceUpgradeManager.getCurrentUpgrade(Upgrade.Type.COLLECT_SPEED) as CollectSpeedUpgrade;
			this.collectSpeedUpgrade.setData('upgrade', newUpgrade);
			if(newUpgrade) {
				this.collectSpeedUpgrade.setText(newUpgrade.name + ` $${newUpgrade.cost}`);
			} else {
				this.collectSpeedUpgrade.setText('No more upgrades available');
				this.collectSpeedUpgrade.setEnabled(false);
			}
		} else {
			console.log('Cannot buy; Not enough funds');
			
		}
	}

	public buyUpgrade(toBuy: Upgrade) {
		this.resourceUpgradeManager.buyUpgrade(toBuy.type, toBuy.level);
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceUpgrade',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceUpgradeManager: ResourceUpgradeManager<any>, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceUpgrade = new ResourceUpgradeMarketGroupComponent(this.scene, resourceUpgradeManager, x, y, width, height);
		resourceUpgrade.setOrigin(0);
		
		this.displayList.add(resourceUpgrade);
		this.updateList.add(resourceUpgrade);

		return resourceUpgrade;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			resourceUpgrade(resourceUpgradeManager: ResourceUpgradeManager<any>, x: number, y: number, width?: number, height?: number): ResourceUpgradeMarketGroupComponent
		}
	}
}