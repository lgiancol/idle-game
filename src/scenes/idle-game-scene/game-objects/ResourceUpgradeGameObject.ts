import Resource from "../resources/Resource";
import CollectSpeedUpgrade from "../upgrades/collect-speed-upgrades/CollectSpeedUpgrade";
import Upgrade from "../upgrades/Upgrade";
import ResourceUpgradeManager from "../upgrades/upgrade-managers/ResourceUpgradeManager";
import UpgradeGameObject from "./UpgradeGameObject";

export class ResourceUpgradeGameObject<U extends Resource, T extends ResourceUpgradeManager<U>> extends UpgradeGameObject {
	private buyCollectSpeedUpgradeBtn: Phaser.GameObjects.Rectangle;
	private buyCollectSpeedUpgradeLabel: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resourceUpgradeManager: T, x: number, y: number, width: number = 100, height: number = 75) {
		super(scene, x, y, width, height);
		this.init();
	}

	public init() {
		super.init();
		
		// TODO: Have it setup so that we can loop through each of the Upgrade.Type values
		let currentUpgrade = this.resourceUpgradeManager.getCurrentUpgrade<U>(Upgrade.Type.COLLECT_SPEED) as CollectSpeedUpgrade<U>;
		this.buyCollectSpeedUpgradeBtn = this.scene.add.rectangle(this.x, this.y, this.width, this.height)
		.setOrigin(0)
		.setData('upgrade', currentUpgrade)
		.setInteractive({useHandCursor: true})
		.on('pointerdown', this.onCollectSpeedUpgradeClick.bind(this));

		this.buyCollectSpeedUpgradeLabel = this.scene.add.text(this.x + 10, this.y + 10, [`${currentUpgrade.name} [${currentUpgrade.level}]`, `${currentUpgrade.collectSpeedMultiplier}`])
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	public preUpdate(delta: number) {}

	public buyUpgrade(toBuy: Upgrade<U>) {
		this.resourceUpgradeManager.applyUpgrade(toBuy.type, toBuy.level);

		// TODO: Same here except so we can just pass in the type and have it work itself out
		let currentUpgrade = this.resourceUpgradeManager.getCurrentUpgrade<U>(Upgrade.Type.COLLECT_SPEED) as CollectSpeedUpgrade<U>;
		if(this.buyCollectSpeedUpgradeBtn.getData('upgrade') != currentUpgrade) {
			this.buyCollectSpeedUpgradeBtn.setData('upgrade', currentUpgrade);

			if(currentUpgrade != null) {
				this.buyCollectSpeedUpgradeLabel.setText([`${currentUpgrade.name} [${currentUpgrade.level}]`, `${currentUpgrade.collectSpeedMultiplier}`]);
			} else {
				this.buyCollectSpeedUpgradeBtn.setInteractive(false);
				this.buyCollectSpeedUpgradeLabel.setText('No more upgrades');
			}
		}
	}

	public onCollectSpeedUpgradeClick() {		
		this.buyUpgrade(this.buyCollectSpeedUpgradeBtn.getData('upgrade'));
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