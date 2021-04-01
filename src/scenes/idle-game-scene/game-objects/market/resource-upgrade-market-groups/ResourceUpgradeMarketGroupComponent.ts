import '../../../../../ui/LuuButton';
import LuuButton from '../../../../../ui/LuuButton';
import MarketManager from '../../../market-manager/MarketManager';
import Player from '../../../Player';
import ResourceManager from '../../../resources/resource-managers/ResourceManager';
import ResourceUpgrade from '../../../resources/upgrades/ResourceUpgrade';
import UpgradeType from '../../../upgrades/UpgradeType';
import MarketGroupComponent from "../MarketGroupComponent";

export class ResourceUpgradeMarketGroupComponent extends MarketGroupComponent {
	// private collectSpeedUpgradeBtn: LuuButton;
	private upgradeBtns: LuuButton[];
	private sellBtns: LuuButton[];
	private player: Player;

	public constructor(scene: Phaser.Scene, activeResourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, activeResourceManager, x, y, width, height);
		this.player = Player.getInstance();
		this.init();
	}

	public init() {
		if(this.activeResourceManager) {
			this.upgradeBtns?.forEach((btn: LuuButton) => {
				btn.destroy();
			});
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
			
			this.upgradeBtns = [];
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
		const upgradeBtn = this.scene.add.luuButton(this.x + padding, this.y + 50, buttonWidth, buttonHeight, currentUpgrade.name + ` $${currentUpgrade.cost}`)
		.setData('upgrade', currentUpgrade)
		.setEnabled(marketManager.canAfford(currentUpgrade.cost));

		upgradeBtn.addListener('pointerdown', this.makeUpgradeBtnHandler(upgradeBtn), this);

		this.upgradeBtns.push(upgradeBtn);
	}

	public preUpdate(delta: number) {
		this.sellBtns?.forEach((sellBtn: LuuButton) => {
			let sellAmount = sellBtn.getData('sellAmount') as number;
			sellBtn.setEnabled(this.activeResourceManager.quantity >= sellAmount)
		});
		this.updateUpgradeButtons();
	}

	private updateUpgradeButtons() {
		if(this.upgradeBtns?.length > 0) {
			this.upgradeBtns.forEach((btn: LuuButton) => {
				const player = this.player;
				const upgrade = btn.getData('upgrade') as ResourceUpgrade;
				if(upgrade) {
					// Need to keep track of if it's enabled
					btn.setEnabled(player.canAfford(upgrade.cost));
				}
			});
		}
	}

	private createSellClickCallback(sellAmount: number) {
		const marketGroupComponent = this;
		// const marketManager = this.scene.data.get('marketManager') as MarketManager;
		function onSellClick() {
			let truSellAmount = sellAmount;
			if(sellAmount == -1) {
				truSellAmount = marketGroupComponent.activeResourceManager.quantity;
			}
			if(marketGroupComponent.activeResourceManager.hasMinimumOf(truSellAmount)) {
				const fundsToAdd = marketGroupComponent.activeResourceManager.sellResource(truSellAmount);
				Player.getInstance().addFunds(fundsToAdd)
			}
		}

		return onSellClick.bind(this);
	}

	private makeUpgradeBtnHandler(btn: LuuButton) {
		function onClick() {
			this.onUpgradeBtnClick(btn);
		}

		return onClick.bind(this);
	}

	public onUpgradeBtnClick(upgradeBtn: LuuButton) {
		const upgrade = upgradeBtn.getData('upgrade') as ResourceUpgrade;

		if(this.player.canAfford(upgrade.cost)) {
			this.player.removeFunds(upgrade.cost);
			let resourceManager = this.activeResourceManager as ResourceManager;
			resourceManager.applyUpgrade(upgrade.type);

			let newUpgrade = resourceManager.getCurrentUpgrade(upgrade.type);
			upgradeBtn.setData('upgrade', newUpgrade);
			if(newUpgrade) {
				upgradeBtn.setText(newUpgrade.name + ` $${newUpgrade.cost}`);
			} else {
				upgradeBtn.setText('No more upgrades available');
				upgradeBtn.setEnabled(false);
			}
		}
	}

	public destroy() {
		super.destroy();

		this.upgradeBtns?.forEach((btn: LuuButton) => btn.destroy());
		this.sellBtns?.forEach((btn: LuuButton) => btn.destroy());
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