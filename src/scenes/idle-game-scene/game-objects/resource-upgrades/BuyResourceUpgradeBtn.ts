import Resource from "../../resources/Resource";
import Upgrade from "../../upgrades/Upgrade";

export default class BuyResourceUpgradeBtn<T extends Resource> extends Phaser.GameObjects.Rectangle {
	public onClick: (upgrade: Upgrade<T>) => void;
	private label: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public upgrade: Upgrade<T>, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		
		this.init();
	}

	public init() {
		this.setInteractive({useHandCursor: true})
		.on('pointerdown', this._onClick.bind(this	))
		.setFillStyle(0xff0000);

		this.label = this.scene.add.text(this.x + 10, this.y + 10, `Purchase for $${this.upgrade.cost}`)
		.setOrigin(0)
		.setColor('black')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);
	}

	private _onClick() {
		this.onClick(this.upgrade);
	}

	public setUpgrade(upgrade: Upgrade<T>) {
		this.upgrade = upgrade;
		this.label.setText(`Purchase for $${this.upgrade.cost}`);
	}

	public preUpdate() {}
}



Phaser.GameObjects.GameObjectFactory.register(
	'buyResourceUpgradeBtn',
	function <T extends Resource>(this: Phaser.GameObjects.GameObjectFactory, upgrade: Upgrade<T>, x: number, y: number, width: number, height: number) {
		const buyResourceUpgradeBtn = new BuyResourceUpgradeBtn(this.scene, upgrade, x, y, width, height);
		buyResourceUpgradeBtn.setOrigin(0);
		
		this.displayList.add(buyResourceUpgradeBtn);
		this.updateList.add(buyResourceUpgradeBtn);

		return buyResourceUpgradeBtn;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			buyResourceUpgradeBtn<T extends Resource>(this: Phaser.GameObjects.GameObjectFactory, upgrade: Upgrade<T>, x: number, y: number, width: number, height: number): BuyResourceUpgradeBtn<T>
		}
	}
}