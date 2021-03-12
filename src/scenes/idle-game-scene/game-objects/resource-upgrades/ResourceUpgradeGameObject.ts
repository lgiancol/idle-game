import '../../../../ui/LuuButton';
import LuuButton from '../../../../ui/LuuButton';
import Resource from "../../resources/Resource";
import Upgrade from "../../upgrades/Upgrade";
import ResourceUpgradeManager from "../../upgrades/upgrade-managers/ResourceUpgradeManager";
import CollectSpeedUpgrade from "../../upgrades/upgrade-types/CollectSpeedUpgrade";
import UpgradeGameObject from "../UpgradeGameObject";

export class ResourceUpgradeGameObject<U extends Resource, T extends ResourceUpgradeManager<U>> extends UpgradeGameObject {
	private resourceLabel: Phaser.GameObjects.Text;
	private collectSpeedUpgrade: LuuButton;

	public constructor(scene: Phaser.Scene, public resourceUpgradeManager: T, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, x, y, width, height);
		this.init();
	}

	public init() {
		this.setStrokeStyle(1, 0xffffff);

		this.resourceLabel = this.scene.add.text(this.x + 10, this.y + 10, `${this.resourceUpgradeManager.resourceManager.resource.name}`)
		.setOrigin(0)
		.setColor('0xffffff');
		
		// Will go through all the different types of upgrades and create them
		Object.keys(Upgrade.Type).forEach((upgradeType: string) => {
			this.initUpgradeButton(upgradeType);
		});
		
	}

	private initUpgradeButton(upgradeType: string) {
		let currentUpgrade = this.resourceUpgradeManager.getCurrentUpgrade(Upgrade.Type[upgradeType]);

		const padding = 10;
		const buttonWidth = this.width - (padding * 2);
		const buttonHeight = 70;
		this.collectSpeedUpgrade = this.scene.add.luuButton(this.x + 10, this.y + 10, buttonWidth, buttonHeight, currentUpgrade.name)
		.setData('upgrade', currentUpgrade)
		.addListener('pointerup', this.onCollectSpeedUpgradeClick.bind(this))
		.setEnabled(this.resourceUpgradeManager.canAffordUpgrade(currentUpgrade));
	}

	public preUpdate(delta: number) {
		this.updateUpgradeButtons();
	}

	private updateUpgradeButtons() {
		const upgrade = this.collectSpeedUpgrade.getData('upgrade');
		if(upgrade) {
			// Need to keep track of if it's enabled
			this.collectSpeedUpgrade.setEnabled(this.resourceUpgradeManager.canAffordUpgrade(upgrade))
		}
	}

	private onUpgradeClick() {

	}

	public onCollectSpeedUpgradeClick() {
		const upgrade = this.collectSpeedUpgrade.getData('upgrade') as CollectSpeedUpgrade;
		if(this.resourceUpgradeManager.canAffordUpgrade(upgrade)) {
			this.buyUpgrade(upgrade);

			let newUpgrade = this.resourceUpgradeManager.getCurrentUpgrade(Upgrade.Type.COLLECT_SPEED) as CollectSpeedUpgrade;
			this.collectSpeedUpgrade.setData('upgrade', newUpgrade);
			if(newUpgrade) {
				this.collectSpeedUpgrade.setText(newUpgrade.name);
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