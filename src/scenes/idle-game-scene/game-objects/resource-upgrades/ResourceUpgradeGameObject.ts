import './BuyResourceUpgradeBtn';
import Resource from "../../resources/Resource";
import CollectSpeedUpgrade from "../../upgrades/collect-speed-upgrades/CollectSpeedUpgrade";
import Upgrade from "../../upgrades/Upgrade";
import ResourceUpgradeManager from "../../upgrades/upgrade-managers/ResourceUpgradeManager";
import UpgradeGameObject from "../UpgradeGameObject";
import BuyResourceUpgradeBtn from './BuyResourceUpgradeBtn';

export class ResourceUpgradeGameObject<U extends Resource, T extends ResourceUpgradeManager<U>> extends UpgradeGameObject {
	// TODO: Create a custom GameObject which combines these 2
	//         BuyUpgradeBtn
	private buyCollectSpeedUpgradeButton: BuyResourceUpgradeBtn<U>;
	// private buyCollectSpeedUpgradeBtn: Phaser.GameObjects.Rectangle;
	// private buyCollectSpeedUpgradeLabel: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resourceUpgradeManager: T, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, x, y, width, height);
		this.init();
	}

	public init() {
		super.init();
		
		// Will go through all the different types of upgrades and create them
		Object.keys(Upgrade.Type).forEach((upgradeType: string) => {
			this.initUpgrade(upgradeType);
		});
		
	}

	private initUpgrade(upgradeType: string) {
		let currentUpgrade = this.resourceUpgradeManager.getCurrentUpgrade<U>(Upgrade.Type[upgradeType]);

		this.buyCollectSpeedUpgradeButton = this.scene.add.buyResourceUpgradeBtn(currentUpgrade, this.x + 10, this.y + 10, this.width - 20, this.height - 20);
		this.buyCollectSpeedUpgradeButton.onClick = this.onCollectSpeedUpgradeClick.bind(this);
	}

	public preUpdate(delta: number) {}

	public buyUpgrade(toBuy: Upgrade<U>) {
		this.resourceUpgradeManager.buyUpgrade(toBuy.type, toBuy.level);

		// TODO: Same here except so we can just pass in the type and have it work itself out
		// 
		// if(this.buyCollectSpeedUpgradeBtn.getData('upgrade') != currentUpgrade) {
		// 	this.buyCollectSpeedUpgradeBtn.setData('upgrade', currentUpgrade);

		// 	if(currentUpgrade != null) {
		// 		this.buyCollectSpeedUpgradeLabel.setText([`${currentUpgrade.name} [$${currentUpgrade.cost}]`, `${currentUpgrade.collectSpeedMultiplier}`]);
		// 	} else {
		// 		this.buyCollectSpeedUpgradeBtn.setInteractive(false);
		// 		this.buyCollectSpeedUpgradeBtn.off('pointerdown');
		// 		this.buyCollectSpeedUpgradeLabel.setText('No more upgrades');
		// 	}
		// }
	}

	public onCollectSpeedUpgradeClick(upgrade: CollectSpeedUpgrade<U>) {
		if(this.resourceUpgradeManager.canAffordUpgrade(upgrade)) {
			this.buyUpgrade(upgrade);

			let newUpgrade = this.resourceUpgradeManager.getCurrentUpgrade<U>(Upgrade.Type.COLLECT_SPEED) as CollectSpeedUpgrade<U>;
			this.buyCollectSpeedUpgradeButton.setUpgrade(newUpgrade);
		} else {
			console.log('Cannot buy; Not enough funds');
			
		}
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceUpgrade',
	function <U extends Resource, T extends ResourceUpgradeManager<U>>(this: Phaser.GameObjects.GameObjectFactory, resourceUpgradeManager: T, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceUpgrade = new ResourceUpgradeGameObject(this.scene, resourceUpgradeManager, x, y, width, height);
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
			resourceUpgrade<U extends Resource, T extends ResourceUpgradeManager<U>>(resourceUpgradeManager: T, x: number, y: number, width?: number, height?: number): ResourceUpgradeGameObject<U, T>
		}
	}
}