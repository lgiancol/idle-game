import LuuButton from "../../../../ui/LuuButton";
import MarketManager from "../../market-manager/MarketManager";
import Player from "../../Player";
import ResourceManager from "../../resources/resource-managers/ResourceManager";
import MarketGroupComponent from "./MarketGroupComponent";

export default class MarketComponent extends Phaser.GameObjects.Rectangle {
	private player: Player;
	private label: Phaser.GameObjects.Text;
	private moneyLabel: Phaser.GameObjects.Text;
	// private marketGroup: MarketGroupComponent; // TODO: Needs to be updated to actually be a Tab
	private itemSelect: Phaser.GameObjects.Group;
	private itemMarket: MarketGroupComponent;

	public constructor(scene: Phaser.Scene, public marketManager: MarketManager, x: number, y: number, width: number, height: number) {
		super(scene, x, y, width, height);
		this.player = Player.getInstance();
		this.init();
	}

	private init() {
		this.setStrokeStyle(1, 0xffffff);
		this.label = this.scene.add.text(this.x + 10, this.y + 10, `Market`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30);

		let yOffset = this.label.y + this.label.getBounds().height;
		
		this.moneyLabel = this.scene.add.text(this.x + this.width - 100, this.y + 10, `$${this.player.money}`)
		.setOrigin(0)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(30);

		this.itemMarket = this.scene.add.resourceUpgradeMarketGroup(null, this.x, yOffset, this.width, this.height);
		this.itemMarket.setVisible(false);

		this.itemSelect = this.scene.add.group();
		this.player.resourcemanagersArr.forEach((resourceManager: ResourceManager) => {
			let resourceItemBtn = this.scene.add.luuButton(this.x + 10, yOffset, this.width - 20, 30, 'Log');
			resourceItemBtn.on('pointerdown', () => {
				let activeResourceManager = resourceManager;
				if(activeResourceManager == this.itemMarket.activeResourceManager) activeResourceManager = null;

				this.setActiveResourceManager(activeResourceManager);
			});

			this.itemSelect.add(resourceItemBtn);
		});

		// this.itemSelect.setVisible(false);
	}

	private setActiveResourceManager(resourceManager: ResourceManager) {
		this.itemMarket.activeResourceManager = resourceManager;
	}

	public preUpdate(delta: number) {
		this.moneyLabel
		.setText(`$${this.player.money}`)
		.setPosition(this.x + this.width - this.moneyLabel.width - 10, this.moneyLabel.y);

		this.itemSelect.setVisible(this.itemMarket.activeResourceManager == null);
		this.itemMarket.setVisible(this.itemMarket.activeResourceManager != null);
	}

	public destroy() {
		super.destroy();

		this.label.destroy();
		this.moneyLabel.destroy();
		this.itemMarket?.destroy();
		// this.marketGroup?.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'market',
	function (this: Phaser.GameObjects.GameObjectFactory, marketManager: MarketManager, x: number, y: number, width: number = 100, height: number = 84) {
		const marketGameObject = new MarketComponent(this.scene, marketManager, x, y, width, height);
		marketGameObject.setOrigin(0);
		
		this.displayList.add(marketGameObject);
		this.updateList.add(marketGameObject);

		return marketGameObject;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			market(marketManager: MarketManager, x: number, y: number, width?: number, height?: number): MarketComponent
		}
	}
}