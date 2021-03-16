import '../../../../../ui/LuuButton';
import LuuButton from '../../../../../ui/LuuButton';
import MarketManager from '../../../market-manager/MarketManager';
import ResourceManager from '../../../resources/resource-managers/ResourceManager';
import CollectSpeedUpgrade from "../../../resources/upgrades/CollectSpeedUpgrade";
import Upgrade from '../../../upgrades/Upgrade';
import UpgradeType from '../../../upgrades/UpgradeType';
import MarketGroupComponent from "../MarketGroupComponent";

export class ResourceUpgradeMarketGroupComponent extends MarketGroupComponent {
	private collectSpeedUpgrade: LuuButton;
	private sellBtns: LuuButton[];

	public constructor(scene: Phaser.Scene, activeResourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, activeResourceManager, x, y, width, height);
		this.init();
	}

	public init() {
		if(this.activeResourceManager) {
			this.collectSpeedUpgrade?.destroy();
			this.sellBtns?.forEach((btn: LuuButton) => {
				btn.destroy();
			});

			const padding = 10;
			const sellBtnCount = 4;
			const sellBtnWidth = (this.width / sellBtnCount) - (((sellBtnCount + 1) * padding) / sellBtnCount);
			this.sellBtns = [];
			for(let i = 0; i < sellBtnCount; i++) {
				let sellAmount = Math.pow(10, i);
				let sellAmountLabel = ''+ sellAmount;

				if(i == sellBtnCount - 1) {
					sellAmount = -1;
					sellAmountLabel = 'All';
				}

				const x = this.x + (sellBtnWidth * i) + (10 * i);
				const btn = this.scene.add.luuButton(x + 10, this.y + 10, sellBtnWidth, 30, `Sell ${sellAmountLabel}`)
				.setData('sellAmount', sellAmount);

				btn.on('pointerdown', this.createSellClickCallback(sellAmount));
				this.sellBtns.push(btn);
			}
			
			// Will go through all the different types of upgrades and create them
			Object.keys(UpgradeType).forEach((upgradeType: string) => {
				this.initUpgradeButton(upgradeType);
			});
		}
	}

	private initUpgradeButton(upgradeType: string) {
		let currentUpgrade = this.activeResourceManager.getCurrentUpgrade(UpgradeType[upgradeType]);
		let marketManager = this.scene.data.get('marketManager') as MarketManager;

		const padding = 10;
		const buttonWidth = this.width - (padding * 2);
		const buttonHeight = 70;
		this.collectSpeedUpgrade = this.scene.add.luuButton(this.x + padding, this.y + 50, buttonWidth, buttonHeight, currentUpgrade.name + ` $${currentUpgrade.cost}`)
		.setData('upgrade', currentUpgrade)
		.addListener('pointerdown', this.onCollectSpeedUpgradeClick.bind(this))
		.setEnabled(marketManager.canAfford(currentUpgrade.cost));
	}

	public preUpdate(delta: number) {
		this.sellBtns?.forEach((sellBtn: LuuButton) => {
			let sellAmount = sellBtn.getData('sellAmount') as number;
			sellBtn.setEnabled(this.activeResourceManager.quantity >= sellAmount)
		});
		this.updateUpgradeButtons();
	}

	private updateUpgradeButtons() {
		if(this.collectSpeedUpgrade) {
			let marketManager = this.scene.data.get('marketManager') as MarketManager;
			const upgrade = this.collectSpeedUpgrade.getData('upgrade') as Upgrade;
			if(upgrade) {
				// Need to keep track of if it's enabled
				this.collectSpeedUpgrade.setEnabled(marketManager.canAfford(upgrade.cost))
			}
		}
	}

	private createSellClickCallback(sellAmount: number) {
		const marketGroupComponent = this;
		const marketManager = this.scene.data.get('marketManager') as MarketManager;
		function onSellClick() {
			let truSellAmount = sellAmount;
			if(sellAmount == -1) {
				truSellAmount = marketGroupComponent.activeResourceManager.quantity;
			}
			if(marketGroupComponent.activeResourceManager.hasMinimumOf(truSellAmount)) {
				const fundsToAdd = marketGroupComponent.activeResourceManager.sellResource(truSellAmount);
				marketManager.addFunds(fundsToAdd)
			}
		}

		return onSellClick.bind(this);
	}

	public onCollectSpeedUpgradeClick() {
		let marketManager = this.scene.data.get('marketManager') as MarketManager;
		
		const upgrade = this.collectSpeedUpgrade.getData('upgrade') as CollectSpeedUpgrade;
		if(marketManager && marketManager.canAfford(upgrade.cost)) {
			marketManager.removeFunds(upgrade.cost);
			let resourceManager = this.activeResourceManager as ResourceManager;
			resourceManager.applyUpgrade(upgrade.type);

			let newUpgrade = resourceManager.getCurrentUpgrade(UpgradeType.COLLECT_SPEED) as CollectSpeedUpgrade;
			this.collectSpeedUpgrade.setData('upgrade', newUpgrade);
			if(newUpgrade) {
				this.collectSpeedUpgrade.setText(newUpgrade.name + ` $${newUpgrade.cost}`);
			} else {
				this.collectSpeedUpgrade.setText('No more upgrades available');
				this.collectSpeedUpgrade.setEnabled(false);
			}
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