import '../../../../../ui/LuuButton';
import LuuButton from '../../../../../ui/LuuButton';
import Player from '../../../Player';
import ResourceManager from '../../../resources/resource-managers/ResourceManager';
import ResourceUpgrade from '../../../resources/upgrades/ResourceUpgrade';
import { UpgradeType } from '../../../upgrades/UpgradeType';
import MarketGroupComponent from "../MarketGroupComponent";

export class ResourceUpgradeMarketGroupComponent extends MarketGroupComponent {
	private sellBtnsGroup: Phaser.GameObjects.Group;
	private upgradeBtnsGroup: Phaser.GameObjects.Group;
	private upgradeBtns: LuuButton[];
	private sellBtns: LuuButton[];
	private player: Player;

	public constructor(scene: Phaser.Scene, activeResourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, activeResourceManager, x, y, width, height);
		this.player = Player.getInstance();
	}

	public init() {
		this.destroyInterior();

		if(this.activeResourceManager) {
			this.initSellButtons();
			this.sellBtnsGroup = this.scene.add.group(this.sellBtns, { runChildUpdate: true });
			
			this.initUpgradeButtons();
			this.upgradeBtnsGroup = this.scene.add.group(this.upgradeBtns, { runChildUpdate: true });
		}
	}

	public setVisible(value: boolean) {
		this.visible = value;
		this.sellBtns?.forEach((btn: LuuButton) => btn.setVisible(value));
		this.upgradeBtns?.forEach((btn: LuuButton) => btn.setVisible(value));

		return this;
	}

	public setActive(value: boolean) {
		this.sellBtnsGroup?.setActive(value);
		this.upgradeBtnsGroup?.setActive(value);

		return this;
	}

	private initSellButtons() {
		this.sellBtns = [];
		const padding = 10;
		const sellBtnCount = 4;
		const sellBtnWidth = (this.width / sellBtnCount) - (((sellBtnCount + 1) * padding) / sellBtnCount);
		const y = this.y;

		for(let i = 0; i < sellBtnCount; i++) {
			let sellAmount = Math.pow(10, i);
			let sellAmountLabel = ''+ sellAmount;

			if(i == sellBtnCount - 1) {
				sellAmount = -1;
				sellAmountLabel = 'All';
			}

			const x = this.x + (sellBtnWidth * i) + (padding * i);
			const sellBtn = this.scene.add.luuButton(x + padding, y, sellBtnWidth, 30, `Sell ${sellAmountLabel}`)
			.setData('sellAmount', sellAmount)
			.setActive(this.active)
			.setEnabled(this.player.getResourceManager(this.activeResourceManager.resourceType).hasMinimumOf(sellAmount))
			.setVisible(this.visible);

			sellBtn.on('pointerdown', this.createSellClickCallback(sellAmount));
			this.sellBtns.push(sellBtn);
		}
	}

	private initUpgradeButtons() {
		this.upgradeBtns = [];
		const padding = 10;
		const buttonWidth = this.width - (padding * 2);
		const buttonHeight = 70;

		// Will go through all the different types of upgrades and create them
		Object.values(this.activeResourceManager.upgradeTypes).forEach((upgradeType: string) => {
			console.log(upgradeType);
			let currentUpgrade = this.activeResourceManager.getCurrentUpgrade(upgradeType);
			if(currentUpgrade != null) {
				const upgradeBtn = this.scene.add.luuButton(this.x + padding, this.y + 50, buttonWidth, buttonHeight, currentUpgrade.name + ` $${currentUpgrade.cost}`)
				.setData('upgrade', currentUpgrade)
				.setActive(this.active)
				.setEnabled(this.player.canAfford(currentUpgrade.cost))
				.setVisible(this.visible);
				
				upgradeBtn.addListener('pointerdown', this.makeUpgradeBtnHandler(upgradeBtn), this);
				this.upgradeBtns.push(upgradeBtn);
			}
		});
	}

	public preUpdate(delta: number, time: number) {
		this.sellBtns?.forEach((sellBtn: LuuButton) => {
			let sellAmount = sellBtn.getData('sellAmount') as number;
			sellBtn.setEnabled(this.player.getResourceManager(this.activeResourceManager.resourceType).quantity >= sellAmount)
		});

		this.updateUpgradeButtons();

		return this;
	}

	private updateUpgradeButtons() {
		if(this.upgradeBtns?.length > 0) {
			this.upgradeBtns.forEach((btn: LuuButton) => {
				const upgrade = btn.getData('upgrade') as ResourceUpgrade;
				if(upgrade) {
					// Need to keep track of if it's enabled
					btn.setEnabled(this.player.canAfford(upgrade.cost));
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

	private destroyInterior() {
		this.sellBtnsGroup?.destroy(true, true);
		delete this.sellBtnsGroup;
		delete this.sellBtns;
		this.upgradeBtnsGroup?.destroy(true, true);
		delete this.upgradeBtnsGroup;
		delete this.upgradeBtns;
	}

	public destroy() {
		this.destroyInterior();
		
		super.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceUpgradeMarketGroup',
	function(this: Phaser.GameObjects.GameObjectFactory, resourceManager: ResourceManager, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceUpgradeMarketGroupComponent = new ResourceUpgradeMarketGroupComponent(this.scene, resourceManager, x, y, width, height);
		resourceUpgradeMarketGroupComponent.addToUpdateList();

		return resourceUpgradeMarketGroupComponent;
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