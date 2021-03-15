import '../../../../../ui/LuuButton';
import LuuButton from '../../../../../ui/LuuButton';
import ResourceManager from '../../../resources/resource-managers/ResourceManager';
import CollectSpeedUpgrade from "../../../resources/upgrades/CollectSpeedUpgrade";
import ResourceUpgradeManager from "../../../resources/upgrades/upgrade-managers/ResourceUpgradeManager";
import Upgrade from '../../../upgrades/Upgrade';
import UpgradeType from '../../../upgrades/UpgradeType';
import MarketGroupComponent from "../MarketGroupComponent";

export class ResourceUpgradeMarketGroupComponent extends MarketGroupComponent {
	private resourceLabel: Phaser.GameObjects.Text;
	private collectSpeedUpgrade: LuuButton;

	public constructor(scene: Phaser.Scene, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, resourceManager, x, y, width, height);
		this.init();
	}

	public init() {
		if(this.activeResourceManager) {
			this.resourceLabel?.destroy();
			this.collectSpeedUpgrade?.destroy();

			let resourceManager = this.activeResourceManager as ResourceManager;
			this.setStrokeStyle(1, 0xffffff);
			
			this.resourceLabel = this.scene.add.text(this.x + 10, this.y + 10, `${resourceManager.resource.name}`)
			.setOrigin(0)
			.setColor('white')
			.setFontFamily('my-font')
			.setFontSize(30);
			
			// Will go through all the different types of upgrades and create them
			Object.keys(UpgradeType).forEach((upgradeType: string) => {
				this.initUpgradeButton(resourceManager, upgradeType);
			});

		}
		
	}

	private initUpgradeButton(resourceManager: ResourceManager, upgradeType: string) {
		let currentUpgrade = resourceManager.getCurrentUpgrade(UpgradeType[upgradeType]);

		const padding = 10;
		const buttonWidth = this.width - (padding * 2);
		const buttonHeight = 70;
		this.collectSpeedUpgrade = this.scene.add.luuButton(this.x + 10, this.y + 55, buttonWidth, buttonHeight, currentUpgrade.name + ` $${currentUpgrade.cost}`)
		.setData('upgrade', currentUpgrade)
		.addListener('pointerup', this.onCollectSpeedUpgradeClick.bind(this))
		.setEnabled(resourceManager.hasMinimumOf(currentUpgrade.cost)); // TODO: This needs to change to money
	}

	public preUpdate(delta: number) {
		this.updateUpgradeButtons();
	}

	private updateUpgradeButtons() {
		if(this.collectSpeedUpgrade) {
			let resourceUpgradeManager = this.activeResourceManager as ResourceManager;
			const upgrade = this.collectSpeedUpgrade.getData('upgrade') as Upgrade;
			if(upgrade) {
				// Need to keep track of if it's enabled
				this.collectSpeedUpgrade.setEnabled(resourceUpgradeManager.hasMinimumOf(upgrade.cost))
			}
		}
	}

	public onCollectSpeedUpgradeClick() {
		let resourceManager = this.activeResourceManager as ResourceManager;
		const upgrade = this.collectSpeedUpgrade.getData('upgrade') as CollectSpeedUpgrade;
		if(resourceManager && resourceManager.hasMinimumOf(upgrade.cost)) {
			resourceManager.buyUpgrade(upgrade.type);

			let newUpgrade = resourceManager.getCurrentUpgrade(UpgradeType.COLLECT_SPEED) as CollectSpeedUpgrade;
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
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceUpgradeMarketGroup',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceUpgrade = new ResourceUpgradeMarketGroupComponent(this.scene, resourceManager, x, y, width, height);
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
			resourceUpgradeMarketGroup(resourceManager: ResourceManager, x: number, y: number, width?: number, height?: number): ResourceUpgradeMarketGroupComponent
		}
	}
}