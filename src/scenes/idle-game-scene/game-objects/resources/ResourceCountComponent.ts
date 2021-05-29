import Player from "../../Player";
import Resource from "../../resources/Resource";

export default class ResourceCountComponent extends Phaser.GameObjects.Rectangle {
	private player: Player;
	private icon: Phaser.GameObjects.Sprite;
	private countLbl: Phaser.GameObjects.Text;

	public constructor(scene: Phaser.Scene, public resource: Resource, public x: number, public y: number, width = 100, height = 84) {
		super(scene, x, y, width, height);

		this.player = Player.getInstance();
		this.init();
	}

	private init() {
		this.icon = this.scene.add.sprite(this.x, this.y, this.resource.type)
		.setOrigin(0)
		.setDisplaySize(30, 30);

		this.countLbl = this.scene.add.text(this.icon.getBounds().right + 10, this.y + (this.icon.getBounds().height / 2), `${this.player.getResourceManager(this.resource).quantity}`)
		.setOrigin(0.5)
		.setColor('white')
		.setFontFamily('my-font')
		.setFontSize(20)
		.setDepth(1);

		this.displayHeight = this.icon.getBounds().height;
		this.displayWidth = this.icon.getBounds().width + this.countLbl.getBounds().width + 10;
	}

	public preUpdate(delta: number) {
		this.countLbl.setText(`${this.player.getResourceManager(this.resource).quantity}`);
	}

	public setPosition(x?: number, y?: number, z?: number, w?: number) {
		super.setPosition(x, y, z, w);
		this.icon?.setPosition(x, y, z, w);
		this.countLbl?.setPosition(this.icon.getBounds().right + 10, this.y);

		return this;
	}

	public setDepth(depth: number) {
		super.setDepth(depth);
		this.icon?.setDepth(depth);
		this.countLbl?.setDepth(depth);

		return this;
	}

	public setOrigin(originX: number, originY?: number) {
		super.setOrigin(originX, originY);
		this.icon?.setOrigin(originX, originY);
		// this.countLbl?.setOrigin(originX, originY);

		return this;
	}

	public setVisible(visible: boolean) {
		super.setVisible(visible);
		this.icon?.setVisible(visible);
		this.countLbl?.setVisible(visible);

		return this;
	}

	public destroy() {
		super.destroy();

		this.icon.destroy();
		this.countLbl.destroy();
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	'resourceCount',
	function(this: Phaser.GameObjects.GameObjectFactory, resource: Resource, x: number, y: number, width: number = 100, height: number = 84) {
		const resourceCountComponent = new ResourceCountComponent(this.scene, resource, x, y, width, height)
		.setOrigin(0);
		
		this.displayList.add(resourceCountComponent);
		this.updateList.add(resourceCountComponent);
		return resourceCountComponent;
	}
);

declare global
{
	namespace Phaser.GameObjects
	{
		interface GameObjectFactory
		{
			resourceCount(resource: Resource, x: number, y: number, width?: number, height?: number): ResourceCountComponent
		}
	}
}